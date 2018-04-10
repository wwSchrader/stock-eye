import React, {Component} from 'react';
import '../node_modules/react-vis/dist/style.css';
import {
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  FlexibleWidthXYPlot,
} from 'react-vis';

class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'allStockHistory': [],
      'crosshairValues': [],
    };

    this.onNearestX = this.onNearestX.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.crosshairItemsModifier = this.crosshairItemsModifier.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({allStockHistory: newProps.allStockHistory});
  }

  onNearestX(value, {index}) {
    this.setState({crosshairValues: this.state.allStockHistory.map((data) => {
      return {x: new Date(data.history[index].date).getTime(), y: data.history[index].price};
    })});
  }

  onMouseLeave() {
    this.setState({crosshairValues: []});
  }

  crosshairTitleModifier(dataPoints) {
    return {title: 'Date', value: new Date(dataPoints[0].x).toDateString()};
  }

  crosshairItemsModifier(dataPoints) {
    return dataPoints.map((data, index) => {
      return {title: this.state.allStockHistory[index].stockId, value: data.y};
    });
  }

  render() {
    console.log(this.state.crosshairValues);
    return (
      <FlexibleWidthXYPlot
          height={400}
          xType='time'
          onMouseLeave={this.onMouseLeave}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {this.state.allStockHistory.map((stock) => {
          let individualStockData = stock.history.map((day) => {
            return {x: new Date(day.date).getTime(), y: day.price, stockSymbol: day.stockId};
          });
          return <LineSeries key={stock.stockId} data={individualStockData} onNearestX={this.onNearestX}/>;
        })}
        <Crosshair
            values={this.state.crosshairValues}
            titleFormat={this.crosshairTitleModifier}
            itemsFormat={this.crosshairItemsModifier}
        />
      </FlexibleWidthXYPlot>
    );
  }
}

export default StockGraph;
