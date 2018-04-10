import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {subscribeToStockSymbolMessages} from './api';
import StockSymbolForm from './StockSymbolForm';
import StockGraph from './StockGraph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressMessage: '',
      stockSymbol: 'no stock symbol yet',
      allStockHistory: [],
    };

    subscribeToStockSymbolMessages(
      (err, stockSymbol) => this.setState({stockSymbol}));

    this.getExpressMessage = this.getExpressMessage.bind(this);
    this.getAllStockHistory = this.getAllStockHistory.bind(this);
  }

  componentDidMount() {
    this.getExpressMessage();
    this.getAllStockHistory();
  }

  getExpressMessage() {
    fetch('/message')
    .then((resp) => resp.json())
    .then((res) => {
      this.setState({expressMessage: res.title});
    });
  }

  getAllStockHistory() {
    fetch('/stocks/getAllHistory')
    .then((resp) => resp.json())
    .then((res) => {
      this.setState({allStockHistory: res});
      console.log('History received!');
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.expressMessage}
        </p>
        <StockSymbolForm/>
        <p>
          Stock symbol: {this.state.stockSymbol}
        </p>
        <StockGraph allStockHistory={this.state.allStockHistory} />
      </div>
    );
  }
}

export default App;
