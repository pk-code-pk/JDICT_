import React, { useState, useEffect } from 'react';
import logo from './Untitled.png';
import './App.css';
import axios from 'axios';
import EntryPage from './EntryPage';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [defentry, setDefEntry] = useState(null);
  const [loading, setLoading] = useState(false);

  const searching = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://jotoba.de/api/search/words',
        {
          query: query,
          language: "English",
          no_english: false
        }
      );
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEntrySelect = (entry) => {
    setDefEntry(entry);
  };

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searching();
    }
  };

  const handleSearch = () => {
    searching();
  };

  useEffect(() => {
    kanjief();
  }, []);

  const kanjief = () => {
    const container = document.getElementById('kanjicont');
    const kanjinum = 20;

    for (let i = 0; i < kanjinum; i++) {
      const kanji = document.createElement('div');
      kanji.textContent = rankan();
      kanji.className = 'kanjieff';
      kanji.style.opacity = Math.random() * 0.5 + 0.2;
      kanji.style.animationDuration = Math.random() * 5 + 5 + 's';
      kanji.style.left = Math.random() * 100 + 'vw';
      kanji.style.top = Math.random() * 100 + 'vh';
      container.appendChild(kanji);
    }
  };

  const rankan = () => {
    const kanjilist = ['漢', '字', '日', '本', '語', '学', '校', '先', '生', '友',
      '達', '会', '社', '食', '事', '家', '族', '京', '都', '東'];
    const index = Math.floor(Math.random() * kanjilist.length);
    return kanjilist[index];
  };

  return (
    <div className="App" style={{ fontFamily: 'arial', fontWeight: 'bold', fontStyle: 'italic' }}>
      <header className="App-header">
        {defentry ? (
          <EntryPage entry={defentry} kanji={defentry.reading.kanji}
          hiragana={defentry.reading.kana}
          definition={defentry.senses[0].glosses.join(', ')}  />
        ) : (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <div id="kanjicont" className='kanjicont'></div>
            <h1>Welcome to JDict.</h1>
            <p>Enter a word in romanji, English, or Japanese to search:</p>
            <input
              type="text"
              placeholder="Enter a word"
              value={query}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
            <div>
              {results && results.words && results.words.map((word, index) => (
                <div key={index} className="entry" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = 'cyan'} onMouseLeave={(e) => e.target.style.color = 'white'} onClick={() => handleEntrySelect(word)}>
                  <p>{word.reading.kanji} - {word.reading.kana} - {word.senses[0].glosses.join(', ')}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </header>
      <footer className="App-footer">
        <p>Created by Praneel K</p>
        <div className='bottom' style={{opacity:0.5}}> 
          <p> Dictionary API from Jotoba </p> 
        </div>
      </footer>
    </div>
  );
}

export default App;

