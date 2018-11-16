const R = 100
const angle = x => (x * Math.PI / 3) + (Math.PI / 6)

const round2 = x => (Math.round(x * 100)) / 100

const chart = d3.select('#chart')
  .append('svg')
  .attr('width', 2 * R)
  .attr('height', 2 * R)

const cartesianPolygonPoints = Array(6).fill()
  .map((_, i) => i)
  .map(i => ({
    x: round2(R * Math.cos(angle(i))),
    y: round2(R * Math.sin(angle(i)))
  }))

// const cartesianPolygonPoints = [
//   { x: 86.6, y: 50 },
//   { x: 0, y: 100 },
//   { x: -86.6, y: 50 },
//   { x: -86.6, y: -50 },
//   { x: 0, y: -100 },
//   { x: 86.6, y: -50 }
// ]

const cartesianPolygonPointsAttr = cartesianPolygonPoints.reduce((prev, curr) => `${prev} ${curr.x},${curr.y}`, '')

chart
  .append('polygon')
  .attr('points', cartesianPolygonPointsAttr)
  .attr('transform', `translate(${R}, ${R})`)
  .attr('stroke', 'black')
  .attr('fill', 'red')
  .attr('stroke-width', 2)
