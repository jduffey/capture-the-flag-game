// Basic BFS for shortest path.
export function findPath(map, start, goal) {
  const visited = new Set();
  const queue = [{x: start.x, y: start.y, path: [{x:start.x, y:start.y}]}];
  while (queue.length > 0) {
    const {x, y, path} = queue.shift();
    if (x === goal.x && y === goal.y) return path;
    for (let [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x+dx, ny = y+dy;
      if (ny>=0 && ny<map.length && nx>=0 && nx<map[0].length) {
        const key = `${nx},${ny}`;
        if (!visited.has(key)) {
          visited.add(key);
          // Assuming all terrain is passable
          queue.push({x:nx, y:ny, path: [...path, {x:nx, y:ny}]});
        }
      }
    }
  }
  return null;
}