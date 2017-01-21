var cron = require('node-cron');
var http = require('http');
var fs = require('fs');

var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];
var url = "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/19720?fields=productId,productTitle,productUrl,imageUrl,salePrice,discount,evaluateScore,volume&sort=volumeDown&categoryId="
var file = "";
var productsFile = "products.json";

var getProducts = function(categoryIds) {
  var categoryId = categoryIds.shift();
  var catUrl = url + categoryId;
  var file = "category" + categoryId + ".json";
  body = "";
  http.get(catUrl, function(res) {
    console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function(){
      console.log(file);
      fs.writeFileSync(file, body);
      if(categoryIds.length){
        getProducts(categoryIds);
      }
      else {
        processData();
      }
    });
  });
}

var addCategoryIdToProducts = function(categoryId, file){
  try {
    var contents = fs.readFileSync(file);
  }
  catch(err){
    console.log(err);
    console.log("Cannot open file " + file);
  }
  if(contents){
    var jsonContent = JSON.parse(contents);
    if(jsonContent.result){
      for(var i = 0; i < jsonContent.result.products.length; i++){
        jsonContent.result.products[i].category = categoryId;
      }
      fs.writeFileSync(file, JSON.stringify(jsonContent));
    }
  }
}

var sortJsonByDiscountThenVolume = function(file){
  try {
    var contents = fs.readFileSync(file);
  }
  catch(err){
    console.log(err);
    console.log("Cannot open file " + file);
  }
  if(contents){
    var jsonContent = JSON.parse(contents);
    jsonContent.result.products.sort(compareVolume);
    jsonContent.result.products.sort(compareDiscount);
  }
  fs.writeFileSync(file, JSON.stringify(jsonContent));
}

var getCategoryFiles = function(){
  var fileNames = fs.readdirSync("./");
  var filteredFileNames = [];
  fileNames.forEach(fileName => {
    if(fileName.indexOf("category") != -1){
      filteredFileNames.push(fileName)
    }
  });
  return filteredFileNames;
}

var concatProductJson = function(files) {
  var categoryFileRaw, categoryFileParsed, productsRaw = "";
  var emptyJson = '{"result":{"products":[]}}';
  try {
    fs.writeFileSync(productsFile, emptyJson);
    productsRaw = fs.readFileSync(productsFile);
  }
  catch(err){
    console.log(err);
    console.log("Cannot open file " + file);
  }
  if(productsRaw){
    var productsParsed = JSON.parse(productsRaw);
    files.forEach(file => {
      categoryFileRaw = fs.readFileSync(file);
      categoryFileParsed = JSON.parse(categoryFileRaw);
      if(categoryFileParsed.result){
        if(productsParsed.result.products && categoryFileParsed.result.products){
          for(var i = 0; i < categoryFileParsed.result.products.length; i++){
            productsParsed.result.products.push(categoryFileParsed.result.products[i]);
          }
        }
      }
    });
    fs.writeFileSync(productsFile, JSON.stringify(productsParsed));
  }
}

var compareVolume = function(a,b) {
  if (parseInt(a.volume) < parseInt(b.volume))
     return -1;
  if (parseInt(a.volume) > parseInt(b.volume))
    return 1;
  return 0;
}

var compareDiscount = function(a,b) {
  if (parseInt(a.discount) > parseInt(b.discount))
     return -1;
  if (parseInt(a.discount) < parseInt(b.discount))
    return 1;
  return 0;
}

var processData = function(){
  for(var i = 0; i < categoryIds.length; i++){
    file = "category" + categoryIds[i] + ".json";
    addCategoryIdToProducts(categoryIds[i], file);
  }
  console.log("Finished adding IDs");
  concatProductJson(getCategoryFiles());
  console.log("Finished adding products to products.json");
  sortJsonByDiscountThenVolume("products.json");
  console.log("Finished sorting products.json");
}

//cron.schedule('1 0 * * *', function(){
  //Run task every 24h.
  //Save data to JSON file for every category sorted in sell volume.
  //Add categoryId to products in JSON
  //Concat all category JSON files
  //Sort JSON files on discount and then on volume
  getProducts(categoryIds);
  //TODO: Sort on discount ruins volume sort.
  //TODO: Get more pages(of 40 products) per category (&pageSize=40&pageNo=)

//});