const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  Owner: String,
  Repo: {
    type: String,
    unique: true
  },
  Url: {
    type: String,
    unique: true
  },
  Forks: Number
});

let Repo = mongoose.model('Repo', repoSchema, 'repos');


let save = (repos, callback) => {
  Repo.insertMany(repos)
    .then((docs) =>{
      callback(null, docs);
    })
    .catch((err) => {
      callback(err, null);
    });
}
//count every repo in database
// let countEm = (callback) => {
//   Repo.count()
//       .then(count => {
//         callback(null, count);
//       })
//       .catch(err => {
//         callback(err, null);
//       })
// }
//get the top 25 repos
let top25 = (callback) => {
  Repo.find().sort([['Forks', 'desc']]).limit(25)
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      console.log('database query error')
      callback(err, null)
    })
}
module.exports.top25 = top25;
module.exports.save = save;
// module.exports.countEm = countEm;