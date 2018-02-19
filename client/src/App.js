import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressMessage: '',
    };

    this.getExpressMessage = this.getExpressMessage.bind(this);
  }

  componentDidMount() {
    this.getExpressMessage();
  }
  getExpressMessage() {
    fetch('/api/')
    .then((resp) => resp.json())
    .then((res) => {
      this.setState({expressMessage: res.title});
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
      </div>
    );
  }
}

export default App;
