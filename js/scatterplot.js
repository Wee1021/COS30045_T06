const drawScatterplot = (data) => {
  // Prepare the chart area; points and axes will be added in the next step.
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("background-color", bodyBackgroundColor);

  innerChartS = svg.append("g")
    .attr("class", "inner-chart-scatterplot")
    .attr("transform", `translate(${margin.left},${margin.top})`);
};
