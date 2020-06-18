
var checaIdade = function(i){
	return new Promise(function(maior, menor) {
		setTimeout (function(){
			if (i >= 18){
			//sleep();
				maior();
			}else{
				menor();
			}
		}, 2000);
	});
}


checaIdade(53)
	.then(function() {
		console.log("Maior ou igual a 18.");
	})
	.catch(function() {
		console.log("Menor que 18.");
	});