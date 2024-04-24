// Fetch the JSON data and console log it
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Function to handle changes in the dropdown selection
function createCharts(cat) {
        d3.json(url).then(function(data) {
        let dataArray= data.samples
        let result=dataArray.filter(x=>x.id == cat)[0] 
        console.log(result);
      });
};





// Function to create panel
function createPanels(dog) {
    d3.json(url).then(function(data) {
        let dataArray= data.metadata
        let result=dataArray.filter(x=>x.id == dog)[0] 
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("")
        for (x in result) {
        PANEL.append("h6").text(`${x}: ${result[x]}`)
            
        }
      });
      
}
function optionChanged(x) {
    createCharts(x);
    createPanels(x);
}

function init() {
    d3.json(url).then((data) => {
        // Populate the dropdown menu
        var select = d3.select("#selDataset");
        data.names.forEach((name) => {
            select.append("option").text(name).property("value", name);
        });
        createCharts(data.names[0]);
        createPanels(data.names[0]);
    });
}

function makeBubble(sample){
    //access the sample data for populating the bubble chart
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //apply a filter that matches based on sample id
        let results = sample_data.filter(id => id.id == sample);
        //access and store the first entry in results filter
        let first_result = results[0];
        console.log(first_result);
        //store the results to display in the bubble chart
        let sample_values = first_result.sample_values;
        let otu_ids = first_result.otu_ids;
        let otu_labels = first_result.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create the trace for bubble chart
        let bubble_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        let layout = {
            title: "Bacteria Count for each Sample ID",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Bacteria'}
        };
        Plotly.newPlot("bubble", [bubble_trace], layout); //'bubble' is the html tag in index.html
    });
};


init();
