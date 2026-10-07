const drawHistogram = (data) => {
  // Set up a responsive SVG and an inner chart area with margins.
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("background-color", bodyBackgroundColor);

  const innerChart = svg.append("g")
    .attr("class", "inner-chart")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Group TVs into energy-consumption bins and inspect them in the console.
  const bins = binGenerator(data);
  console.log(bins);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  // Map energy consumption to horizontal position and frequency to height.
  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  // Draw bars with background-colored strokes to separate adjacent bins.
  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  // Add the bottom axis and its label.
  const bottomAxis = d3.axisBottom(xScale);
  innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(bottomAxis);

  svg.append("text")
    .text("Labelled Energy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  // Add the left axis and its label.
  const leftAxis = d3.axisLeft(yScale).tickFormat(d3.format("d"));
  innerChart.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

  svg.append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");
};
