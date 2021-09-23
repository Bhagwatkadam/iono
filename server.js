var http = require("http");
var express = require("express");
var router = express();
var server = http.createServer(router);
router.use(express.static(__dirname + "/dist/yitsol-ivault-ux"));
process.env.NODE_PATH = __dirname;
var server_port = 7000;
var server_ip_address = "0.0.0.0";
server.listen(server_port, server_ip_address, function() {
  var addr = server.address();
  console.info("APP server listening at", addr.address + ":" + addr.port);
});
