var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	var timestamp = message.timestamp;
	var timestampMoment = moment.utc(timestamp);
	console.log('New message:');
	console.log(message.text);
	console.log(timestampMoment.local().format('h:mm a'));

	jQuery('.messages').append('<p>' + '<strong>' + timestampMoment.local().format('h:mm a') + ': ' + '</strong>' + message.text + '<p/>');
});


var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	$message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});