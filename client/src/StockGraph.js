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

  // to supply the crosshair the data points
  onNearestX(value, {index}) {
    this.setState({crosshairValues: this.state.allStockHistory.map((data) => {
      return {x: new Date(data.history[index].date).getTime(),
        y: data.history[index].price};
    })});
  }

  onMouseLeave() {
    this.setState({crosshairValues: []});
  }

  // to return a title that produces a readable date string
  crosshairTitleModifier(dataPoints) {
    return {title: 'Date', value: new Date(dataPoints[0].x).toDateString()};
  }

  // to lable each stock by their stock symbol
  crosshairItemsModifier(dataPoints) {
    return dataPoints.map((data, index) => {
      let crosshairItemTitle = '';
      if (typeof this.state.allStockHistory[index] !== 'undefined') {
        crosshairItemTitle = this.state.allStockHistory[index].stockId;
      }
      return {title: crosshairItemTitle, value: data.y};
    });
  }

  render() {
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
        {this.state.allStockHistory.map((stock, index) => {
          let animationType = 'wobbly';
          let individualStockData = stock.history.map((day) => {
            return {x: new Date(day.date).getTime(),
              y: day.price, stockSymbol: day.stockId};
          });
          // only attach onNearestX to first series
          if (index === 0) {
            return <LineSeries key={stock.stockId}
                data={individualStockData}
                onNearestX={this.onNearestX}
                animation={animationType}
                   />;
          } else {
            return <LineSeries key={stock.stockId}
                data={individualStockData}
                animation={animationType}
                   />;
          }
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
