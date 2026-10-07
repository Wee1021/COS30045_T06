// Set up chart dimensions and margins.
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Keep the scatterplot group accessible to future tooltip functions.
let innerChartS;
const tooltipWidth = 300;
const tooltipHeight = 78;

// Match the warm orange and cream background in base.css.
const barColor = "#c65a20";
const bodyBackgroundColor = "#fbf2e8";

// Set up scales; domains and ranges will be defined by the histogram.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Independent scatterplot scales; configure domains and ranges when drawing.
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Share the bin generator with future chart updates.
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);

// Screen technology filters; only one filter is active at a time.
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// Screen sizes in inches; combine the selected size with the technology filter.
const filters_size = [
  { id: "all", label: "All Sizes", isActive: true },
  { id: 24, label: '24"', isActive: false },
  { id: 32, label: '32"', isActive: false },
  { id: 55, label: '55"', isActive: false },
  { id: 65, label: '65"', isActive: false },
  { id: 98, label: '98"', isActive: false }
];
