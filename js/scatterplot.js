const drawScatterplot = (data) => {
  // Set up a responsive SVG and the shared scatterplot group.
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("background-color", bodyBackgroundColor);

  innerChartS = svg.append("g")
    .attr("class", "inner-chart-scatterplot")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Use the scatterplot scales declared in shared-constants.js.
  const xExtent = d3.extent(data, d => d.star);
  const yExtent = d3.extent(data, d => d.screenSize);

  xScaleS
    .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
    .range([0, innerWidth]);

  yScaleS
    .domain(yExtent)
    .range([innerHeight, 0])
    .nice();

  // Assign a distinct hue to each screen technology.
  const uniqueTechs = [...new Set(data.map(d => d.screenTech))];
  colorScale
    .domain(uniqueTechs)
    .range(d3.schemeCategory10);

  // Draw one semi-transparent circle per TV, without a stroke.
  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.screenSize))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // Add the bottom axis and star-rating label.
  const bottomAxis = d3.axisBottom(xScaleS);
  innerChartS.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(bottomAxis);

  svg.append("text")
    .text("Star Rating")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  // Add the left axis and screen-size label.
  const leftAxis = d3.axisLeft(yScaleS);
  innerChartS.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

  svg.append("text")
    .text("Screen size (inches)")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");

  // Add a legend on the right using the same colors as the circles.
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 140},${margin.top})`);

  const legendItems = legend.selectAll("g")
    .data(uniqueTechs)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${i * 22})`);

  legendItems.append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", d => colorScale(d));

  legendItems.append("text")
    .attr("x", 18)
    .attr("y", 10)
    .text(d => d)
    .attr("class", "axis-label");
};
