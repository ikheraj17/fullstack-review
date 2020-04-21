import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    //put AJAX post request below
    // $.ajax({
    //   type: "POST",
    //   url: '/repos',
    //   data: term,
    //   success: (data) => {
    //     console.log("This request works!")
    //   }
    //   error:
    // })
    $.post('/repos', {username : term}, (data) => {
      if(!data) {
        console.log("there is no data yet");
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));