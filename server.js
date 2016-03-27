var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/contactlist', function(req, res) {
	console.log("i received a get request");
	var person1  ={
		name: 'tim',
		email: 'tim@cook.com',
		number: '(111)-111-111'
	};

	var person2 = {
		name: 'emily',
		email: 'emily@email2.com',
		number: '(222)-222-2222'
	};

	var person3 = {
		name: 'john',
		email: 'john@email3.com',
		number: '(333)-333-3333'
	};

	var contactList = [person1, person2, person3];
	res.json(contactList);
});

app.listen(3000);