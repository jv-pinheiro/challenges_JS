var button = document.querySelector('button');
var body = document.querySelector('body');
body.appendChild(document.createElement('ul'));
var users = [];


var acessaRepo = function(u){
	return new Promise(function(sucesso,erro){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/' + u + '/repos');
		xhr.send(null);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					sucesso();
				} else {
					erro();
				}
			}
		}
	});
}

function carregando(){
	var user = document.querySelector('input');
	var topics = document.querySelector('ul');
	var topic = document.createElement('li');
	var textTop = document.createTextNode('Carregando...');
	topic.appendChild(textTop);
	topics.appendChild(topic);
}

function addUser(){
	var u = document.querySelector('input');
	users.push(u.value);

	u.value = '';
}

function reposErro(){
	var ul = document.querySelector('ul');
	var u = document.querySelector('input');
	ul.innerHTML = '';
	
	reposTela();
	
	var erroMsg = 'O usuário '+ u.value +' não existe. ERRO 404.';
	var erroTop = document.createElement('li');
	var erroTex = document.createTextNode(erroMsg);
	erroTop.appendChild(erroTex);
	ul.appendChild(erroTop);

	users.push(erroMsg);
}

function reposTela(){
	var ul = document.querySelector('ul');
	ul.innerHTML = '';
	for(user of users){
		if (user.length <= 31){
			var topic = document.createElement('li');

			var link = document.createElement('a');
			var userLink = document.createTextNode(user);
			link.appendChild(userLink);
			link.setAttribute('href', 'https://api.github.com/users/' + user + '/repos');

			topic.appendChild(link);
			ul.appendChild(topic);
		}else{
			var topic = document.createElement('li');
			var tex = document.createTextNode(user);
			topic.appendChild(tex);
			ul.appendChild(topic);
		}
	}
}


button.onclick = function(){
	var user = document.querySelector('input');
	acessaRepo(user.value)
		.then(function() {
			carregando();
			addUser();
			setTimeout(reposTela, 1500);
		})
		.catch(function() {
			carregando();
			reposErro();
		});
}