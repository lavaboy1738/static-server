var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('Could you include a port number?\nnode server.js 8888 like this?')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method


  console.log('Request received, address：' + pathWithQuery)

  response.statusCode = 200

  const filePath = path === '/' ? '/index.html' : path
  const index = filePath.lastIndexOf('.')

  const suffix = filePath.substring(index)
  const fileTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.jpg':'image/jpeg',
    '.json':'text/json'
  }
  response.setHeader('Content-Type',
    `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
  let content 
  try{
    content = fs.readFileSync(`./public${filePath}`)
  }catch(error){
    content = 'File does not exist'
    response.statusCode = 404
  }
  response.write(content)
  response.end()

})

server.listen(port)
console.log('Listening ' + port + ' Success\nPlease open in browser http://localhost:' + port)
