const populateFilters = (data) => {
  // Update frequencies while keeping the original bins and scales.
  const updateHistogram = (filterId, data) => {
    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.select("#histogram .inner-chart")
      .selectAll("rect")
      .interrupt()
      .data(updatedBins, d => d.x0)
      .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2)
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
  };

  // Create buttons using the existing filter styles in base.css.
  const buttons = d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen, d => d.id)
    .join("button")
    .attr("type", "button")
    .attr("class", "filter")
    .classed("active", d => d.isActive)
    .attr("aria-pressed", d => d.isActive)
    .text(d => d.label)
    .on("click", (event, d) => {
      // Clicking the selected filter leaves it active.
      if (d.isActive) return;

      filters_screen.forEach(filter => {
        filter.isActive = filter.id === d.id;
      });

      buttons
        .classed("active", filter => filter.isActive)
        .attr("aria-pressed", filter => filter.isActive);

      updateHistogram(d.id, data);
    });
};
