function demoInfo(sample) {
  console.log(sample);
  d3.json("samples.json").then((data) => {
    let metaData = data.metadata;
    let result = metaData.filter((sampleResult) => sampleResult.id == sample);
    let resultData = result[0];
    console.log(resultData);
    d3.select("#sample-metadata").html("");
    Object.entries(resultData).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

function buildBarChart(sample) {
  d3.json("samples.json").then((data) => {
    let sampleData = data.samples;
    let result = sampleData.filter((sampleResult) => sampleResult.id == sample);
    let resultData = result[0];
    console.log(resultData);

    var sample_values = resultData.sample_values;
    var otu_ids = resultData.otu_ids;
    var otu_labels = resultData.otu_labels;

    let yticks = otu_ids.slice(0, 10).map((id) => `OTU ${id}`);
    let xValues = sample_values.slice(0, 10);
    let textLabels = otu_labels.slice(0, 10);

    let barChart = {
      y: yticks.reverse(),
      x: xValues.reverse(),
      text: textLabels,
      type: "bar",
      orientation: "h",
    };

    let layout = {
      title: "Top 10 belly button Bacteria",
    };
    Plotly.newPlot("bar", [barChart], layout);
  });
}

function buildBubbleChart(sample) {
  d3.json("samples.json").then((data) => {
    let sampleData = data.samples;
    let result = sampleData.filter((sampleResult) => sampleResult.id == sample);
    let resultData = result[0];
    console.log(resultData);

    var sample_values = resultData.sample_values;
    var otu_ids = resultData.otu_ids;
    var otu_labels = resultData.otu_labels;

    let BubbleChart = {
      y: sample_values,
      x: otu_ids,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      },
    };

    let layout = {
      title: "Bacteria Culutures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };
    Plotly.newPlot("bubble", [BubbleChart], layout);
  });
}

function initialize() {
  let select = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;
    console.log(data);

    sampleNames.forEach((sample) => {
      select.append("option").text(sample).property("value", sample);
    });
    let sample1 = sampleNames[0];
    demoInfo(sample1);
  });
}

function optionChanged(item) {
  demoInfo(item);
  buildBarChart(item);
  buildBubbleChart(item);
}
initialize();
