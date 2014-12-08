function HistoryList(){
var win= Titanium.UI.createWindow({
	title:'History',
    backgroundColor:'white'
});
win.orientationModes = [Titanium.UI.PORTRAIT];

 
var tableview = Titanium.UI.createTableView({
	editable:true
	});

function getProducts(){
var listItems = Titanium.Database.open('products.db');
var sql = listItems.execute('SELECT * FROM products GROUP BY name');

var data = [];

while(sql.isValidRow()) {
	
	var name = sql.fieldByName('name');
	var productID = sql.fieldByName('id');
	var image = sql.fieldByName('image');
// fnwwgkrwnkgerwngerngerngernjrnenogfoer
var row = Ti.UI.createTableViewRow({
			title:name, 
			hasChild:true, 
			id:productID, 
			url:'detail.js',
			height:40
 		 });
			 
	var labelDetails = Ti.UI.createLabel({
		    color:'black',
		    font:{fontFamily:'Arial', fontWeight:'normal'},
		    text:name,
		    left:45,
		    ellipsize:true 
		    // top:8
  		});
  row.add(labelDetails);
	var imageAvatar = Ti.UI.createImageView({
    		image:image,
    		left:2,
    		height:40
  		});
  		var separator = Titanium.UI.createView({
	   left : 0,
	   bottom : 0,
	   width : '100%',
	   height : 1,
	   touchEnabled : false,
	   backgroundColor: 'grey'
		});
   row.add(imageAvatar);
   row.add(separator);
	data.push (row);
	// data.push({title:name, hasChild:true, id:productID, url:'detail.js'});
	sql.next();
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
	
	var cartItems = Titanium.Database.open('products.db');
	cartItems.execute('UPDATE products SET cart=? WHERE id=?',1,e.rowData.id);
    cartItems.close();
    var n = Ti.UI.createNotification({message:"Item added to Shopping List"});
	n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
    n.show();
    getProducts();
    tableview.removeEventListener('click', showDetails);
    setTimeout(function(){
	    tableview.addEventListener('click', showDetails);
	}, 1000);
});
win.addEventListener('open', function() {
	//New Code 
	
	var actionBar,menu,menuItem,menuItem2,menuItem3,activity,activity2,activity3;

	actionBar = win.activity.actionBar;
	if(actionBar){
		actionBar.setTitle('History');
	
		win.getActivity().invalidateOptionsMenu();

		// actionBar.setIcon('icon.png');
		actionBar.setDisplayHomeAsUp(true);
		              	
		 actionBar.onHomeIconItemSelected = function() { 
			 win.close(); 
			 };
		activity = win.activity;
		activity.onCreateOptionsMenu = function(e){
			menu = e.menu;
			menuItem = menu.add({
				title : "Refresh",
	            icon : "images/refresh57white.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem.addEventListener('click', function(e){
						getProducts(); 
						var n = Ti.UI.createNotification({message:"Refreshed"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
						    n.show();               
	                });
	        menuItem2 = menu.add({
				title : "Delete All",
	            icon : "images/delete81.png",
	            showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
	               });
	        menuItem2.addEventListener('click', function(e){
	        	// new code
	        	var dialog = Ti.UI.createAlertDialog({
				    cancel: 1,
				    buttonNames: ['Confirm', 'Cancel'],
				    message: 'Are you sure you want to delete all items?',
				    title: 'Delete All',
				    textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
				  });
				  dialog.addEventListener('click', function(e){
				    if (e.index === e.source.cancel){
				      Ti.API.info('The cancel button was clicked');
				    }
				    if (e.index === 0){
				    var deleteAll = Titanium.Database.open('products.db');
					deleteAll.execute('DELETE FROM products');
				    deleteAll.close(); 
				      Ti.API.info('The confirm button was clicked');
				       getProducts();
				       var n = Ti.UI.createNotification({message:"ALll Items Deleted"});
							n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
						    n.show();
				    }
				  });
				  dialog.show();				
	                }); 
		};
		
		
		};  
	
	//End new code
	
	
	 getProducts(); });
	 	 win.addEventListener('focus', getProducts);
 	 
win.open();
};
exports.HistoryList = HistoryList;
