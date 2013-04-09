var http = require("http");
var url = require("url");
var router = require("./router");

var start = function ()
{
	http.createServer(function (request, response){
		response.writeHead(200, {"Content-Type": "text/plain"});
		router.processUrl(url.parse(request.url), response);
	}).listen(8888);
}

exports.start = start;