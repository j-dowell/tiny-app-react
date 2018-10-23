import React, { Component } from 'react';
import { VictoryChart, VictoryLine } from 'victory';


export class LineGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		let convertedData = this.convertData(this.props.data)
		this.setState({
		  data: convertedData
		})
	}
	convertData = (data) => {
		let uniqueDaysArray = [];
		let formattedArray = [];
		console.log(data)
		for (let i = 0; i < data.length; i++) {
			if (!uniqueDaysArray.includes(data[i].slice(0, 10))) {
				uniqueDaysArray.push(data[i].slice(0, 10));
			}
		}
		console.log(uniqueDaysArray)
		function countClicks(date, list) {
			let count = 0;
			for (let i = 0; i < list.length; i++) {
				if (date === list[i].slice(0, 10)) {
					count++
				}
			}
			return count
		}
		for (let i = 0; i < uniqueDaysArray.length; i++) {
			let day = uniqueDaysArray[i]
			let uniqueClickObject = {};
			uniqueClickObject['x'] = day
			uniqueClickObject['y'] = countClicks(day, data);
			formattedArray.push(uniqueClickObject);
		}
		console.log(formattedArray)
		return formattedArray
	  }

render() {
  
	return (
		<div>
		{this.state.data ? (
			<VictoryChart>
				<VictoryLine
					style={{
					data: { stroke: "#c43a31" },
					parent: { border: "1px solid #ccc"}
					}}
					data={this.state.data}
				/>
			</VictoryChart>
			) : (<p>no data</p>)
		}
		</div>
	)
	}
}
