import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import ControlPanel from './components/ControlPanel';
import GameInfo from './components/GameInfo';
import { generateMap, initialUnits, initialFlags } from './utils/setup';
import { aiDecideMoves } from './utils/ai';
import { updateUnitsPositions, checkFlagCapture } from './utils/gameLogic';

function App() {
  const map = useState(() => generateMap(20,20))[0];
  const [units, setUnits] = useState(initialUnits);
  const flags = useState(initialFlags)[0];
  const [currentTeam, setCurrentTeam] = useState('A'); // 'A' or 'B'
  const [autoPlay, setAutoPlay] = useState(false);
  const [fogMode, setFogMode] = useState('A'); // 'A', 'B', or 'NONE'
  const [turnCount, setTurnCount] = useState(1);

  const nextTurn = useCallback(() => {
    // AI decides moves for currentTeam
    const newUnitsPositions = aiDecideMoves(units, map, flags, currentTeam);

    const updatedUnits = updateUnitsPositions(units, newUnitsPositions);
    setUnits(updatedUnits);

    // Check if flag is captured
    const winner = checkFlagCapture(updatedUnits, flags);
    if (winner) {
      alert(`Team ${winner} captured the flag! Game Over!`);
      // Here you'd stop the game or reset
      return;
    }

    // Switch teams
    setCurrentTeam(currentTeam === 'A' ? 'B' : 'A');
    setTurnCount(turnCount + 1);
  }, [currentTeam, turnCount, units, map, flags]);

  useEffect(() => {
    let timer;
    if (autoPlay) {
      timer = setTimeout(() => {
        nextTurn();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, units, currentTeam, nextTurn]);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h1>Capture the Flag with Fog of War</h1>
      <ControlPanel
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        fogMode={fogMode}
        setFogMode={setFogMode}
        nextTurn={nextTurn}
      />
      <GameInfo currentTeam={currentTeam} turnCount={turnCount} />
      <GameBoard
        map={map}
        units={units}
        fogMode={fogMode}
        currentTeam={currentTeam}
        flags={flags}
      />
    </div>
  );
}

export default App;