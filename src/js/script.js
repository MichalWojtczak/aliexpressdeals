var renderTopProducts = function(products){
  var productsContainer = $(".products-list-discount");
  var productsHtml, productHtml = '';
  for(i = 0; i < products.length; i++){
    // Add product to products
    productsHtml += wrapHtml(product[i]);
  }
  productsContainer.html(productsHtml);
}

var renderAllProducts = function(products, categoryIds){
  var productsContainer = $(".product-list-categories");
  for(i = 0; i < categoryIds.length; i++){
    productsContainer.append("<div class='category' data-categoryid='" + categoryIds[i] + "'></div>");
  }
  for(i = 0; i < products.length; i++){
    productsContainer.find("[data-categoryid='" + products[i].categoryId + "']").append(wrapHtml(products[i]))
  }
}

var wrapHtml = function(product){
  var productHtml = '';
  productHtml = '<div class="product"><div class="imagewrapper">';
  productHtml +=   '<a href="' + product.productUrl + '">';
  productHtml +=     '<img src="' + product.imageUrl + '">';
  productHtml +=     '<span class="discount">' + product.discount + '%</span>';
  productHtml +=   '</a>';
  productHtml += '</div>'; //Closing imagewrapper
  productHtml += '<div class="name">' + product.productTitle + '</div>';
  //productHtml += '<div class="desc">' +  + '</div>';
  productHtml += '<div class="pricewrapper">';
  productHtml +=   '<span class="price">' + product.salePrice + '$</span>';
  //productHtml +=   '<span class="oldprice">' + oldprice + '$</span>';
  productHtml +=   '<span class="discount">' + product.discount + '%</span>';
  productHtml += '</div>'; //Closing pricewrapper
  productHtml += '<div class="review">';
  productHtml +=   '<div class="stars">';
  for(i = 0; i < parseInt(product.evaluateScore); i++){
    productHtml +=   '<span class="star"></span>';
  }
  productHtml +=     '<span class="rating">(' + product.evaluateScore + ')</span>';
  productHtml +=   '</div>'; //Closing stars
  productHtml += '</div>'; //Closing review
  productHtml += '<div class="buy">';
  productHtml += '<button href="' + product.productUrl  + '">Buy</button>';
  productHtml += '</div>'; //Closing buy
  productHtml += '</div>'; //Closing product
  return productHtml;
}

var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];

var topProducts = [];

$.getJSON('topproducts.json', function(data) {
  $.each(result.products, function(index, product) {
    topProducts.push(product);
  });
});

renderTopProducts(topProducts);

var allProducts = [];

$.getJSON('products.json', function(data) {
  $.each(result.products, function(index, product) {
    allProducts.push(product);
  });
});

renderAllProducts(products);

//Dev values
var link = "#";
var imgLink = "http://thecatapi.com/?id=1n9";
var discount = 90;
var hair = "Hair";
var desc = "This hair";
var price = 99;
var oldprice = 9;
var stars = 3;
var reviewScore = 3.0;





