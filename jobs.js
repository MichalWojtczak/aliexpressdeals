var cron = require('node-cron');
var http = require('http');
var fs = require('fs');

var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];

//cron.schedule('1 0 * * *', function(){
  //Run task every 24h.
  //Save data to JSON file for every category sorted in sell volume.
  //Add categoryId to products in JSON
  //Concat all category JSON files
  //Sort JSON files on discount and then on volume
  var file = "";
  var productsFile = "./data/products.json";
  for(var i = 0; i < categoryIds.length; i++){
    file = "./data/category" + categoryIds[i] + ".json";
    getProducts(categoryIds[i], file);
    addCategoryIdToProducts(categoryIds[i], file);
  }
  concatProductJson(getCategoryFiles());
  sortJsonByDiscountThenVolume("./data/products.json");
//});


var reqOptions = {
  host: 'gw.api.alibaba.com',
  port: 80,
  path: '/openapi/param2/2/portals.open/api.listPromotionProduct/19720?fields=totalResults,productId,productTitle,productUrl,imageUrl,salePrice,discount,evaluateScore,volume&categoryId=44&sort=volumeDown',
  method: 'POST'
};


var getProducts = function(categoryId, file) = function(){
  http.request(reqOptions, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (data) {
      fs.writeFile(fileUrl, data, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log(data);
      });
    });
  }).end();
}

var addCategoryIdToProducts = function(categoryId, file){
  var contents = fs.readFileSync(file);
  // Define to JSON type
  var jsonContent = JSON.parse(contents);
  jsonContent.products.forEach(product => {
    product.category = categoryId;
  });
  fs.writeFileSync(file, JSON.stringify(jsonContent), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(chunk);
  });
}

var sortJsonByDiscountThenVolume = function(file){
  var contents = fs.readFileSync(file);
  var jsonContent = JSON.parse(contents);
  jsonContent.products.sort(compareVolume);
  jsonContent.products.sort(compareDiscount);
  function compareVolume(a,b) {
    if (a.volume < b.volume)
       return -1;
    if (a.volume > b.volume)
      return 1;
    return 0;
  }
  function compareDiscount(a,b) {
    if (a.discount < b.discount)
       return -1;
    if (a.discount > b.discount)
      return 1;
    return 0;
  }
  fs.writeFile(file, JSON.stringify(jsonContent), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(chunk);
  });
}

var getCategoryFiles = function(){
  var folder = './data/';
  var files = [];
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      console.log(file);
      files.append(file);
    });
  })
  return files;
}

var concatProductJson = function(files) {
  var categoryFileRaw, categoryFileParsed;
  var productsRaw = fs.readFileSync(productsFile);
  var productsParsed = JSON.parse(contents);
  files.forEach(file => {
    categoryFileRaw = fs.readFileSync(file);
    categoryFileParsed = JSON.parse(categoryFileRaw);
    productsParsed.products.append(categoryFileParsed.products);
  });
  fs.writeFile(productsFile, JSON.stringify(parsedProductsFile), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(chunk);
  });
}