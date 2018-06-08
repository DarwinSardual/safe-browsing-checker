var http = require('http');
var papa = require('papaparse');
var fs = require('fs');

const serverInfo = {url: '34.224.67.238', bind: '0.0.0.0', port: '8081'};

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

var saveToCSV = function(data, callback = null){
  console.log('saving data to the server');
  let file = fs.writeFile('data.csv', papa.unparse(data), function(error){
    if(error) throw error;
    console.log('File is successfully saved on the server');
    // call the callback if theres any
    callback && callback();
  });
};

var serveExportResponse = function(response, headers, statusCode){
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);
  let responseParams;

  if(statusCode == 200)
    responseParams = {statusCode: statusCode, url: serverInfo.url, port: serverInfo.port, filename: 'data.csv'};
  else if(statusCode == 400)
    responseParams ={statusCode: statusCode};

  response.write(JSON.stringify(responseParams));
  response.end();
}

var serveDataCSV = function(response, headers){
  headers['Content-Type'] = "text/csv";
  response.writeHead(200, headers);
  fs.createReadStream(__dirname + '/data.csv').pipe(response)
};

var serveSettings = function(response, headers){
  headers['Content-Type'] = "application/json";
  response.writeHead(200, headers);
  fs.createReadStream(__dirname + '/settings.json').pipe(response);

}

var saveSettings = function(params, callback = null){
  console.log('Saving settings on the server');
  let file = fs.writeFile('settings.json', params, function(error){
    if(error) throw error;
    console.log('Settings save successfully');

    callback && callback();
  })
}

var server = http.createServer(function(request, response){

  var headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = false;
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

  if (request.method === 'OPTIONS') {
    //handle preflight request
    response.writeHead(200, headers);
    response.end();
  }else if(request.method == 'POST'){

    if(request.url === '/export' || request.url === 'export/'){
      dataPromise = getDataFromRequest(request);
      dataPromise.then(function(data){
        // write the data to the buffer and send it back to the user
        try{
          saveToCSV(data, ()=>{
            serveExportResponse(response, headers, 200)
          });
        }catch(error){
          console.log('export file was not successfully save');
          console.log(error.message);
          exportResponse(response, headers, 400);
        }
      });
    }else if(request.url === '/settings' || request.url === '/settings/'){
      dataPromise = getDataFromRequest(request);
      dataPromise.then(function(data){
        saveSettings(data, ()=>{
          serveSettings(response, headers)
        });
      });
    }
  }else if(request.method === 'GET'){
    if(request.url === '/data.csv' || request.url === '/data.csv/'){
      // handle if data.csv is requested on the link
      console.log('data.csv requested');
      serveDataCSV(response, headers);
    }else if(request.url === '/settings' || request.url === '/settings/'){
      serveSettings(response, headers);
    }
  }
});

server.listen(serverInfo.port, serverInfo.bind);
console.log("Server started at " + serverInfo.bind + " port " + serverInfo.port);
