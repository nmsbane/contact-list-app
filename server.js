var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// connect to the mongodb 
mongoose.connect('mongodb://root:root@ds037155.mlab.com:37155/banescontactlist', function(error, success) {
	if(error){
		console.log(error);
	}
});

var Schema = mongoose.Schema;
var contactSchema = new Schema({
	name: String,
	email: String,
	number: String
}, {collection: 'contactlist'});

var contactlist = mongoose.model('contactlist', contactSchema);


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	contactlist.find({}, function(err, contactList) {
		if (err) throw err;

		res.json(contactList);
	});
});

app.post('/contactlist', function(req, res) {
	var data = req.body;
	var newContact = new contactlist({
		name: data.name,
		email: data.email,
		number: data.number
	});
	newContact.save(function(err, docs){
		res.json(docs);
	})

})

app.listen(3000);
