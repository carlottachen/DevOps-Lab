const lucky = document.querySelector('#lucky-num');

function randomNumber() {
	let max = 100;
	let result = Math.floor(Math.random() * max);
	alert(result);
}
lucky.addEventListener('click', randomNumber);


