import React, {Component} from 'react';

class StockSymbolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: '',
    };

    this.onStockSymbolChange = this.onStockSymbolChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onStockSymbolChange(e) {
    this.setState({
      stockSymbol: e.target.value,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    fetch('/api/addStock?symbol=' + this.state.stockSymbol, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then((resp) => console.log('Stock symbol sent'));
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
      </form>
    );
  }
}

export default StockSymbolForm;
