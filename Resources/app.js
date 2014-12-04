// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.Database.install('products.db', 'products.db');
StartApp = require('shoppingList');
StartApp.StartUp();

