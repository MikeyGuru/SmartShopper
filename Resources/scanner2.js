function StartTheScanner(){
var win = Titanium.UI.createWindow({
	title:'Scanner',
    backgroundColor:'#fff'
});
win.orientationModes = [Titanium.UI.PORTRAIT];
 var basicSwitch = Ti.UI.createSwitch({
  titleOn:'Shopping Mode Enabled',
  titleOff:'Shopping Mode Disabled',
  value:false,
  width: 'auto', height:'auto',
  top:60,
  right:10
  });
var scannedProducts = []; 

// Instantiate the Scandit SDK Barcode Picker view.
// function openScanner(){
	scanditsdk = require('com.mirasense.scanditsdk');
	picker = scanditsdk.createView({
	    width:"100%", 
	    height:"100%"
	});
	picker.init("7cOhKjRx4CfTuA2q3y+MwAhFkJcba5dH6pEtm+71wHg", 0);
	// picker.setScanningHotSpot(0.5, 0.25);
	picker.showSearchBar(true);
	picker.showToolBar(true);
	picker.drawViewfinderTextHook(false);
	picker.setSuccessCallback(function(e) {

 	var newBarcode = e.barcode;
	if(basicSwitch.value === true){
	var cartItems = Titanium.Database.open('products.db');
	cartItems.execute('UPDATE products SET cart=? WHERE barcode=?',0,e.barcode);
    cartItems.close();
    var n = Ti.UI.createNotification({message:"Item removed from Shopping List"});
	n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
    n.show();
	}		
	  if(basicSwitch.value === false){
			
			
    var xhr = Titanium.Network.createHTTPClient({
	    autoEncodeUrl:false,
 
    onload : function(e) {
    	jsonObject = JSON.parse(this.responseText);
    	var resultCount = jsonObject.total_results_count;
    	if(resultCount === 0){
    		var m = Ti.UI.createNotification({message:"Item not found. Please add info"});
				m.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
			    m.show();
    		//New Code
    		setTimeout(function(){
	    	var win = Titanium.UI.createWindow({
		 	
		 		title: "Add Item",
		 		barcode: newBarcode,
		 		url: 'manual.js',
		 		backgroundColor: 'white'
		 	});
		 	win.open();
			    // end new code
			}, 1000);  
    	};
    	var itemName = jsonObject.results[0].name;
    	var itemBarcode = jsonObject.results[0].upc;
    	var itemNotes = jsonObject.results[0].category;
    	var itemBrand = jsonObject.results[0].brand;
    	var itemImage = jsonObject.results[0].images[0];
    	var n = Ti.UI.createNotification({message:""+ itemName  +"added to Shopping List"});
			n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
		    n.show();
        // alert(itemName);
        var dbInsertInfo = Titanium.Database.open('products.db');
		dbInsertInfo.execute("INSERT INTO products (barcode, name, note, brand, image) VALUES(\"" + itemBarcode + "\",\"" + itemName + "\",\"" + itemNotes + "\",\"" + itemBrand + "\",\"" + itemImage+ "\")");
		dbInsertInfo.close();
        

    	 Ti.API.info("Received text: " + this.responseText);

         },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout:10000
});
		    xhr.autoEncodeUrl=true;

			xhr.open("GET","https://api.semantics3.com/test/v1/products?q=" + "{" + '"upc"' + ":" + '"' + e.barcode + '"' + "}");
			// Other resources to query
		    // xhr.open("GET","http://eandata.com/feed/?v=3&keycode=9C10D109547A4AB2&mode=json&find="+ e.barcode);
			// xhr.open("GET","http://sandbox.api.ebaycommercenetwork.com/publisher/3.0/json/GeneralSearch?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&visitorUserAgent&visitorIPAddress&trackingId=7000610&keyword="+ e.barcode);
			xhr.setRequestHeader("api_key", "SEM34364EE9873A128C31FA0C056ECFE442A");
			xhr.send();

	    }
	 });

	    
	// Ti.Gesture.addEventListener('orientationchange', function(e) {
	    // win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
	                   // Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
	    // if (picker != null) {
	        // picker.setOrientation(e.orientation);
	        // picker.setSize(Ti.Platform.displayCaps.platformWidth, 
	                // Ti.Platform.displayCaps.platformHeight);
    // }
// });

win.add(picker);

win.addEventListener('blur', function() { picker.stopScanning(); });
win.addEventListener('focus', function() { picker.startScanning(); });
win.addEventListener('open', function() { 
	
	var actionBar;

	actionBar = win.activity.actionBar;
	if(actionBar){
		actionBar.setTitle('Scanner');
	
		win.getActivity().invalidateOptionsMenu();

		// actionBar.setIcon('icon.png');
		actionBar.setDisplayHomeAsUp(true);
		              	
		 actionBar.onHomeIconItemSelected = function() { 
			 win.close(); 
		};
		};  
	});
	//new code

win.add(basicSwitch);

basicSwitch.addEventListener('change',function(e){
	if(basicSwitch.value === true){
	var m = Ti.UI.createNotification({message:"When items are scanned they will be removed from your shopping list"});
				m.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
			    m.show();};
	if(basicSwitch.value === false){
	var m = Ti.UI.createNotification({message:"When items are scanned they will be added to your shopping list"});
				m.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
			    m.show();};
  Ti.API.info('Switch value: ' + basicSwitch.value);
});
// End new code
win.open();

};

exports.StartTheScanner = StartTheScanner;
