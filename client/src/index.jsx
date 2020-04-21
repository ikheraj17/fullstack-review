import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    }

  }

  componentDidMount () {
    var results = [];
    $.get('/repos')
      .then(repos => {
        var count = repos.shift();
        console.log(count);
        console.log(repos);
        repos.forEach(repo => {
          var repoArr = "Owner: " + repo.Owner + " || " + "Repo Name: " + repo.Repo + " || " + repo.Url + '\n';
          results.push(repoArr);
        })

        console.log(results);

        this.setState({
          repos : results
        })
      })
      .catch( err => {
        console.log(err);
      })
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
        console.log("no data posted");
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