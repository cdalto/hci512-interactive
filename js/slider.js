$(function () {
    $("#circles-slider")
        .slider({
            min: 1997,
            max: 2016,
            step: 1,
        })
        .slider("pips")
        .on("slidechange", function (e, ui) {
            updateData(ui.value);
        });
});

function updateData(year) {
    d3.csv("data/states-gdp.csv", function (data) {
        color.domain([50000, 150000, 500000, 1500000, 2500000]); // setting the range of the input data

        // Load GeoJSON data and merge with states data
        d3.json("data/us-states.json", function (json) {
            // Loop through each state data value in the .csv file
            for (var i = 0; i < data.length; i++) {

                // Grab State Name
                var dataState = data[i].state;

                if (year == 1997) {
                    var dataValue = data[i].y1997;
                } else if (year == 1998) {
                    var dataValue = data[i].y1998;
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
                .style("fill", function (d) {
                    var value = d.properties.gdp;
                    console.log(d.properties)

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