const populateFilters = (data) => {
  // Update frequencies while keeping the original bins and scales.
  const updateHistogram = () => {
    const screenTech = filters_screen.find(filter => filter.isActive).id;
    const screenSize = filters_size.find(filter => filter.isActive).id;
    const updatedData = data.filter(tv =>
      (screenTech === "all" || tv.screenTech === screenTech) &&
      (screenSize === "all" || tv.screenSize === screenSize)
    );

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

  // Use the same styles and exclusive selection behavior for both groups.
  const addFilterButtons = (selector, filters) => {
    const buttons = d3.select(selector)
      .selectAll(".filter")
      .data(filters, d => d.id)
      .join("button")
      .attr("type", "button")
      .attr("class", "filter")
      .classed("active", d => d.isActive)
      .attr("aria-pressed", d => d.isActive)
      .text(d => d.label)
      .on("click", (event, d) => {
        // Clicking the selected filter leaves it active.
        if (d.isActive) return;

        filters.forEach(filter => {
          filter.isActive = filter.id === d.id;
        });

        buttons
          .classed("active", filter => filter.isActive)
          .attr("aria-pressed", filter => filter.isActive);

        updateHistogram();
      });
  };

  addFilterButtons("#filters_screen", filters_screen);
  addFilterButtons("#filters_size", filters_size);
};

const createTooltip = () => {
  // Keep the tooltip hidden and prevent it from intercepting circle events.
  const tooltip = innerChartS.append("g")
    .attr("class", "tooltip")
    .attr("transform", "translate(0,500)")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  tooltip.append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
  const tooltip = innerChartS.select(".tooltip");

  innerChartS.selectAll("circle")
    .on("mouseenter", (event, d) => {
      console.log("Mouse entered circle", d);
      tooltip.select("text").text(d.screenSize);

      const cx = +event.currentTarget.getAttribute("cx");
      const cy = +event.currentTarget.getAttribute("cy");

      tooltip
        .interrupt()
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth},${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", (event, d) => {
      console.log("Mouse left circle", d);

      // Cancel any pending fade-in so the tooltip stays hidden after leaving.
      tooltip
        .interrupt()
        .style("opacity", 0)
        .attr("transform", "translate(0,500)");
    });
};
