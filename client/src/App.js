import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  subscribeToAddStockHistory,
  subscribeToDeleteStockHistory}
  from './api';
import StockSymbolForm from './StockSymbolForm';
import StockGraph from './StockGraph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressMessage: '',
      allStockHistory: [],
    };

    subscribeToAddStockHistory(
      (err, newStockHistory) => this.setState({
        allStockHistory: this.state.allStockHistory.concat(newStockHistory)})
    );

    subscribeToDeleteStockHistory(
      (err, stockSymbol) => {
        let indexOfStockToRemove = this.state.allStockHistory
          .findIndex((allStockHistory) => {
            return allStockHistory.stockId === stockSymbol;
          });
        // copy all stock history array
        let newStockHistoryArray = this.state.allStockHistory.slice();
        // remove element from new array
        newStockHistoryArray.splice(indexOfStockToRemove, 1);
        this.setState({allStockHistory: newStockHistoryArray});
      }
    );

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
        <StockGraph allStockHistory={this.state.allStockHistory} />
      </div>
    );
  }
}

export default App;
