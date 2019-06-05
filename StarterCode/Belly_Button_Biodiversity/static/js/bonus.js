function buildGauge(wfreq) {
    // Enter the washing frequency btweeen ) and 180
    let level = parseFloat(wfreq) * 20;

    // Trig to calc meter point
    let degrees = 180 - level;
    let radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    // Path may have to change to create improved trianage
    let mainPath = "M-.0 -0.05 L .0 0.05 L";
    let pathX = String(x);
    let space =  " ";
    let pathY = String (y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    let data = [
        {
            type: "scattter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "850000"},
            showlegend: false,
            text: level,
            hoverinfo: "text+name"
        },
        {
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0,105,11,.5)",
                    "rgba(10,120,22,.5)",
                    "rgba(14,127,0,.5)",
                    "rgba(110,154,22,.5)",
                    "rgba(170,202,42,.5)",
                    "rgba(202,209,95,.5)",
                    "rgba(210,206,145,.5)",
                    "rgba(232,226,202,.5)",
                    "rgba(240,230,215,.5)",
                    "rgba(255,255,255,0)",
                ]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showleged: false
            }
    ]
    var layout = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor: "850000",
                line: {
                color: "85000"
                }
            } 
        ],
        title: "Belly Button Washing Frequency <br> Scrubs per Week",
        height: 500,
        wdith: 500,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1],
        }, 
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1],
        }
    }

    let GAUGE = document.getElementById("gauge");
    Plotly.newPlot("gauge", data, layout);
}
