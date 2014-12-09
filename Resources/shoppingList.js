function StartUp(){
var win= Titanium.UI.createWindow({
	title:'Shopping List',
    backgroundColor:'white'
});
win.orientationModes = [Titanium.UI.PORTRAIT];
Scanner = require('scanner2');
History = require('history');

var tableview = Titanium.UI.createTableView({
	editable:true
	});

function getProducts(){
var listItems = Titanium.Database.open('products.db');
var sql = listItems.execute('SELECT * FROM products WHERE cart = 1  GROUP BY name');

var data = [];

var noItemLabel = Titanium.UI.createLabel({
		color:'#999',
		text:'No Items',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});

if(sql.rowCount < 1) {
	win.add(noItemLabel);
};

while(sql.isValidRow()) {
	
	var name = sql.fieldByName('name');
	var productID = sql.fieldByName('id');
	var smallImage = sql.fieldByName('image');

	var separator = Titanium.UI.createView({
	   left : 0,
	   bottom : 0,
	   width : '100%',
	   height : 1,
	   touchEnabled : false,
	   backgroundColor: 'grey'
		});

	var rowP = Ti.UI.createTableViewRow({
			title:name, 
			hasChild:true, 
			id:productID, 
			url:'detail.js',
			height:'auto'
 		 });
			 
	var labelDetails = Ti.UI.createLabel({
		    color:'black',
		    font:{fontFamily:'Arial', fontWeight:'normal'},
		    text:name,
		    left:80,
		     // top:25
  		});
  rowP.add(labelDetails);
	var myImage = Ti.UI.createImageView({
    		image:smallImage,
    		left:2,
    		height:70,
    		// defaultImage:'images/NoImage.png'
  		});
   rowP.add(myImage);
   rowP.add(separator);
	data.push (rowP);
	// data.push({title:name, hasChild:true, id:productID, url:'detail.js'});
	sql.next();
	noItemLabel.text = "";
}

tableview.setData(data);

win.add(tableview);
listItems.close();
};
function showDetails(e){
		if(e.rowData.url)
		{
		 	var win = Titanium.UI.createWindow({
		 	
		 		title: e.rowData.title,
		 		id: e.rowData.id,
		 		url: e.rowData.url,
		 		backgroundColor: 'white'
		 	});
		 	win.open();
	 		}
	};
tableview.addEventListener('click', showDetails);

tableview.addEventListener('longpress', function(e) {
	if(e.rowData.url){
	var cartItems = Titanium.Database.open('products.db');
	cartItems.execute('UPDATE products SET cart=? WHERE id=?',0,e.rowData.id);
    cartItems.close();
    var n = Ti.UI.createNotification({message:"Item removed from Shopping List"});
	n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
    n.show();
    getProducts();
    tableview.removeEventListener('click', showDetails);
    setTimeout(function(){
	    tableview.addEventListener('click', showDetails);
	}, 1000);
	};
});
function shareAllItems() {
	            var data = [];
				var listItemsAll = Titanium.Database.open('products.db');
				var sql = listItemsAll.execute('SELECT name FROM products WHERE cart = 1');
				while(sql.isValidRow()) {
				data.push("" + sql.fieldByName('name') + "\n" );
				sql.next();
				};
				listItemsAll.close;
				
				
				var intent = Ti.Android.createIntent({
				            action : Ti.Android.ACTION_SEND,
				            type : "text/plain"
				});
				intent.putExtra(Ti.Android.EXTRA_TEXT, "" + data + "");
				intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
				var chooser = Ti.Android.createIntentChooser(intent, "Send Message");
				Ti.Android.currentActivity.startActivity(chooser);

};


win.addEventListener('open', function() { 
	
	var actionBar,menu,menuItem,menuItem2,menuItem3,menuItem4,menuItem5,menuItem6,menuItem7,activity,activity2,activity3;

	actionBar = win.activity.actionBar;
	if(actionBar){
		actionBar.setTitle('Shopping List');
		// actionBar.setIcon('icon.png');
		actionBar.setDisplayHomeAsUp(false);
		
		activity = win.activity;
		activity.onCreateOptionsMenu = function(e){
			menu = e.menu;
			menuItem = menu.add({
				title : "Share",
	            icon : "images/share21.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem.addEventListener('click', shareAllItems);
	        menuItem2 = menu.add({
				title : "History",
	            icon : "images/history6.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem2.addEventListener('click', function(e){
						History.HistoryList();
	                }); 
	        menuItem3 = menu.add({
				title : "Scanner",
	            icon : "images/supermarket20.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem3.addEventListener('click', function(e){
						Scanner.StartTheScanner();                
	                });  
	               menuItem4 = menu.add({
				title : "Clear Shopping List",
	            icon : "images/delete81red.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem4.addEventListener('click', function(e){
	        	// new code
	        	var dialog = Ti.UI.createAlertDialog({
				    cancel: 1,
				    buttonNames: ['Confirm', 'Cancel'],
				    message: 'Are you sure you want to clear all items?',
				    title: 'Delete All',
				    textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
				  });
				  dialog.addEventListener('click', function(e){
				    if (e.index === e.source.cancel){
				      Ti.API.info('The cancel button was clicked');
				    }
				    if (e.index === 0){
				    var clearAll = Titanium.Database.open('products.db');
					clearAll.execute('UPDATE products SET cart=? WHERE cart=?',0,1);
				    clearAll.close(); 
				       getProducts();
				       var n = Ti.UI.createNotification({message:"Shopping List cleared"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
						    n.show();
				    }
				  });
				  dialog.show();				
	                });              	
		//New Code
		menuItem5 = menu.add({
				title : "Refresh",
	            icon : "images/refresh57white.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem5.addEventListener('click', function(e){
						getProducts();     
						 var n = Ti.UI.createNotification({message:"Shopping List Refreshed"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
						    n.show();           
	                });
	      menuItem6 = menu.add({
				title : "About",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem6.addEventListener('click', function(e){
						 var n = Ti.UI.createNotification({message:"About"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
						    n.show();           
	                });
	         menuItem7 = menu.add({
				title : "Help",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem7.addEventListener('click', function(e){
						 var n = Ti.UI.createNotification({message:"Help"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
						    n.show();           
	                });
		
		
		//End new Code
		};
		actionBar.onHomeIconItemSelected = function() { 
			var dialog = Ti.UI.createAlertDialog({
			    message: ' (c) Copyright 2014 Michael Harris. All Rights Reserved. ',
			    ok: 'Okay',
			    title: 'About'
			  });
				  dialog.show(); 
			}; 
		 
		}; 
	 getProducts();
	 });
	 win.addEventListener('focus', getProducts);
win.open();
};
exports.StartUp = StartUp;
