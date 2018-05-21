var http = require('http');
var papa = require('papaparse');
var fs = require('fs');

const serverInfo = {url: '127.0.0.1', port: '3010'};

var getDataFromRequest = function (request){

  return new Promise(function(fullfill, reject){
    let dataBuffers = [];
    let data;
    request.on('error', function(error){
      reject(error);
    }).on('data', function(chunk){
      dataBuffers.push(chunk);
    }).on('end', function(){
      data = Buffer.concat(dataBuffers).toString();
      fullfill(data);
    });
  });
}

var server = http.createServer(function(request, response){

  var headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = false;
  //headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
  }else if(request.method == 'POST'){
    headers['Content-Type'] = "application/json";
    dataPromise = getDataFromRequest(request);
    dataPromise.then(function(data){
      let file = fs.writeFile('data.csv', papa.unparse(data), function(error){
        if(error) throw error;

        console.log('File is successfully saved');
        response.writeHead(200, headers);
        response.write(JSON.stringify({url: serverInfo.url, port: serverInfo.port, filename: 'data.csv'}));
        response.end();

      });
    });
  }

});

server.listen(serverInfo.port, serverInfo.url);
console.log("Server started at " + serverInfo.url + " port " + serverInfo.port);
