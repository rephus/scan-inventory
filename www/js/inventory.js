
$(document).ready(function(){

  $(".scan").click(function(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            console.log("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);

            searchProduct(result.text);
        },
        function (error) {
            console.log("Scanning failed: " + error);
        }
     );

  });

  $(".test").click(function(){
    var json = { "gtin": "5449000601971", "outpan_url": "https://www.outpan.com/view_product.php?barcode=5449000601971", "name": "Coca-Cola", "attributes": { "Manufacturer": "Coca-Cola", "Volume": "1.75L" }, "images": [], "videos": [], "categories": [] };

    buildProduct(json);
  });

});


var buildProduct = function(json) {
  $("#item-scanned").show();

  $(".item-json").html(JSON.stringify(json, null, 2));
  $(".item-title").html(json.name);
  $(".item-description").html("");

  $(".upload-image").hide();
  if (json.images) {
    $(".item-img").attr("src", json.images[0]);
  } else if (json.name) {

    var attributes = Object.keys(json.attributes);
    attributeSearch = ""; //Add attribute to name search (eg: coca-cola 1.75L)
    for (var i in attributes) attributeSearch += "+"+json.attributes[attributes[i]];
    luckyImage(json.name + attributeSearch, function(image){
      $(".item-img").attr("src", image);
    });

    $(".upload-image").show();

  } else $(".item-img").attr("src", "");
};

var searchProduct = function(barcode) {
  url = "http://api.outpan.com/v2/products/"+ barcode+ "?apikey="+ apikey;
  console.log("Searching url "+url);
  $.ajax({
    url:url,
    success: buildProduct
  });
};

//Not tested
var isCordova = function(){
  console.log("URL " , document.URL);
  //var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1  && document.URL.indexOf( 'file://' ) === -1;
  return document.URL.indexOf('android_asset') !== -1;
};


var luckyImage = function(name, callback) {
  var url = "https://duckduckgo.com/i.js?o=json&q=" + name;

  console.log("Searching image "+url);
  $.ajax({
    url:url,
    dataType: "json",
    success: function(json) {
        callback(json.results[0].image);
    },
    error :function( response, textStatus, errorThrown) {
      console.error("Unable to get image "+textStatus + ": "+ errorThrown);
    }
  });
};
