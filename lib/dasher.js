var url = require('url')
var dashButton = require('node-dash-button');
var i = 1;
var toggle = 0;
var request = require('request')

function DasherButton(button) {
  var options = {headers: button.headers, body: button.body, json: button.json}

  this.dashButton = dashButton(button.address, button.interface)


  if(button.url_state_3){
    toggle = 3;
  }
  else if(button.url_state_2){
    toggle = 2;
  }
  else{
    toggle = 0;
  }

  this.dashButton.on("detected", function() {

    if(toggle > 0){
      switch(i){
      case 1:
      console.log(button.name + " pressed in state 1.")
      doRequest(button.url, button.method, options)
      break;
      case 2:
      console.log(button.name + " pressed in state 2.")
      doRequest(button.url_state_2, button.method, options)
      break;
      case 3:
      console.log(button.name + " pressed in state 3.")
      doRequest(button.url_state_3, button.method, options)
      break;
      default:
      doRequest(button.url, button.method, options)
      }
    }
    else {
      console.log(button.name + " pressed.")
      doRequest(button.url, button.method, options)
    }

  })

  console.log(button.name + " added.")
}

function doRequest(requestUrl, method, options, callback) {
  options = options || {}
  options.query = options.query || {}
  options.json = options.json || false
  options.headers = options.headers || {}



  var reqOpts = {
    url: url.parse(requestUrl),
    method: method || 'GET',
    qs: options.query,
    body: options.body,
    json: options.json,
    headers: options.headers
  }

  i++;
  if(i > toggle){
    i = 1;
  }

  request(reqOpts, function onResponse(error, response, body) {
    if (error) {
      console.log("there was an error");
      console.log(error);
    }
    if (response.statusCode === 401) {
      console.log("Not authenticated");
      console.log(error);
    }
    if (response.statusCode !== 200) {
      console.log("Not a 200");
      console.log(error);
    }

    if (callback) {
      callback(error, response, body)
    }
  })
}

module.exports = DasherButton
