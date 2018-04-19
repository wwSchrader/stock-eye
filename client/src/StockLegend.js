import React, {Component} from 'react';
import '../node_modules/react-vis/dist/style.css';
import {DiscreteColorLegend} from 'react-vis';

class StockLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStockHistory: this.extractStockSymbols(props.allStockHistory),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      allStockHistory: this.extractStockSymbols(newProps.allStockHistory),
    });
  }

  extractStockSymbols(allStockHistory) {
    return allStockHistory.map((item) => item.stockId);
  }

  render() {
    return (
      <DiscreteColorLegend
          orientation='horizontal'
          items={this.state.allStockHistory}
      />
    );
  }
}

export default StockLegend;
