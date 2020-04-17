import React, { useState, useEffect, useRef } from "react";
import './App.css';

const BASE_URL = 'https://asia-east2-wan-la-come.cloudfunctions.net/getWord';
// const BASE_URL = 'http://localhost:8080/';

function App() {
  const audioRef = useRef(null);
  const [word, setWord] = useState({});

  const onPlay = () => {
    audioRef.current.play();
  }

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await fetch(BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const response = await res.json();
        setWord(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWord();
  
  }, []);

  return (
    <div className="app">
      <img className="round" src={word.imageUrl} alt={word.word} />
      <div className="word-and-pronunciation">
        <h1>{word.word}</h1>
        <div>
          <audio ref={audioRef} src={word.audio} />
          <button className="speaker-button" onClick={onPlay} />
        </div>
      </div>
      <div className="word-attributes">
        <span className="word-class">{word.class}</span>
        <span className="word-romanization">{word.romanization}</span>
      </div>
      <div className="word-translation">
        <h2>{word.translation}</h2>
      </div>
    </div>
  );
}

export default App;
