var width = $(window).width();
var height = $(window).height();

var flightCanvas = d3.select("#flight")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "black");

var scale = 0.05;

d3.json("./world-countries.json", function (error, data) {
    console.log(data);

    var projection = d3.geo.mercator();
    var path = d3.geo.path()
        .projection(projection);

    flightCanvas.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr({
            "d": path,
            "stroke": "#465A6B"
        });

    // drawFlight(flightCanvas, scale, 282, 140, 792, 144);

    $(document).on({
        "click": function () {
            var x1 = Math.random() * width;
            var y1 = Math.random() * height;

            var x2 = Math.random() * width;
            var y2 = Math.random() * height;

            drawFlight(flightCanvas, scale, x1, y1, x2, y2);
        }
    });
});

