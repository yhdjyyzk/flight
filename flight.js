//参数，svg元素，飞机的放缩比例，飞机的起点x坐标，y坐标，飞机的终点x坐标，y坐标

function drawFlight(svg, scale, x1, y1, x2, y2) {
    var centerX = 34.573;
    var centerY = 35.501;

    var newX = centerX * scale;
    var newY = centerY * scale;

    var tranX = (x1 - newX) / scale;
    var tranY = (y1 - newY) / scale;

    var flightG = svg.append("g")
        .attr({
            "name": "flightG",
            "transform": "scale(" + scale + ")",
            "cursor": "pointer"
        })
        .on("mouseover", function () {
            d3.select(this).attr({
                "opacity": "0.5"
            });
        })
        .on("mouseout", function () {
            d3.select(this).attr({
                "opacity": "1"
            });
        });

    var flightPath = svg.append("path")
        .attr({
            "d": drawArc(x1, y1, x2, y2),
            "stroke": "#FDDA2C",
            "stroke-width":"2",
            "fill": "none"
        });

    flightG.append("path")
        .attr({
            "d": "M-28.667,43.887L-154,37.387l-50,70.5h-22.5l22.5-91l-22.5-92.5h23.5l48.5,69l125.834-6.5l-82.834-172H-64l117,167l123,1c0,0,49,1,50.5,33c0,1-3,31-47,32.5c0-0.5-125.5,0.5-125.5,0.5l-118,168h-46.5L-28.667,43.887z",
            "fill": "orange"
        });

    flightG.transition()
        .duration(2000)
        .attrTween("transform", translateAlong(flightPath.node(), scale))
        .select("path")
        .remove();

    setTimeout(function(){
        flightPath.remove();
    },2000);
}

function translateAlong(path, scale) {
    var l = path.getTotalLength();
    var start = false;
    var startPoint;

    return function (d, i, a) {
        return function (t) {
            var p = path.getPointAtLength(t * l);

            if (!start) {
                startPoint = p;
                start = true;
                return "translate(" + (p.x) + "," + (p.y) + ") scale(" + scale + ")";
            } else {
                var deg = Math.atan((p.y - startPoint.y) / (p.x - startPoint.x)) / Math.PI * 180;
                startPoint = p;
                return "translate(" + (p.x) + "," + (p.y) + ") scale(" + scale + ") rotate(" + deg + ")";
            }
        };
    };
}

function drawArc(sourceX, sourceY, targetX, targetY) {
    var dx = targetX - sourceX,
        dy = targetY - sourceY,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + sourceX + "," + sourceY + "A" + dr + "," + dr +
        " 0 0,1 " + targetX + "," + targetY;
}