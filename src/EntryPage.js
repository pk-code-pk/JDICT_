import React from 'react';
import './EntryPage.css'; // Import CSS for styling

function EntryPage({ kanji, hiragana, definition}) {
  return (
    <div className="entry-page">
      <div className="background-kanji">{kanji}</div>
      <div className="content">
        <div className="header">
          <h1 className="kanji"> {kanji} </h1> 
          <p className="hiragana">{hiragana}</p>
        </div>
        <div className="definition">
          <h2>Definition:</h2>
          <p>{definition}</p>
        </div>
        <div>
</div>

      </div>
    </div>
  );
}

export default EntryPage;