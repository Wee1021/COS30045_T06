// Set up chart dimensions and margins.
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Match the warm orange and cream background in base.css.
const barColor = "#c65a20";
const bodyBackgroundColor = "#fbf2e8";

// Set up scales; domains and ranges will be defined by the histogram.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Share the bin generator with future chart updates.
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);
