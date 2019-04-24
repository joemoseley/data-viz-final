var margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
};
var hH = innerHeight-margin.top-margin.bottom;
var wH = innerWidth - margin.left-margin.right;

var svgH = d3.select("#mapHS")
            .append("svg")
            .attr("height", hH)
            .attr("width", wH);
d3.json("data/zipcodes.geojson").then(function(chi) {
d3.csv("data/Data-Master.csv").then(function(data) {

//FILTER DATA
  var titleone = _.filter(data, function(d) {
    if (d.Title_1_Eligible == "TRUE" && d.Average_Performance != "#DIV/0!") {
      return d;
    }
  });
  console.log(titleone);
  var titleoneES = _.filter(titleone, function(d) {
    if (d.Primary_Category == "ES") {
      return d;
    }
  });
  console.log(titleoneES);
  var titleoneHS = _.filter(titleone, function(d) {
    if (d.Primary_Category == "HS") {
      return d;
    }
  });
  console.log(titleoneHS);
  console.log(chi);

//CREATE MAP
  var center = d3.geoCentroid(chi);
  var scale = 64000;

  var projection = d3.geoMercator()
                     .scale(scale)
                     .center(center);
  var path = d3.geoPath()
               .projection(projection);

  var map = svgH.append("g")
               .attr("id", "map")
  map.selectAll("path")
     .data(chi.features)
     .enter()
     .append("path")
     //.attr("id", "conn")
     .attr("d", path)
     .attr("fill", "steelblue")
     .attr("stroke", "white")
     .attr("stroke-width", "2px");

//PLOT POINTS
  var plotSchoolsH = map.selectAll("circle")
                 .data(titleoneHS)
                 .enter()
                 .append("circle")
                 .attr("class", "map_pointsHS")
                 .attr("cx", function(d) {
                   return projection([+d.School_Longitude,+d.School_Latitude])[0];
                 })
                 .attr("cy", function(d) {
                   return projection([+d.School_Longitude,+d.School_Latitude])[1];
                 })
                 .attr("fill", "red")
                 .attr("r", "5px")


//INTERACTIVITY
                 .on("mouseover", function(d) {
                //   d3.select(this).attr("fill", "black");
                console.log("mouse over");
                    d3.select(".tooltip").classed("hidden",false)

                 })
                 .on("mousemove", function(d) {
                   var currentX = d3.event.pageX + 10;
                   var currentY = d3.event.pageY + 10;
                   d3.select(".tooltip")
                     .style("left",currentX + "px")
                     .style("top",currentY + "px")
                     .html("<p>Name: " + d.Long_Name + "<br/>" + "Enrollment: " + d.Student_Count_Total + "<br/>" + d.Percent_Low_Income + "% Low Income Students" + "<br/>" + "Average Test Score Percentile: " + d.Average_Performance);
                 })
                 .on("mouseout", function(d) {
                //   d3.select(this).attr("fill", "red");
                    d3.select(".tooltip").classed("hidden",true);
                 });


})

})
