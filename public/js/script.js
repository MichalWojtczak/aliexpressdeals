var renderTopProducts = function(products){
  var productsContainer = $(".products-list-discount");
  var productsHtml = [];
  var productHtml = '';
  for(var i = 0; i < products.length; i++){
    productsHtml.push(wrapHtml(products[i]));
  }
  for(var i = 0; i < 24; i++){//productsHtml.length; i++){
    productsContainer.append(productsHtml[i]);
  }
}

var renderAllProducts = function(products, categoryIds){
  var productsContainer = $(".products-list-categories");
  for(var i = 0; i < categoryIds.length; i++){
    productsContainer.append("<div class='category' data-categoryid='" + categoryIds[i] + "'></div>");
  }
  for(var i = 0; i < 200; i++){ //products.length; i++){
    productsContainer.find("[data-categoryid='" + products[i].category + "']").append(wrapHtml(products[i]))
  }
}

var wrapHtml = function(product){
  var productHtml = '';
  productHtml = '<div class="product"><div class="imagewrapper">';
  productHtml +=   '<a href="' + product.productUrl + '">';
  productHtml +=     '<img src="' + product.imageUrl + '">';
  productHtml +=     '<span class="discount">' + product.discount + '</span>';
  productHtml +=   '</a>';
  productHtml += '</div>'; //Closing imagewrapper
  productHtml += '<div class="product-info-wrapper">'
  productHtml += '<div class="name">' + product.productTitle + '</div>';
  //productHtml += '<div class="desc">' +  + '</div>';
  productHtml += '<div class="pricewrapper">';
  productHtml +=   '<span class="price">' + product.salePrice + '</span>';
  //productHtml +=   '<span class="oldprice">' + oldprice + '$</span>';
  productHtml +=   '<span class="discount"> ' + product.discount + '</span>';
  productHtml += '</div>'; //Closing pricewrapper
  productHtml += '<div class="review">';
  productHtml +=   '<div class="stars">';
  for(var i = 0; i < parseInt(product.evaluateScore); i++){
    productHtml +=   '<span class="star">*</span>';
  }
  productHtml +=     '<span class="rating">(' + product.evaluateScore + '/5.0)</span>';
  productHtml +=   '</div>'; //Closing stars
  productHtml += '</div>'; //Closing review
  productHtml += '<div class="buy">';
  productHtml += '<a href="' + product.productUrl  + '">Buy</a>';
  productHtml += '</div>'; //Closing buy
  productHtml += '</div>'; //Closing product
  productHtml += '</div>'; //Closing product-info-wrapper
  return productHtml;
}

var categoryIds = [3,34,66,200004360,7,44,5,502,2,1503,200003655,42,15,6,200001996,36,39,1524,1501,21,509,30,322,18,1420,26,200003498,1511,320];

var topProducts = [];

$.getJSON('data/products.json', function(data) {
  $.each(data.result.products, function(index, product) {
    topProducts.push(product);
  });
  renderTopProducts(topProducts);
});

var allProducts = [];

$.getJSON('data/products.json', function(data) {
  $.each(data.result.products, function(index, product) {
    allProducts.push(product);
  });
  renderAllProducts(allProducts, categoryIds);
});

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    autoplay: 3000,
    speed: 1500,
    loop: true
  })
});




