require('dotenv').config();
var dns = require('dns');
let urlMapper = require('./urlshortener')
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.use(bodyParser.urlencoded({extended : false}));
app.get('/api/shorturl/:short_url', function(req, res) {
  full_url = urlMapper.getFullUrl(req.params.short_url)
  if (full_url != "Not Found") {
    res.redirect("http://"+full_url);
  }
});
app.post('/api/shorturl', function(req, res) {
  dns.lookup(req.body.url, function (err, addresses, family) {
  if (err) {
    res.json({
      'error': 'invalid url'
    })
  }
  else {
    res.json(
      { "origal_url": req.body.url,
        "short_url": urlMapper.urlMapper(req.body.url)
      }
      );
  }
  });
      
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
