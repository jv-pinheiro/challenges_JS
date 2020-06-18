var button = document.querySelector('button');
var body = document.querySelector('body');
body.appendChild(document.createElement('ul'));


var acessaRepo = function(u){
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/' + u + '/repos');
		xhr.send(null);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject('Erro na requisição!');
				}
			}
		}
	});
}

button.onclick = function(){
	var user = document.querySelector('input');
	var topics = document.querySelector('ul');
	var topic = document.createElement('li');

	var link = document.createElement('a');
	var userLink = document.createTextNode(user.value);
	link.appendChild(userLink);
	link.setAttribute('href', 'https://api.github.com/users/' + user.value + '/repos');

	topics.appendChild(topic);
	topic.appendChild(link);

	acessaRepo(user.value)
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.warn(error);
	});
	user.value = '';
}