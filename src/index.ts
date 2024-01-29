// Import D3
import * as d3 from 'd3';

// Define data interface
interface DataPoint {
  country: string;
  sales: number;
  category: string;
  margin: number;
}

// Fetch data (example)
const data: DataPoint[] = [
  { country: 'USA', sales: 100, category: 'A', margin: 10 },
  { country: 'Canada', sales: 80, category: 'B', margin: 8 },
  // Add more data points as needed
];

// Set up dimensions and margins
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG element
const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Define scales
const xScale = d3.scaleBand()
  .domain(data.map(d => d.country))
  .range([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.sales)])
  .nice()
  .range([height, 0]);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const radiusScale = d3.scaleSqrt()
  .domain([0, d3.max(data, d => d.margin)])
  .range([2, 20]);

// Create circles
svg.selectAll('circle')
  .data(data)
  .enter().append('circle')
  .attr('cx', d => xScale(d.country) + xScale.bandwidth() / 2)
  .attr('cy', d => yScale(d.sales))
  .attr('r', d => radiusScale(d.margin))
  .style('fill', d => colorScale(d.category));

// Add axes
svg.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(xScale));

svg.append('g')
  .call(d3.axisLeft(yScale));

// Add axis labels
svg.append('text')
  .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
  .style('text-anchor', 'middle')
  .text('Country');

svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('y', 0 - margin.left)
  .attr('x', 0 - (height / 2))
  .attr('dy', '1em')
  .style('text-anchor', 'middle')
  .text('Sales');

