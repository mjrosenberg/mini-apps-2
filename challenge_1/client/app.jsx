import React from 'react';
import ReactDom from 'react-dom';
import ReactPaginate from 'react-paginate';
import Event from './components/event.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      events: [],
      page: 1,
      keyword: '',
      resultsText: 'All',
    };
    this.getEvents = this.getEvents.bind(this);
    this.changePage = this.changePage.bind(this);
    this.search = this.search.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
  }

  componentDidMount(){
    this.getEvents();
  }

  getEvents(){
    const url = `http://localhost:3000/events?_page=${this.state.page}&_limit=10`;
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        events: data,
        resultsText: 'All',
      });
    })
    .catch((err)=>{
      console.log('err');
    });
  }

  search(){
    // const keyword = document.getElementById('search').value;
    const url = `http://localhost:3000/events?q=${this.state.keyword}&_page=${1}`;
    // const url = 'http://localhost:3000/events?q=Greece';
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        events: data,
        page: 1,
        resultsText: this.state.keyword,
      });
    })
    .catch((err)=>{
      console.log('err');
    });
  }

  changePage(){
    setState({
      page: this.state.page+1,
    })
  }

  changeKeyword(e){
    console.log('inputted text', e.target.value);
    this.setState({
      keyword: e.target.value,
    });
  }
  render(){
    return (
    <div id='main wrapper'>
      <label for="search">Keyword:</label>
      {/* <input type="text" id="fname" name="fname" value="John"><br><br></br> */}
      <input type='text' id='search' name='search' onChange={this.changeKeyword}></input><br></br>
      <button id='searchButton' onClick={this.search}>Search</button><br></br>
      <div id='results'>{this.state.resultsText} Results</div>
      {this.state.events.map((event) => {
        // console.log('event is', event);
        return(
          // <div> Event Here</div>
          <Event event={event}/>
        );
      })}
    </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));