export function updateUnitsPositions(units, moves) {
  return units.map(u => {
    const move = moves.find(m => m.id === u.id);
    if (move) {
      return {...u, x: move.x, y: move.y};
    }
    return u;
  });
}

export function checkFlagCapture(units, flags) {
  // If any unit of team A reaches flags.B => A wins
  // If any unit of team B reaches flags.A => B wins
  for (let u of units) {
    if (u.team === 'A' && u.x === flags.B.x && u.y === flags.B.y) {
      return 'A';
    }
    if (u.team === 'B' && u.x === flags.A.x && u.y === flags.A.y) {
      return 'B';
    }
  }
  return null;
}