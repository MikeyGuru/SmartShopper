var win = Titanium.UI.currentWindow;
win.orientationModes = [Titanium.UI.PORTRAIT];
var barcode = win.barcode;

var nameB = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'grey',
  top: 10,left:10, 
  width: "95%", height: 50,
  editable:true,
  hintText:"Product Name",
  borderColor: 'black',
  borderWidth: 2,
  
});

var brandB = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'grey',
  top: 70, left:10,
  width: "95%", height: 50,
  editable:true,
  hintText:"Product Brand" + " (Optional)",
  borderColor: 'black',
  borderWidth: 2,
});

var noteB = Ti.UI.createTextArea({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'grey',
  top: 130, left:10,
  width: "95%", height: 100,
  editable:true,
  hintText:"Notes " + " (Optional)",
  borderColor: 'black',
  borderWidth: 2,
});
var barcodeB = Ti.UI.createTextField({
  // borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: 'black',
  top: 240, left:10, 
  width: 'auto', height: 50,
  value:"Barcode: " + barcode,
  editable: false,
  // borderColor: 'black',
  // borderWidth: 2,
});
var myImage = Ti.UI.createImageView({
	// width:200,
	height:150,
	bottom: 75
});
// myImage.defaultImage = 'images/NoImage.png';

var imageButton = Titanium.UI.createButton({
   title: 'Add Image',
   right: 10,
   top: 240,
   width: 100,
   height: 50,
   backgroundColor:'grey',
   color:'black'
});

imageButton.addEventListener('click', getImage);
function getImage(){
	Titanium.Media.showCamera({
	success:function(event) {
 // called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
 if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
 	
 			var img = event.media.imageAsResized(320, 240);

			var imageView = Ti.UI.createImageView({
				height:150,
				bottom: 75,
				image:img
			});
			var img2 = imageView.toImage().media;
			var randVal = 11 + (Math.random() * (111 - 11));
				randVal = Math.round(randVal);
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, randVal.toString() + 'temp.jpg');
			f.write(img);
			theimg = f.nativePath;
			Ti.API.info(theimg);
				
			win.add(imageView);
		} else {
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function() {
 // called when user cancels taking a picture
	},
	error:function(error) {
 // called when there's an error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
 if (error.code == Titanium.Media.NO_CAMERA) {
			a.setMessage('Please run this test on device');
		} else {
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	saveToPhotoGallery:false,
});
};
var addButton = Titanium.UI.createButton({
   title: 'Add Item',
   right:10,
   bottom: 5,
   width: 150,
   height: 50,
   backgroundColor:'blue'
});
addButton.addEventListener('click',function(e)
{
	var dbInsertInfo = Titanium.Database.open('products.db');
		dbInsertInfo.execute("INSERT INTO products (barcode, name, note, brand, image) VALUES(\"" + barcode + "\",\"" + nameB.value.toString() + "\",\"" + noteB.value.toString() + "\",\"" + brandB.value.toString() + "\",\"" + theimg + "\")");
		dbInsertInfo.close();
		
	var n = Ti.UI.createNotification({message:""+ nameB.value.toString() +"added to Shopping List"});
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
win.add(barcodeB);
win.add(imageButton);
win.add(nameB);
win.add(brandB);
win.add(noteB);
win.add(addButton);
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