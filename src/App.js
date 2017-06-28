import React, { Component } from 'react';
import './App.css';
import {Astronaut} from './Astronaut'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            error: null,
            number: 0,
            people: []
        }
    }

    componentWillMount() {
        fetch('http://api.open-notify.org/astros.json')
            .then(response => response.json())
            .then(result => this.setState({...this.state, loaded: true, ...result}))
            .catch(error => this.setState({...this.state, error: true}))
    }

  render() {
    const {number, people, loaded, error} = this.state
    return (
      <div className="App">
        <h1>How many</h1>
          {!loaded && !error && <span>Looking at the sky</span>}
          {error && <span>Can't see the sky</span>}
          {loaded && !error &&
              <div>
                  <span>{number}</span>
                  <ul>
                      {people.map(astronaut =>
                          (<Astronaut key={astronaut.name} {...astronaut}/>))}
                  </ul>
              </div>
          }
      </div>
    );
  }
}

export default App;
