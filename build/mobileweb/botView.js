var botWin= Titanium.UI.currentWindow;

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'SWIPE LEFT to view scanned Items AND SWIPE RIGHT to Share Items',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
botWin.add(label1);

// botWin.addEventListener('swipe', function(e) { if (e.direction == 'left') { 
	// var newWin = Titanium.UI.createWindow({
		// url:"rateView.js",
		// title:'Rate It'
	// });
// 
	// picker.stopScanning;
	// }});
// botWin.addEventListener('swipe', function(e) { if (e.direction == 'right') {
	// var newWin = Titanium.UI.createWindow({
		// url:"shareView.js",
		// title:'Share It'
	// });
	 	// picker.stopScanning;
//  
	 // }});
