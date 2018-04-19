import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import 'whatwg-fetch';


export default class PriceChart extends React.Component {
	constructor(props) {
		super(props);
		/*
		this.state = { prices: [
			{time:'12:01', bid: 12, ask: 19, },
			{time:'12:02', bid: 18, ask: 22,},
			{time:'12:03', bid: 7,  ask: 45,},
		]};*/
		this.state = { prices: [], yAxisDomain:[]};
	}

	componentWillReceiveProps(newProps) {
		let found = newProps.ticks.find( tk => tk.title == newProps.title );

		if(found) {
			this.update({time: newProps.id, bid: found.bid, ask: found.ask});
		}
	}

	update(price) {
		let newPrices = this.state.prices.slice();
		newPrices.push(price);
		let bid = price.bid;
		let ask = price.ask;
		let yDomain = this.state.yAxisDomain.slice();
		let gap = (ask-bid)/2;
		if(yDomain.length<2) {
			yDomain = [(bid-gap), (ask+gap)];
		} else {
			yDomain[0] = bid-gap < yDomain[0]? (bid-gap) : yDomain[0];
			yDomain[1] = ask+gap > yDomain[1]? (ask+gap) : yDomain[1];
		}
		this.setState({prices: newPrices, yAxisDomain: yDomain});	
	}

	render() {
		return (
			<ResponsiveContainer  minHeight={200} height ='30%'>
				<LineChart data={this.state.prices} margin={{top:5, right:5, left:20, bottom:5}}>
					<XAxis dataKey="time"/>
					<YAxis domain={[ Math.floor(this.state.yAxisDomain[0]*10)/10, Math.ceil(this.state.yAxisDomain[1]*10)/10 ]}/>
					<Tooltip />
					<Line type="monotone" dataKey="bid" stroke="#8884d8" />
					<Line type="monotone" dataKey="ask" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

