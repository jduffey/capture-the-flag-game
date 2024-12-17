// This is a mockup of fog logic
export function getFoggedMap(map, units, fogMode) {
  // If fogMode === 'NONE', all visible
  if (fogMode === 'NONE') {
    return map.map(row => row.map(tile => ({...tile, visible: true})));
  }

  // Determine visibility
  const teamUnits = units.filter(u => u.team === fogMode);
  const visiblePositions = new Set();

  teamUnits.forEach(u => {
    const range = 3; // vision range
    for (let dy = -range; dy <= range; dy++) {
      for (let dx = -range; dx <= range; dx++) {
        const vx = u.x + dx;
        const vy = u.y + dy;
        if (vy >= 0 && vy < map.length && vx >= 0 && vx < map[0].length) {
          visiblePositions.add(`${vx},${vy}`);
        }
      }
    }
  });

  return map.map((row, y) =>
    row.map((tile, x) => {
      return {
        ...tile,
        visible: visiblePositions.has(`${x},${y}`)
      };
    })
  );
}