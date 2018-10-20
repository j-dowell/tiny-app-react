import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip, VictoryPie } from 'victory';

export class CustomLabel extends React.Component {
  render() {
    return (
      <g>
        <VictoryLabel {...this.props}/>
        <VictoryTooltip
          {...this.props}
          x={200} y={250}
          text={`# ${this.props.text}`}
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

export class Test extends React.Component {
  render() {
    return (
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          style={{ labels: { fill: "white" },  parent: { maxWidth: "100%" }  }}
          innerRadius={100}
          labelRadius={120}
          labels={(d) => d.label}
          labelComponent={<CustomLabel/>}
          data={[
            {x: 1, y: 12, label:'UK' },
            {x: 2, y: 15, label:'US'},
            {x: 3, y: 5, label:'Canada' },
          ]}
        />
    );
  }
}

