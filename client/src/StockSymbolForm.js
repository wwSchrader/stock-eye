import React, {Component} from 'react';

class StockSymbolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: '',
    };

    this.onStockSymbolChange = this.onStockSymbolChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeleteButtonPress = this.onDeleteButtonPress.bind(this);
  }

  onStockSymbolChange(e) {
    this.setState({
      stockSymbol: e.target.value,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    fetch('/stocks/addStock', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({stockSymbol: this.state.stockSymbol}),
    })
    .then((resp) => console.log('Stock symbol sent'));
  }

  onDeleteButtonPress() {
    fetch('/stocks/deleteStock', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({stockSymbol: this.state.stockSymbol}),
    })
    .then((resp) => console.log('Stock delete sent'));
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        Stock Symbol:
        <input
            type='text'
            name='stockSymbolInput'
            value={this.state.stockSymbol}
            onChange={this.onStockSymbolChange}
        />
        <input
            type='submit'
            value='Add'
        />
        <button onClick={this.onDeleteButtonPress}>Remove</button>
      </form>
    );
  }
}

export default StockSymbolForm;
