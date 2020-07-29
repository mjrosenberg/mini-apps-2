import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{
  constructor(){
    super(props);
    this.state = {

    };
  }

  render(){
    return (
    <div>
      Hello World
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));