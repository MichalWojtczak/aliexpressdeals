//var flashProducts = JSON.parse('../data/flash.json');
//var dailyProducts = JSON.parse('../data/daily.json');
//var hotProducts = JSON.parse('../data/hot.json');
var productsContainer = $(".products");
var productsHtml = '';
var productHtml = '';

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

//foreach product
  productHtml = '<div class="product"><div class="imagewrapper">';
  productHtml +=   '<a href="' + link + '">';
  productHtml +=     '<img src="' + imgLink + '">';
  productHtml +=     '<span class="discount">' + discount + '%</span>';
  productHtml +=   '</a>';
  productHtml += '</div>'; //Closing imagewrapper
  productHtml += '<div class="name">' + hair + '</div>';
  productHtml += '<div class="desc">' + desc + '</div>';
  productHtml += '<div class="pricewrapper">';
  productHtml +=   '<span class="price">' + price + '$</span>';
  productHtml +=   '<span class="oldprice">' + oldprice + '$</span>';
  productHtml +=   '<span class="discount">' + discount + '%</span>';
  productHtml += '</div>'; //Closing pricewrapper
  productHtml += '<div class="review">';
  productHtml +=   '<div class="stars">';
  for(i = 0; i < stars; i++){
    productHtml +=   '<span class="star"></span>';
  }
  productHtml +=     '<span class="rating">(' + reviewScore + ')</span>';
  productHtml +=   '</div>'; //Closing stars
  productHtml += '</div>'; //Closing review
  productHtml += '<div class="buy">';
  productHtml += '<button href="' + link + '">Buy</button>';
  productHtml += '</div>'; //Closing buy
  productHtml += '</div>'; //Closing product
  // Add product to products
  productsHtml += productHtml;
  // TODO: Do i add product to DOM here or wait for all to finish?
//endforeach
productsContainer.html(productsHtml);




