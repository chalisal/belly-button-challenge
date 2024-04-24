// Fetch the JSON data and console log it
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// // Function to handle changes in the dropdown selection
// function createCharts(cat) {
//         d3.json(url).then(function(data) {
//         let dataArray= data.samples
//         let result=dataArray.filter(x=>x.id == cat)[0] 
//         console.log(result);
//       });
// };





// Function to create panel
function createPanels(dog) {
    d3.json(url).then(function (data) {
        let dataArray = data.metadata
        let result = dataArray.filter(x => x.id == dog)[0]
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("")
        for (x in result) {
            PANEL.append("h6").text(`${x}: ${result[x]}`)

        }
    });

}
function optionChanged(x) {
    makeBubble(x);
    createPanels(x);
}

function init() {
    d3.json(url).then((data) => {
        // Populate the dropdown menu
        var select = d3.select("#selDataset");
        data.names.forEach((name) => {
            select.append("option").text(name).property("value", name);
        });
        makeBubble(data.names[0]);
        createPanels(data.names[0]);
    });
}

function makeBubble(sample) {
    //access the sample data for populating the bubble chart
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //apply a filter that matches based on sample id
        let results = sample_data.filter(y => y.id == sample)[0];
        //access and store the first entry in results filter
        console.log(results);
        //store the results to display in the bubble chart
        let sample_values = results.sample_values;
        let otu_ids = results.otu_ids;
        let otu_labels = results.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create the trace for bubble chart
        let bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        let layout = {
            title: "Bacteria Count for each Sample ID",
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Number of Bacteria' }
        };
        Plotly.newPlot("bubble", [bubble_trace], layout); //'bubble' is the html tag in index.html


        let yTicks = otu_ids.map(x => `OTU ${x} `)



        //create the trace for bar chart
        let barTrace = {
            x: sample_values.slice(0,10).reverse(),
            y: yTicks.slice(0,10).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: "h"
          };
          
          let barData = [barTrace];
          
          let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis: {
                "title": "Number of Bacteria"
            }

          };
          
          Plotly.newPlot("bar", barData, barLayout);
          






    });
};


init();
