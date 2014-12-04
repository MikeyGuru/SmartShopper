var win= Titanium.UI.currentWindow;
win.addEventListener('swipe', function(e) { if (e.direction == 'left') {
	 url:"scanner2.js";
 
	 }});
	 

// Create a TableView.
var aTableView = Ti.UI.createTableView();

// Populate the TableView data.
var data = [
	{title:'Row 1', hasChild:true, color:'red', header:'First'},
	{title:'Row 2', hasDetail:true, color:'green'},
	{title:'Row 3', hasCheck:true, color:'blue', header:'Second'},
	{title:'Row 4', color:'orange'}
];
aTableView.setData(data);

// Listen for click events.
aTableView.addEventListener('click', function(e) {
	alert('title: \'' + e.row.title + '\', section: \'' + e.section.headerTitle + '\', index: ' + e.index);
});

// Add to the parent view.
win.add(aTableView);
