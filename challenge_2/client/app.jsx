import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ticker: 'BTC',
      startDate: '2017-01-01',
      endDate: '2018-01-01',
      data: {},
      disclaimer: '',
      hasData: false,
    };
    this.getBTCData = this.getBTCData.bind(this);
  }
  componentDidMount(){
    this.getBTCData();
  }
  getBTCData(){
    const url = `http://localhost:3000/price/between/${this.state.startDate}/${this.state.endDate}`;
    fetch(url)
      .then(response => response.json())
      .then((data)=>{
        this.setState({
          data: data.bpi,
          disclaimer: data.disclaimer,
          hasData: true,
        });
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  render(){
    if (this.state.hasData) {
      return(
        <div id='mainWrapper'>
          Hello World
          {/* {this.state.data} */}
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

