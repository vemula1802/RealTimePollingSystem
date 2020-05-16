require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
  appId: '986682',
  key: '421a81c5d52da7b3d970',
  secret: 'c210d430673a545e2dfc',
  cluster: 'us2',
  encrypted: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

mongoose.connect('mongodb+srv://rvr68:1234567890@cluster0-c5izt.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log("Connected to DB Successfully"))
    .catch(err => console.log("Error in connecting to DB", err));

const UserHits = new mongoose.Schema({
  userName : {
    type: String,
    required: true
  },
  playerVoted : {
    type: String,
    required: true
  }
})

const UserTable = mongoose.model('user-hits',UserHits);

app.get('/getVotes', (req, res) => {
  console.log('test the req body...@@@@@', req.body);
  UserTable.find().then( votes => res.send(votes));
});

app.post('/testVote', (req, res) => {
  console.log('test the req body...@@@@@', req.body);
  const newVote = new UserTable({
    userName: req.body.emailid,
    playerVoted: req.body.player
  })
  newVote.save();
});

// pusher code
 app.post('/vote', (req, res) => {
  console.log('test the vote req body...@@@@@', req.body);
  const { body } = req;
  const { player } = body;

  pusher.trigger('vote-channel', 'vote', {
    player,
  });
  res.json({ player });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
