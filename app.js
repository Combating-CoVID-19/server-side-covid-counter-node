const request = require('request');


setInterval(function(){
request("https://pomber.github.io/covid19/timeseries.json", { json: true }, (err, res, body) => {
  if (err) { 
      return console.log(err); 
  }
  var i;
  for(i=0; i < body["Argentina"].length; i++)

  console.log(body.id);
  console.log(body.title);
});
}, 600*1000);