import React from 'react';
import { getFoggedMap } from '../utils/fog';

function GameBoard({ map, units, fogMode, currentTeam, flags }) {
  const visibleMap = getFoggedMap(map, units, fogMode);

  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${map[0].length}, 20px)`}}>
      {visibleMap.flatMap((row, y) =>
        row.map((tile, x) => {
          const unitHere = units.find(u => u.x === x && u.y === y);
          const flagHere = (flags.A.x === x && flags.A.y === y) ? 'A' :
                          (flags.B.x === x && flags.B.y === y) ? 'B' : null;
          const style = {
            width: '20px',
            height: '20px',
            backgroundColor: tile.visible ? tile.color : 'black',
            border: '1px solid #555',
            position: 'relative',
          };
          return (
            <div key={`${x}-${y}`} style={style}>
              {unitHere && <div style={{fontSize: '10px', color: '#fff'}}>{unitHere.team}</div>}
              {flagHere && <div style={{fontSize: '10px', color: 'red'}}>🚩{flagHere}</div>}
            </div>
          );
        })
      )}
    </div>
  );
}

export default GameBoard;