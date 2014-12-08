function detail(){
// var win= Titanium.UI.createWindow({
	// title:title,
    // backgroundColor:'white'
// });
var win = Titanium.UI.currentWindow;
// var title = win.title;
win.orientationModes = [Titanium.UI.PORTRAIT];
var id = win.id;


var db = Titanium.Database.open('products.db');
var sql = db.execute("SELECT * FROM products WHERE id ="+ id + "");

var productName = sql.fieldByName('name');
var productBarcode = sql.fieldByName('barcode');
var productNotes = sql.fieldByName('note');
var productBrand = sql.fieldByName('brand');
var productImage = sql.fieldByName('image');
var productRating = sql.fieldByName('rating');
var productCart = sql.fieldByName('cart');
var productDate = sql.fieldByName('date');


db.close();

var inCart = productCart ? "Yep" : "Nope";

var name1 = Titanium.UI.createLabel({
color: 'black',
text: productName,
top: 3,
left: 10,
height: 55,
width: 'auto',
ellipsize:true 
});
var note1 = Titanium.UI.createLabel({
color: 'black',
 text:"Notes: " + productNotes, 
 top: 180,
height: 'auto',
width: 'auto',
left: 10
});
var date1 = Titanium.UI.createLabel({
color: 'black',
text:"Date added: " + productDate, 
top: 150,
height: 'auto',
width: 'auto',
left: 10
});
var barcode1 = Titanium.UI.createLabel({
color: 'black',
text: "UPC: " + productBarcode, 
top: 120,
height: 25,
width: 'auto',
left: 10
});

var brand1 = Titanium.UI.createLabel({
color: 'black',
 text:"Brand: " + productBrand, 
 top: 60,
height: 25,
width: 'auto',
left: 10
});
var cart1 = Titanium.UI.createLabel({
color: 'black',
 text:"In Shopping Cart: " + inCart, 
 top: 90,
height: 25,
width: 'auto',
left: 10
});


var myImage = Ti.UI.createImageView({
	// width:200,
	height:250,
	image:productImage,
	bottom: 10
});
myImage.defaultImage = 'images/NoImage.png';





function shareItem() {
				var intent = Ti.Android.createIntent({
				            action : Ti.Android.ACTION_SEND,
				            type : "text/plain"
				});
				intent.putExtra(Ti.Android.EXTRA_TEXT, "" + productName + "\n" + productBrand + "\n" + productNotes + "");
				intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
				var chooser = Ti.Android.createIntentChooser(intent, "Send Message");
				Ti.Android.currentActivity.startActivity(chooser);

};



win.add(name1);
if(productBrand){win.add(brand1);};
win.add(cart1);
if(productNotes){win.add(note1);};
win.add(date1);
if(productBarcode){win.add(barcode1);};
win.add(myImage);

//New Code
win.addEventListener('open', function() {
	//New Code 
	
	var actionBar,menu,menuItem,menuItem2,menuItem3,menuItem4,activity,activity2,activity3;

	actionBar = win.activity.actionBar;
	if(actionBar){
		// actionBar.setTitle('History');
	
		win.getActivity().invalidateOptionsMenu();

		// actionBar.setIcon('icon.png');
		actionBar.setDisplayHomeAsUp(true);
		              	
		 actionBar.onHomeIconItemSelected = function() { 
			 win.close(); 
			 };
		activity = win.activity;
		activity.onCreateOptionsMenu = function(e){   
			  if(productCart === 0) {
			  	menu = e.menu;
			  	menuItem4 = menu.add({
	             		title: "Share Item",
	             		icon: "images/share21.png",
	             		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
	             	});
			 menuItem4.addEventListener('click', shareItem);
	       
	        menuItem2 = menu.add({
				title : "Delete",
	            icon : "images/delete81red.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem2.addEventListener('click', function(e){
	        	// new code
	        	var dialog = Ti.UI.createAlertDialog({
				    cancel: 1,
				    buttonNames: ['Confirm', 'Cancel'],
				    message: 'Delete this item from everywhere?',
				    title: 'Delete',
				    textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
				  });
				  dialog.addEventListener('click', function(e){
			       if (e.index === 1){
				      Ti.API.info('The cancel button was clicked');
				    }
				    if (e.index === 0){
				    var deleteItem = Titanium.Database.open('products.db');
					deleteItem.execute('DELETE FROM products WHERE id =?',id);
				    deleteItem.close(); 
				      Ti.API.info('The confirm button was clicked');
				      win.close();
				    }
				  });
				  dialog.show();
	        	// end new code						
	                }); 
			menuItem3 = menu.add({
				title : "Add to Shopping List",
	            icon : "images/shopping100white.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem3.addEventListener('click', function(e){
						var cartItems = Titanium.Database.open('products.db');
							cartItems.execute('UPDATE products SET cart=? WHERE id=?',1,id);
						    cartItems.close();
						    var n = Ti.UI.createNotification({message:"Item added to Shopping List"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
						    n.show(); 	              
	                });
	                menuItem = menu.add({
				title : "Edit",
	            icon : "images/edit26white.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	               menuItem.addEventListener('click', function(e){
						//Add edit code here               
	                });
		};
		
		if(productCart === 1) {
			menu = e.menu;
			menuItem4 = menu.add({
	             		title: "Share Item",
	             		icon: "images/share21.png",
	             		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
	             	});
	        menuItem4.addEventListener('click', shareItem);

			menuItem2 = menu.add({
				title : "Delete",
	            icon : "images/delete81red.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem2.addEventListener('click', function(e){
	        	// new code
	        	var dialog = Ti.UI.createAlertDialog({
				    cancel: 1,
				    buttonNames: ['Confirm', 'Cancel'],
				    message: 'Delete this item from everywhere?',
				    title: 'Delete',
				    textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
				  });
				  dialog.addEventListener('click', function(e){
			       if (e.index === 1){
				      Ti.API.info('The cancel button was clicked');
				    }
				    if (e.index === 0){
				    var deleteItem = Titanium.Database.open('products.db');
					deleteItem.execute('DELETE FROM products WHERE id =?',id);
				    deleteItem.close(); 
				      Ti.API.info('The confirm button was clicked');
				      win.close();
				    }
				  });
				  dialog.show();
	                });
			menuItem3 = menu.add({
				title : "Remove from Shopping List",
	            icon : "images/shopping100red.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	               });
	        menuItem3.addEventListener('click', function(e){
						var cartItems = Titanium.Database.open('products.db');
							cartItems.execute('UPDATE products SET cart=? WHERE id=?',0,id);
						    cartItems.close();
						    var n = Ti.UI.createNotification({message:"Item removed from Shopping List"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
						    n.show();
						    win.close();              
	             		});
	         
	         menuItem4.addEventListener('click', shareItem);
		};
	};
		};  

});
};
detail();
