// Define constants
const NUM_ROWS = 5
const NUM_COLS = 5
const R = 100

// Define utility functions
const angle = x => (x * Math.PI / 3) + (Math.PI / 6)
const round2 = x => (Math.round(x * 100)) / 100

// Draw chart canvas
const chart = d3.select('#chart')
  .append('svg')
  .attr('width', 2 * R * NUM_ROWS)
  .attr('height', 2 * R * NUM_COLS)

// Get the vertices of one hexagon
const cartesianPolygonPoints = Array(6).fill()
  .map((_, i) => i)
  .map(i => ({
    x: round2(R * Math.cos(angle(i))),
    y: round2(R * Math.sin(angle(i)))
  }))

// Serialize the hexagon vertices into a string
const points = cartesianPolygonPoints.reduce((prev, curr) => `${prev} ${curr.x},${curr.y}`, '')

// Calculate the length of the apothem
const apothem = round2(R * Math.cos(Math.PI / 6))

// Get an array with the coordinates of all the hexagons to draw.
// Example: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, ...]
const coords = []
for (let i = 0; i < NUM_ROWS; i++) {
  for (let j = 0; j < NUM_COLS; j++) {
    coords.push({ x: i, y: j })
  }
}

// Replace the previous coordinates with the displacement of each polygon
const translations = coords.map(i => ({
  x: 2 * i.x * apothem + (apothem * (i.y % 2)),
  y: (3 / 2) * i.y * R
}))

// Draw the hexagonal grid
chart.selectAll('polygon')
  .data(translations)
  .enter()
  .append('polygon')
  .attr('points', points)
  .attr('transform', d => `translate(${R + d.x}, ${R + d.y})`)
  .attr('stroke', 'black')
  .attr('fill', '#ddd')
  .attr('stroke-width', 2)
