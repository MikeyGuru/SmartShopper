var win = Titanium.UI.currentWindow;

var id = win.id;

var db = Titanium.Database.open('products.db');
var sql = db.execute("SELECT * FROM products WHERE id ="+ id + "");

var productName = sql.fieldByName('name');
var productBarcode = sql.fieldByName('barcode');
var productNotes = sql.fieldByName('note');
var productDate = sql.fieldByName('date');

var name1 = Titanium.UI.createLabel({
text: productName,
top: 10,
height: 'auto',
width: 'auto'
});
var note1 = Titanium.UI.createLabel({
 text:"Notes: " + productNotes, 
 top: 80,
height: 'auto',
width: 'auto'
});
var date1 = Titanium.UI.createLabel({
text:"Date scanned: " + productDate, 
top: 40,
height: 'auto',
width: 'auto'
});
var barcode1 = Titanium.UI.createLabel({
text: "UPC: " + productBarcode, 
top: 150,
height: 'auto',
width: 'auto'

});

win.add(name1);
if(productNotes)
	{
win.add(note1);
};
win.add(date1);
win.add(barcode1);
