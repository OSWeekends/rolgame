// Define constants
const NUM_ROWS = 15
const NUM_COLS = 15
const R = 30

// Define utility functions
const round2Dec = x => (Math.round(x * 100)) / 100
const getArrayFromZeroTo = x => Array(x)
  .fill()
  .map((_, i) => i)

// Get angles (in radians) of each vertix
const vertixAngles = getArrayFromZeroTo(6)
  .map(position => (position * Math.PI / 3) + (Math.PI / 6))

// Transform to cartesian coordinates
const cartesianPolygonPoints = vertixAngles
  .map(angle => ({
    x: round2Dec(R * Math.cos(angle)),
    y: round2Dec(R * Math.sin(angle))
  }))

// Serialize the hexagon vertices into a string
const points = cartesianPolygonPoints.reduce((prev, curr) => `${prev} ${curr.x},${curr.y}`, '')

// Calculate the length of the apothem
const apothem = round2Dec(R * Math.cos(Math.PI / 6))

// Get an array with the coordinates of all the hexagons to draw.
// Example: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, ...]
const coords = []
for (let row = 0; row < NUM_ROWS; row++) {
  for (let col = 0; col < NUM_COLS; col++) {
    coords.push({ x: row, y: col })
  }
}

// Replace the previous coordinates with the displacement of each polygon
const cells = coords.map(coord => ({
  ...coord,
  tx: 2 * coord.x * apothem + (apothem * (coord.y % 2)),
  ty: (3 / 2) * coord.y * R
}))

// Draw chart canvas
const chart = d3.select('#chart')
  .append('svg')
  .attr('width', 2 * R * NUM_ROWS)
  .attr('height', 2 * R * NUM_COLS)

// Draw the hexagonal grid
chart.selectAll('polygon')
  .data(cells)
  .enter()
  .append('polygon')
  .attr('points', points)
  .attr('transform', cell => `translate(${R + cell.tx}, ${R + cell.ty})`)
  .attr('stroke', 'black')
  .attr('fill', '#dedede')
  .attr('stroke-width', 2)
  .on('click', cell => console.log(cell))
