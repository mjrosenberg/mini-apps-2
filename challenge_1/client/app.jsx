import React from 'react';
import ReactDom from 'react-dom';
import ReactPaginate from 'react-paginate';
import Event from './components/event.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      events: [],
      page: 0,
      keyword: '',
      resultsText: 'All',
      totalPageCount: 0,
      pageCount: 20, //don't hard code this pull it down from the data
    };
    this.getEvents = this.getEvents.bind(this);
    this.changePage = this.changePage.bind(this);
    this.search = this.search.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.getAll = this.getAll.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount(){
    this.getAll('');
    this.getEvents();
    this.setState({
      totalPageCount: this.state.pageCount,
    })
  }

  getAll(suffix){
    fetch(`http://localhost:3000/events${suffix}`)
    .then(response => {
      return response.json()
    })
    .then((data) => {
      if (suffix !== ''){
        // console.log('data is', data);
        this.setState({
          pageCount: data.length/10,
        });
      } else {
        this.setState({
          pageCount: data.length/10,
          totalPageCount: data.length/10,
        });
      }
    })
    .catch((err)=>{
      console.log('err');
    });
  }

  getEvents(){
    const url = `http://localhost:3000/events?_page=${this.state.page}&_limit=10`;
    fetch(url)
    .then(response => {
      return response.json()
    })
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
    this.getAll(`?q=${this.state.keyword}`);
    const url = `http://localhost:3000/events?q=${this.state.keyword}&_page=1`;
    // const url = 'http://localhost:3000/events?q=Greece';
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      // console.log('data from 2nd query is', data);
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

  changePage(e){
    this.setState({
      page: e.selected + 1,
    }, this.getEvents);
  }

  changeKeyword(e){
    console.log('inputted text', e.target.value);
    this.setState({
      keyword: e.target.value,
    });
  }

  resetSearch(){
    this.getEvents();
    this.setState({
      pageCount: this.state.totalPageCount,
      keyword: '',
    });
    document.getElementById('search').value = '';
  }

  render(){
    return (
    <div id='main wrapper'>
      <label for="search">Keyword:</label>
      <input type='text' id='search' name='search' onChange={this.changeKeyword}></input><br></br>
      <button id='searchButton' onClick={this.search}>Search</button>
      <button id='reset' onClick={this.resetSearch}>Reset Search</button><br></br>
      <div id='results'>{this.state.resultsText} Results</div>
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.changePage}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
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