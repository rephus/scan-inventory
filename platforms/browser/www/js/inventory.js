
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
  //$(".item-img").attr("src", "");
  $(".item-json").html(JSON.stringify(json, null, 2));
  $(".item-title").html(json.name);
  $(".item-description").html("");

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
