import React from 'react';
import ReactDom from 'react-dom';
import PriceChart from './components/chart.jsx';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ticker: 'BTC',
      startDate: '2019-01-01',
      endDate: '2020-01-01',
      data: {},
      disclaimer: '',
      hasData: false,
    };
    this.getBTCData = this.getBTCData.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        this.setState({
          disclaimer: 'invalid date chosen'
        })
      });
  }

  handleChange(e){
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    })

  }

  render(){
    if (this.state.hasData) {
      return(
        <div id='mainWrapper'>
          <label>
            Start Date:
            <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} min="2011-01-01"></input>
          </label>
          <label>
            End Date:
            <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} min={this.state.startDate}></input>
          </label>
          <button id='regenerate' onClick={this.getBTCData}>Generate Price Graph</button>
          <PriceChart data={this.state.data} />
          <div id='disclaimer'>{this.state.disclaimer}</div>
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

