var h = 100;
var w = 300;

function buildLine(ds) {

    var xScale = d3.scale.linear()
      .domain([
        d3.min(ds, d => d.month),
        d3.max(ds, d => d.month)
      ])
      .range([0, w]);

    var yScale = d3.scale.linear()
      .domain([
        0, d3.max(ds, d => d.sales)])
      .range([h, 0]);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    var lineFun = d3.svg.line()
      .x(function(d) { return xScale(d.month); })
      .y(function(d) { return yScale(d.sales); })
      .interpolate("linear");

    var svg = d3.select("body").append("svg").attr({ width: w, height: h});

    var axis = svg.append("g").call(yAxis)
      .attr("class", "axis");
      //.attr("transform", "translate(" + padding + ", 0)");

    var viz = svg.append("path").attr({
      d: lineFun(ds),
      "stroke": "purple",
      "stroke-width": 2,
      "fill": "none"
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

});
