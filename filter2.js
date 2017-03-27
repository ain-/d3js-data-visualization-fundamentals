var h = 100;
var w = 300;
var padding = 20;

function getDate(d) {
  var strDate = new String(d);
  var year = strDate.substr(0, 4);
  var month = strDate.substr(4, 2) - 1;
  var day = strDate.substr(6, 2);

  return new Date(year, month, day);
}

function buildLine(ds) {
  var minDate = getDate(ds[0]['month']);
  var maxDate = getDate(ds[ds.length-1]['month']);

  console.log("min: " + minDate);
  console.log("max: " + maxDate);

  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding+5, w-padding]);
  var yScale = d3.scale.linear()
    .domain([
      0, d3.max(ds, d => d.sales)])
    .range([h - padding, 10]);

  var xAxisGen = d3.svg.axis().scale(xScale)
    .orient("bottom").tickFormat(d3.time.format("%b")).ticks(5);
  var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  var lineFun = d3.svg.line()
    .x(function(d) { return xScale(getDate(d.month)); })
    .y(function(d) { return yScale(d.sales); })
    .interpolate("linear");
  var svg = d3.select("body").append("svg")
    .attr({ width: w, height: h, id:"svg-test"});
  var yAxis = svg.append("g").call(yAxisGen)
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)");
  var xAxis = svg.append("g").call(xAxisGen)
    .attr("class", "x-axis")
    .attr("transform", "translate(0,"+ (h-padding) + ")");
  var viz = svg.append("path").attr({
    d: lineFun(ds),
    "stroke": "purple",
    "stroke-width": 2,
    "fill": "none",
    "class": "path-test"
  });
}

function updateLine(ds) {
  var minDate = getDate(ds[0]['month']);
  var maxDate = getDate(ds[ds.length-1]['month']);

  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding+5, w-padding]);
  var yScale = d3.scale.linear()
    .domain([
      0, d3.max(ds, d => d.sales)])
    .range([h - padding, 10]);

  var xAxisGen = d3.svg.axis().scale(xScale)
    .orient("bottom").tickFormat(d3.time.format("%b")).ticks(ds.length - 1);
  var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  var lineFun = d3.svg.line()
    .x(function(d) { return xScale(getDate(d.month)); })
    .y(function(d) { return yScale(d.sales); })
    .interpolate("linear");
  var svg = d3.select("#svg-test");
  var yAxis = svg.selectAll("g.y-axis").call(yAxisGen);
  var xAxis = svg.selectAll("g.x-axis").call(xAxisGen);
  var viz = svg.selectAll(".path-test").attr({
    d: lineFun(ds)
  });
}

d3.json("https://api.github.com/repos/ain-/d3js-data-visualization-fundamentals/contents/MonthlySales.json", function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    ds = data;
  }
  var decodedData = JSON.parse(window.atob(data.content));
  console.log(decodedData);

  buildLine(decodedData);

  d3.select("select")
    .on("change", function(d, i) {
      var sel = d3.select("#date-option").node().value;
      decodedData.splice(0, decodedData.length - sel);
      updateLine(decodedData);
    });

});
