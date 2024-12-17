// Very simplistic AI that moves units closer to enemy flag directly.
// Assumes no obstacles.
import { findPath } from './pathfinding';

export function aiDecideMoves(units, map, flags, currentTeam) {
  const enemyFlag = currentTeam === 'A' ? flags.B : flags.A;
  const teamUnits = units.filter(u => u.team === currentTeam);
  const moves = [];
  for (let u of teamUnits) {
    const path = findPath(map, u, enemyFlag);
    // Move at most u.speed steps along the path
    if (path && path.length > 1) {
      // path[0] is current position, path[1] is next step
      const step = path.slice(1, u.speed+1).pop() || path[path.length-1];
      moves.push({id: u.id, x: step.x, y: step.y});
    } else {
      // No path found, stay put
      moves.push({id: u.id, x: u.x, y: u.y});
    }
  }
  return moves;
}