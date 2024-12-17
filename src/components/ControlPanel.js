import React from 'react';

function ControlPanel({ autoPlay, setAutoPlay, fogMode, setFogMode, nextTurn }) {
  return (
    <div style={{marginBottom: '10px'}}>
      <button onClick={() => setAutoPlay(!autoPlay)}>
        {autoPlay ? 'Stop Auto-Play' : 'Start Auto-Play'}
      </button>
      {!autoPlay && (
        <button onClick={nextTurn}>Next Turn</button>
      )}
      <div>
        <label>Fog Mode: </label>
        <select value={fogMode} onChange={e => setFogMode(e.target.value)}>
          <option value="A">Team A View</option>
          <option value="B">Team B View</option>
          <option value="NONE">No Fog</option>
        </select>
      </div>
    </div>
  );
}

export default ControlPanel;