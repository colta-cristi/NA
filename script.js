// import {nu} from 'data/characters';

let team = document.querySelector('#team-a');
let detailsText = document.querySelector('#details');
// alert(nu.name);

team.addEventListener('click', function(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay')) return;
	let target = e.target;

	if (target.classList.contains('overlay')) {
		target.remove();
		console.log('removed');
		return;
	}

	// create and style the overlay
	let overlay = document.createElement('div');
	overlay.style.height = target.height + 'px';
	overlay.style.width = target.width + 'px';
	overlay.style.backgroundColor = 'red';
	overlay.style.position = 'absolute';
	overlay.style.opacity = '0.3';



	overlay.style.top = Number.parseInt(window.getComputedStyle(target).marginTop) + Math.abs(Number.parseInt(window.getComputedStyle(target.closest('.skills')).top)) + 'px';
	overlay.style.left = target.offsetLeft + 'px';
	overlay.classList.add('overlay');
	var tmp = document.createElement("div");
	tmp.appendChild(overlay);
	target.insertAdjacentHTML('beforebegin', tmp.innerHTML);
	// target.classList.add('active');
});