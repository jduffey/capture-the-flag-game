export function generateMap(width, height) {
  // Simple: all grass
  const map = [];
  for (let y=0; y<height; y++) {
    const row = [];
    for (let x=0; x<width; x++) {
      row.push({
        terrain: 'grass',
        color: 'green',
      });
    }
    map.push(row);
  }
  return map;
}

export const initialFlags = {
  A: { x: 0, y: 0 },
  B: { x: 19, y: 19 }
};

// Some initial units, one for each team:
export const initialUnits = [
  {id: 1, team: 'A', x: 1, y: 1, speed: 3},
  {id: 2, team: 'B', x: 18, y: 18, speed: 3}
];