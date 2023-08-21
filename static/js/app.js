const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
console.log(data);
});

//creating dropdown event
//call init function
function init (){
//console log to see if funcxtion is running
    //console.log("init function is running");

    d3.json(url).then(function(data){
     let names = data.names
     let dropdownMenu = d3.select("#selDataset")
     //console.log(names)
     //console.log(dropdownMenu)
     for (let i = 0; i < names.length; i++) {
       dropdownMenu.append("option").text(names[i]).property("value",names[i]);
   
    
    }})}
// 

//Build the initial plots
        buildCharts(940)
      

    init();
// //Build charts function
//turn into a filter for id 
    function buildCharts (id) {

    d3.json(url).then(function(data) {

    let samplesData = data.samples
    //console.log(samplesData);

     // Filter the samples data by the individual id
     let result = samplesData.filter(row => row.id == id);
     let sampleResult = result[0];
     console.log(sampleResult);

     /// Get the OTU IDs
      let otuId = sampleResult.otu_ids;
     //console.log(otuId);

    /// Obtain the top 10 sample values 
      let topTenSamples = sampleResult.sample_values.slice(0,10).reverse();
    //console.log(topTenSamples);

    /// Obtain the respective labels 
     let topTenLabels = sampleResult.otu_labels.slice(0,10).reverse();
    //console.log(topTenLabels);

    /// Obtain the top 10 respective OTU IDs
     let topTenIds = otuId.slice(0,10).map(x => "OTU" + x).reverse();
    //console.log(topTenIds);
 
    //Bar Chart 
    let trace1= {
     x: topTenSamples,
     y: topTenIds,
     type: "bar",
     text: topTenLabels,
    orientation: "h",
    };

    let plotData = [trace1];
    let layout ={
    title: "Top ten OTUs"
     };
    
    Plotly.newPlot("bar",plotData,layout);

   //Build bubble chart
   let trace2 = {
    x: sampleResult.otu_ids,
    y: sampleResult.sample_values,
    mode: "markers",
    marker: {
      size: sampleResult.sample_values,
      color: sampleResult.otu_ids,
      colorscale: "Earth"
    },
    text: sampleResult.otu_labels
  };

    // Create the data variable 
    let plotBubble = [trace2]
    // Create the layout 
    let layoutBubble = {
      title: "<b>OTU Bubble Chart </b>",
      xaxis: {
        title: "OTU ID"
      },
      showlegend: false,
      height: 600, 
      width: 1200
    };

    // Create the bubble chart 
    Plotly.newPlot("bubble", plotBubble, layoutBubble);
  });
}

// Account for the change event and retrieve the new plots/info when 
// new id selected 
function optionChanged(newID) {
  buildCharts(newID);
}

init();

