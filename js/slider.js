$(function () {
    $("#circles-slider")
        .slider({
            min: 1997,
            max: 2016,
            step: 1
        })
        .slider("pips")
        .on("slidechange", function (e, ui) {
            updateData(ui.value);
        });
});

function updateData(year) {
    d3.csv("data/states-gdp.csv", function (data) {
        color.domain([50000, 150000, 500000, 1500000, 2500000]); // setting the range of the input data

        d3.json("data/us-states.json", function (json) {
            // Loop through each state data value in the .csv file
            for (var i = 0; i < data.length; i++) {
                // Grab State Name
                var dataState = data[i].state;

                if (year == 1997) {
                    var dataValue = data[i].y1997;
                } else if (year == 1998) {
                    var dataValue = data[i].y1998;
                } else if (year == 1999) {
                    var dataValue = data[i].y1999;
                } else if (year == 2000) {
                    var dataValue = data[i].y2000;
                } else if (year == 2001) {
                    var dataValue = data[i].y2001;
                } else if (year == 2002) {
                    var dataValue = data[i].y2002;
                } else if (year == 2003) {
                    var dataValue = data[i].y2003;
                } else if (year == 2004) {
                    var dataValue = data[i].y2004;
                } else if (year == 2005) {
                    var dataValue = data[i].y2005;
                } else if (year == 2006) {
                    var dataValue = data[i].y2006;
                } else if (year == 2007) {
                    var dataValue = data[i].y2007;
                } else if (year == 2008) {
                    var dataValue = data[i].y2008;
                } else if (year == 2009) {
                    var dataValue = data[i].y2009;
                } else if (year == 2010) {
                    var dataValue = data[i].y2010;
                } else if (year == 2011) {
                    var dataValue = data[i].y2011;
                } else if (year == 2012) {
                    var dataValue = data[i].y2012;
                } else if (year == 2013) {
                    var dataValue = data[i].y2013;
                } else if (year == 2014) {
                    var dataValue = data[i].y2014;
                } else if (year == 2015) {
                    var dataValue = data[i].y2015;
                } else if (year == 2016) {
                    var dataValue = data[i].y2016;
                }

                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.name;

                    if (dataState == jsonState) {
                        json.features[j].properties.gdp = dataValue;
                        break;
                    }
                }
            }

            svg.selectAll("path")
                .data(json.features)
                .style("fill", function (d) {
                    var value = d.properties.gdp;

                    if (value < 50000) {
                        return "#C5DCD1";
                    } else if (value < 150000) {
                        return "#A3C7B5";
                    } else if (value < 500000) {
                        return "#81B29A";
                    } else if (value < 1500000) {
                        return "#5E8271";
                    } else if (value < 2500000) {
                        return "#3B5146";
                    }
                });
        });
    });
}