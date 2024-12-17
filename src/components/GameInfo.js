import React from 'react';

function GameInfo({ currentTeam, turnCount }) {
  return (
    <div style={{marginBottom: '10px'}}>
      <p>Current Turn: {turnCount}</p>
      <p>Active Team: {currentTeam}</p>
    </div>
  );
}

export default GameInfo;