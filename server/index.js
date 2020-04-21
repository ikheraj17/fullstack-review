const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const githubHelper = require('../helpers/github.js');
const db = require('../database/index.js');

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

      var repos = JSON.parse(results.body);
      //console.log('this is one object', repos[0]);
      var newResults = [];

      repos.map((repo) => {
        var formatted = {
        Owner : repo.owner.login,
        Repo : repo.name,
        Url : repo.html_url,
        Forks : repo.forks
      };
        newResults.push(formatted);
      })
      // console.log('this is the format we are looking for', newResults);

      db.save(newResults, (err,docs) => {
        if(err) {
          console.log('mongoose error')
        } else {
          console.log('mongoose works!', docs);
        }
      });
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  console.log("request route working");
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

