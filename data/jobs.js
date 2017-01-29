var cron = require('node-cron');
var http = require('http');
var fs = require('fs');

const CATEGORY_IDS = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];
var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];
var url = "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/19720?fields=productId,productTitle,productUrl,imageUrl,salePrice,discount,evaluateScore,volume&sort=volumeDown&pageSize=40&categoryId="
var file = "";
var productsFile = "products.json";
var ajaxCallsRemaining = categoryIds.length * 5;

var getProducts = function(categoryIds) {
  var catUrl;
  var files = [];
  var returnedData = [];
  var categoryId = categoryIds.shift();
  for (var i = 0; i < 5; i++) {
      var catUrl = url + categoryId + "&pageNo=" + (i+1);
      files.push("category" + categoryId + "_" + (i+1) + ".json");
      http.get(catUrl, function(res) {
          // success handler from the ajax call
          console.log('STATUS: ' + res.statusCode);
          res.setEncoding('utf8');
          // save response
          var body = '';
          var resEnded = false;
          res.on('data', function(chunk){
              body += chunk;
          });

          res.on('end', function(){
              resEnded = true;
              returnedData.push(body);
              if(returnedData.length == 5){
                for (var i = 0; i < 5; i++) {
                  console.log(files[i]);
                  fs.writeFileSync(files[i], returnedData[i]);
                  if(categoryIds.length){
                    getProducts(categoryIds);
                  }
                }
              }
              ajaxCallsRemaining--;
              if (ajaxCallsRemaining <= 10) {
                console.log("Remaining: " + ajaxCallsRemaining);
              }
              if (ajaxCallsRemaining <= 0) {
                processData();
              }
          });

          res.on('close', function(){
            if(!resEnded){
              returnedData.push("{}");
              if(returnedData.length == 5){
                for (var i = 0; i < 5; i++) {
                  console.log(files[i]);
                  fs.writeFileSync(files[i], returnedData[i]);
                  if(categoryIds.length){
                    getProducts(categoryIds);
                  }
                }
              }
            ajaxCallsRemaining--;
            if (ajaxCallsRemaining <= 0) {
              processData();
            }
            }
          });

      }).on('error', function(e){
        console.log("Got an error: ", e);
        ajaxCallsRemaining--;
        if (ajaxCallsRemaining <= 0) {
          processData();
        }

      });
  }

      //res.on('end', function (chunk) {
      //  body += chunk;
      //});

}
//TODO: No category id at the moment...debug
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

var getTopProducts = function(file, amount){
  var topFile = "topproducts.json";
  try {
    var contents = fs.readFileSync(file);
  }
  catch(err){
    console.log(err);
    console.log("Cannot open file " + file);
  }
  if(contents){
    var jsonContent = JSON.parse(contents);
    var jsonTopContent = JSON.parse(contents);
    if(jsonContent.result){
      jsonTopContent.result.products = jsonContent.result.products.slice(0,amount);
      fs.writeFileSync(topFile, JSON.stringify(jsonTopContent));
    }
    console.log("Wrote top products to " + file);
  }
}

var processData = function(){
  for(var i = 0; i < CATEGORY_IDS.length; i++){
    for(var j = 1; j <= 5; j++){
      file = "category" + CATEGORY_IDS[i] + "_" + j + ".json";
      addCategoryIdToProducts(CATEGORY_IDS[i], file);
    }
  }
  console.log("Finished adding IDs");
  concatProductJson(getCategoryFiles());
  console.log("Finished adding products to products.json");
  sortJsonByDiscountThenVolume("products.json");
  console.log("Finished sorting products.json");
  getTopProducts("products.json", 24);
}

//cron.schedule('1 0 * * *', function(){
  //Run task every 24h.
  //Save data to JSON file for every category sorted in sell volume.
  //Add categoryId to products in JSON
  //Concat all category JSON files
  //Sort JSON files on discount and then on volume
  getProducts(categoryIds);
  //TODO: Sort on discount ruins volume sort.
  //TODO: Testing remains: Get more pages(of 40 products) per category (&pageSize=40&pageNo=)
  //TODO: Create smaller file for first 20 products to increase pageload speed
//});