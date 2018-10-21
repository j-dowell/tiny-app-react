import React from 'react';
import { VictoryLegend, VictoryTooltip, VictoryPie } from 'victory';

export class CustomLabel extends React.Component {
  render() {
    return (
      <g>
        {/* <VictoryLabel {...this.props}/> */}
        <VictoryTooltip
          {...this.props}
          x={200} y={250}
          text={`${this.props.text}`}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          width={100}
          height={100}
          flyoutStyle={{ fill: "black" }}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export class CountryPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    let x = this.convertData(this.props.data)
    this.setState({
      data: x
    })
  }
  convertData = (data) => {
    let count = 0;
    let formattedArray = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data)
      let countryInfo = {};
      countryInfo['x'] = count;
      countryInfo['y'] = data[i].count;
      countryInfo['label'] = data[i].country;
      countryInfo['name'] = data[i].country;
      formattedArray.push(countryInfo);
      count++;
    }
    return formattedArray;
  }

  render() {
    const colorArray = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    return (
      <div>
      {this.state.data ? (
        <div>
          <VictoryPie
            colorScale={colorArray}
            style={{ labels: { fill: "white" },  parent: { maxWidth: "100%" }  }}
            innerRadius={100}
            labelRadius={120}
            // labels={(d) => d.label}
            labelComponent={<CustomLabel/>}
            data={this.state.data}
          />
          <VictoryLegend x={125} y={50}
            title="Legend"
            centerTitle
            orientation="vertical"
            gutter={20}
            style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
            colorScale={colorArray}
            data={this.state.data}
          />
        </div>
        ) : (
          <p>loading</p>
        )}
        </div>
    );
  }
}

