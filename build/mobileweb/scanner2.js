var win = Titanium.UI.currentWindow;
var scannedProducts = []; 
// Titanium.Database.install('products.db', 'products.db');
function addbarcode(barcode){
	// if (barcode.length > 7){
	// var dbInsertBarcode = Titanium.Database.open('product.db');
	// dbInsertBarcode.execute('INSERT INTO products VALUES{"' + barcode +'"}');
	// dbInsertBarcode.close();
	// alert("Succesfully scanned (" + e.symbology + "): " + e.barcode);
	// }
	// else{
		// alert("Not a valid barcode. Please enter manually");
	// }
};


// Instantiate the Scandit SDK Barcode Picker view.
// function openScanner(){
	scanditsdk = require('com.mirasense.scanditsdk');
	picker = scanditsdk.createView({
	    width:"100%", 
	    height:"100%"
	});
	picker.init("7cOhKjRx4CfTuA2q3y+MwAhFkJcba5dH6pEtm+71wHg", 0);
	picker.setScanningHotSpot(0.5, 0.25);
	picker.showSearchBar(true);
	picker.showToolBar(true);
	picker.drawViewfinderTextHook(false);
	picker.setSuccessCallback(function(e) {
		// addbarcode(e.barcode);
	  // if (e.barcode.length > 7){
			
			
			var xhr = Titanium.Network.createHTTPClient({
 
    onload : function(e) {
         Ti.API.info("Received text: " + xhr.responseText);
         alert('xhr.responseText');
         },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 10000
});
		
			xhr.open("GET","https://api.semantics3.com/test/v1/products");
			// xhr.setTimeout(10000);
			xhr.setRequestHeader("Accept", "api_key: SEM34364EE9873A128C31FA0C056ECFE442A");
			xhr.send(JSON.stringify({q:"{" + '"upc"' + ":" + '"' + e.barcode + '"' + "}"}));

			
			

			
	// var dbInsertBarcode = Titanium.Database.open('products.db');
	// dbInsertBarcode.execute('INSERT INTO products ("barcode") VALUES ("' + e.barcode +'")');
	// dbInsertBarcode.close();
	// alert("Succesfully scanned (" + e.symbology + "): " + e.barcode);
	 // }

	    // }
	 });

	    
	Ti.Gesture.addEventListener('orientationchange', function(e) {
	    win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
	                   Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
	    if (picker != null) {
	        picker.setOrientation(e.orientation);
	        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
	                Ti.Platform.displayCaps.platformHeight);
    }
});
win.add(picker);
// picker.startScanning();
// }
// Create another view under picker
var bottomView = Ti.UI.createView({
    top:"50%",
    width:"100%",
    height:"50%",
    backgroundColor:'#000',
    url:"botView.js"
});
win.add(bottomView);
win.addEventListener('blur', function() { picker.stopScanning(); });
win.addEventListener('focus', function() { picker.startScanning(); });




