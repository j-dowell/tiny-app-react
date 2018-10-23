import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryBar } from 'victory';


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
		let formattedArray = [];
		console.log(data)

		const start = new Date(data[0])
    let end = new Date()
    let year = start.getFullYear()
    let month = start.getMonth()
    let day = start.getDate()
    let uniqueDaysArray = [start];

		while(uniqueDaysArray[uniqueDaysArray.length-1] < end) {
			uniqueDaysArray.push(new Date(year, month, ++day));
		}

		function sameDay(d1, d2) {
			let date1 = new Date(d1);
			let date2 = new Date(d2);
			return date1.getFullYear() === date2.getFullYear() && 
				date1.getMonth() === date2.getMonth() && 
				date1.getDate() === date2.getDate();
		}

		console.log(uniqueDaysArray)
		function countClicks(date, list) {
			let count = 0;
			for (let i = 0; i < list.length; i++) {
				console.log(list[i])
				if (sameDay(date, list[i])) {
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
				<VictoryBar
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
