const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "wan-la-come",
});

async function singleWrite(data) {
  try {
    const querySnapshot = await db
      .collection("words")
      .where("word", "==", data.word)
      .get();

    if (querySnapshot.empty) {
      const ref = await db.collection("words").add(data);
      return {
        ref_id: ref,
        data: data,
      };
    } else {
      let readData;
      querySnapshot.forEach((doc) => {
        readData = {
          ref_id: doc.id,
          data: doc.data(),
        };
      });
      return readData;
    }
  } catch (err) {
    throw err;
  }
}

async function batchWrite(data) {
  let batch = db.batch();

  data.forEach((word) => {
    batch.set(db.collection("words").doc(), word);
  });

  try {
    console.log('writing data in a batch...');
    const response = await batch.commit();
    console.log(response);
  } catch (err) {
    throw err;
  }
}

async function randomRead() {
  // https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection/46801925#46801925
  let data = {};
  const random = db.collection("words").doc().id;
  try {
    const querySnapshot = await db
      .collection("words")
      .where("__name__", ">=", random)
      .orderBy("__name__")
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        data = {
          ref_id: data.id,
          data: doc.data(),
        };
      });
      return data;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  batchWrite,
  randomRead,
  singleWrite,
};
