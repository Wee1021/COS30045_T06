// Load the CSV file and convert numeric columns to numbers.
d3.csv("Ex6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  // Check the processed data in the browser console.
  console.log(data);

  // Draw the chart and create filters once the data has loaded.
  drawHistogram(data);
  populateFilters(data);
}).catch(error => {
  console.error("Error loading the CSV file or initialising the chart:", error);
});
