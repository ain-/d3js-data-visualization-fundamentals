var scale = d3.scale.linear();

var scale = d3.scale.linear()
  .domain([130, 350])
  .range([10, 100]);

console.log(scale(300));
console.log(scale(270));
console.log(scale(150));
