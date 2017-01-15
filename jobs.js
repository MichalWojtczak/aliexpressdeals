var cron = require('node-cron');
var http = require('http');
var fs = require('fs');

var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];

cron.schedule('1 0 * * *', function(){
  //Run task every 24h.
  //Save data to JSON file for every category sorted in sell volume.
  //Add categoryId to products in JSON
  //Concat all category JSON files
  //Sort JSON files on discount and then on volume
  var file = "";
  for(var i = 0; i < categoryIds.length; i++){
    file = i + ".json";
    getProducts(i, file);
    addCategoryIdToProducts(i, file);
    concatProductJson("/products.json", file)
  }
  sortJsonByDiscountThenVolume("/products.json");
});


var reqOptions = {
  host: url,
  port: 80,
  path: '/resource?id=foo&bar=baz',
  //gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/19720?fields=totalResults,productId,productTitle,discount,volume&categoryId=44&sort=volumeDown
  method: 'POST'
};


var getProducts = function(categoryId, file) = function(){
  http.request(reqOptions, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      fs.writeFile("/flash.json", chunk, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log(chunk);
      });
    });
  }).end();
}

var addCategoryIdToProducts = function(categoryId, file){

}

var sortJsonByDiscountThenVolume = function(file){
  var tmpJson = ""
  for(i = 100; i < 0; i--){
    for(j = 0; j < file.length; j++){
      if(i-1 < file[i].discount <= i){
        //Append to tmpJson
      }
    }
  }
  return tmpJson;
}

var concatProductJson = function(json1, json2){
  var combinedJson = "";
  return combinedJson;
}