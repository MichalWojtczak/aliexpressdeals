var initRenderTopProducts = function(products){
  var productsContainer = $(".products-list-categories");
  var productsHtml = [];
  var productHtml = '';
  for(var i = 0; i < products.length; i++){
    productsHtml.push(wrapHtml(products[i]));
  }
  for(var i = 0; i < 24; i++){//productsHtml.length; i++){
    productsContainer.append(productsHtml[i]);
  }
}

var renderAllProducts = function(products, mainCategories){
  var productsContainer = $(".products-list-categories");
  $.each( mainCategories, function( key, value ) {
    if(!$("div.category[data-category='" + mainCategories[key] + "'").length){
      productsContainer.append("<div class='category' data-category='" + mainCategories[key] + "'></div>");
    }
  });
  for(var i = 0; i < 200; i++){ //products.length; i++){
    productsContainer.find("[data-category='" + mainCategories[products[i].category] + "']").append(wrapHtml(products[i]))
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
var mainCategories = {
  3: "fashion",
  1524: "fashion",
  1511: "fashion",
  320: "fashion",
  7: "electronics",
  44: "electronics",
  5: "electronics",
  502: "electronics",
  200001996: "electronics",
  39: "electronics",
  509: "electronics",
  18: "sports",
  66: "healthbeauty",
  36: "healthbeauty",
  26: "toyshobbies",
  322: "shoes",
  200003655: "hairaccessories",
  1501: "kidsbaby",
  1503: "homeoffice",
  42: "homeoffice",
  15: "homeoffice",
  6: "homeoffice",
  21: "homeoffice",
  30: "homeoffice",
  1420: "homeoffice",
  34: "automotive"
};
var topProducts = [];

$.getJSON('data/products.json', function(data) {
  $.each(data.result.products, function(index, product) {
    topProducts.push(product);
  });
  window.products = topProducts;
  initRenderTopProducts(topProducts);
});

var renderProducts = function(category) {
  var products = [];
  if(window.products){
    for(var i = 0; i < window.products.length; i++){
      if(category === "discount"){
        products.push(window.products[i]);
      }
      else if(category === mainCategories[window.products[i].category]) {
        products.push(window.products[i]);
      }
    }
  }
  else {
    $.getJSON('data/products.json', function(data) {
      $.each(data.result.products, function(index, product) {
        if(category === "discount"){
          products.push(product);
        }
        else if(category === product.category) {
          products.push(product);
        }
      });
    });
  }
  renderAllProducts(products, mainCategories);
}

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    autoplay: 3000,
    speed: 1500,
    loop: true
  })

  $("header li.nav-item").click(function(){
    var productsContainer = $(".products-list-categories");
    //Clear products container
    productsContainer.html("");
    renderProducts($(this).attr("data-category"));
  });
});




