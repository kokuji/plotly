function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json("/metadata/${sample}").then(response => {
      var mdata = d3.select("#sample-metadata")

// Use `.html("") to clear any existing metadata
      mdata.hmtl("");
 // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(response).forEach((mvalue) => {
          var cell = mdata.append("h2");
          cell.text(mvalue);
      });


    console.log(response);
 
    
    });
};

    // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);


  function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json("/metadata/${sample}").then(response => {
      var sdata = d3.select('#selDataset')
      sdata.html("");
      Object.entries(response).forEach((svalue) => {
        var cell = sdata.append('h2');
        cell.text(svalue);
    });
  });

      // @TODO: Build a Bubble Chart using the sample data
      var buubbleData = {
      x: sdata.otu_ids,
      y: sdata.sample_values,
      mode: 'markers',
      type: "scatter",
      marker: {
        size: sdata.sample_values,
        color: sdata.otu_ids,
        colorscale: "Earth"
      }
      };


    var layout = {
      title: "Belly Button Bateria Type by Frequency",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Frequency"},
    };
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // .slice()
      // otu_ids, and labels (10 each).
    trace1 = {
      values: sdata.sample_values.slice(0,10),
      labels: sdata.otu_ids.slice(0,10),
      hovertext: out_lable.slice(0,10),
      hoverinfo: "hovertext",
      type: "pie"
    };
      
    var pieData = [trace1]; 


    var pieLayout = {
      margin: {t:0, 1:0}     
    };

    Plotly.newPlot("pie", pieData, pieLayout);

buildPlot();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
