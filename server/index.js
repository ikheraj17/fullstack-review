const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const githubHelper = require('../helpers/github.js');
const save = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log('this route works', req.body);
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  githubHelper.getReposByUsername(req.body.username, (results) => {

      //console.log('BODAYYY', results.body);
      var repos = JSON.parse(results.body);
      console.log('this is one object', repos[0]);
      var newResults = [];
      // console.log(resultsArr);
      // for(var i = 0; i < resultsArr.length; i++) {
      //   var each = resultsArr[i];
      //   newResults.push({repo : each['name']});
      //   //owner --> each.owner.login
      //   //repo --> each.name
      //   //repo URL --> each.html_url
      //   //forks --> each.forks
      // }
      repos.map((repo) => {
        var formatted = {
        Owner : repo.owner.login,
        Repo : repo.name,
        Url : repo.html_url,
        Forks : repo.forks
      };
        newResults.push(formatted);
      })
      console.log('this is the format we are looking for', newResults);
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

