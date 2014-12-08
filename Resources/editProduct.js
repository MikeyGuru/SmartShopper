var win = Titanium.UI.currentWindow;
win.orientationModes = [Titanium.UI.PORTRAIT];
var id = win.id;

var db = Titanium.Database.open('products.db');
var sql = db.execute("SELECT * FROM products WHERE id ="+ id + "");

var productName = sql.fieldByName('name');
var productNotes = sql.fieldByName('note');
var productBrand = sql.fieldByName('brand');
var productImage = sql.fieldByName('image');

db.close();


var nameB = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'black',
  top: 10,left:10, 
  width: "95%", height: 50,
  editable:true,
  hintText:"Product Name",
  borderColor: 'black',
  borderWidth: 2,
  value: productName
  
});

var brandB = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'black',
  top: 70, left:10,
  width: "95%", height: 50,
  editable:true,
  hintText:"Product Brand" + " (Optional)",
  borderColor: 'black',
  borderWidth: 2,
  value: productBrand
});

var noteB = Ti.UI.createTextArea({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'black',
  top: 130, left:10,
  width: "95%", height: 100,
  editable:true,
  hintText:"Notes " + " (Optional)",
  borderColor: 'black',
  borderWidth: 2,
  value:productNotes
});

var myImage = Ti.UI.createImageView({
	// width:200,
	height:150,
	bottom: 75,
	image:productImage
});

var saveButton = Titanium.UI.createButton({
   title: 'Save Item',
   right:10,
   bottom: 5,
   width: 150,
   height: 50,
   backgroundColor:'green'
});
saveButton.addEventListener('click',function(e)
{
	var dbInsertInfo = Titanium.Database.open('products.db');
		dbInsertInfo.execute('UPDATE products SET name=?, note=?, brand=? WHERE id=?', nameB.value.toString(), noteB.value.toString(), brandB.value.toString(), id);
		dbInsertInfo.close();
		
	var n = Ti.UI.createNotification({message:""+ nameB.value.toString() +" updated"});
			n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
		    n.show();
		    
   Titanium.API.info("You clicked the add button");
   win.close();
});

var cancelButton = Titanium.UI.createButton({
   title: 'Cancel',
   left:10,
   bottom: 5,
   width: 150,
   height: 50,
   backgroundColor:'red',
   
});
cancelButton.addEventListener('click',function(e)
{
	win.close();
   Titanium.API.info("You clicked the cancel button");
});
win.add(myImage);
win.add(nameB);
win.add(brandB);
win.add(noteB);
win.add(saveButton);
win.add(cancelButton);
win.addEventListener('open', function() {
	var actionBar = win.activity.actionBar;
	if(actionBar){
		// actionBar.setTitle('History');
	
		win.getActivity().invalidateOptionsMenu();

		// actionBar.setIcon('icon.png');
		actionBar.setDisplayHomeAsUp(true);
		              	
		 actionBar.onHomeIconItemSelected = function() { 
			 win.close(); 
			 };
		};
});
