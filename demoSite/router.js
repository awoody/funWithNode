var querystring = require("querystring");
var fs = require("fs");

var InternalRequestResolver = function()
{

};

InternalRequestResolver.prototype._this_is_a_test = function(params, response)
{
	response.write(JSON.stringify(params));
	response.end();
};

InternalRequestResolver.prototype.index = function(response)
{
	fs.readFile('./index.html', function(err, html){
		if(err)
			throw err;

		response.writeHeader(200, {"Content-Type" : "text/html"});
		response.write(html);
		response.end();
	})
};

var resolver = new InternalRequestResolver();

var processUrl = function(url, response)
{
	console.log("Parsing URL");
	var path = url.pathname.replace(/\//g, "_");;
	var params = querystring.parse(url.query);

	console.log(path);
	console.log(params);

	try
	{
		resolver[path](params, response);
	}
	catch(e)
	{
		resolver.index(response);
	}
};





exports.processUrl = processUrl;