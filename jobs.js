var cron = require('node-cron');
var http = require('http');

cron.schedule('* * * * *', function(){
  //Run task every 3h and 24h.
  //Save data to JSON file.
  //Build content from JSON files
  console.log("Running jobs");
});


//'* * * * * *' - runs every second
//'*/5 * * * * *' - runs every 5 seconds
//'10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
//'0 * * * * *' - runs every minute
//'0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)

var options = {
  host: url,
  port: 80,
  path: '/resource?id=foo&bar=baz',
  method: 'POST'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();