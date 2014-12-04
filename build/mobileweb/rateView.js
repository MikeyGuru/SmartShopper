var win= Titanium.UI.currentWindow;
 
var tableview = Titanium.UI.createTableView({editable:true});

// function getProducts(){
var listItems = Titanium.Database.open('products.db');
var sql = listItems.execute('SELECT * FROM products GROUP BY name');

var data = [];

while(sql.isValidRow()) {
	
	var name = sql.fieldByName('name');
	var productID = sql.fieldByName('id');


	data.push({title:name, hasChild:true, id:productID, url:'detail.js'});
	sql.next();
}

tableview.setData(data);

win.add(tableview);


tableview.addEventListener('click', function(e) {

	if(e.rowData.url)
	{
	 	var win = Titanium.UI.createWindow({
	 	
	 		title: e.rowData.title,
	 		id: e.rowData.id,
	 		url: e.rowData.url,
	 		backgroundColor: 'white'
	 	
	 	});
	 	Titanium.UI.currentTab.open(win); 
	 	// win.open();
	 		}
	
});

listItems.close();



// win.addEventListener('onload', function() { getProducts(); });