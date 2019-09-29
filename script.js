// import {nu} from 'data/characters';

let team = document.querySelector('#team-a'),
ch1 = document.querySelector('#ch1'),
ch2 = document.querySelector('#ch2'),
ch3 = document.querySelector('#ch3');

// initialize character & skills data
init('ch1', naruto);
init('ch2', sakura);
init('ch3', sasuke);

init('ch4', sakura, true);
init('ch5', sasuke, true);
init('ch6', naruto, true);

ch1.addEventListener('click', toggleOverlay);
ch2.addEventListener('click', toggleOverlay);
ch3.addEventListener('click', toggleOverlay);

ch1.addEventListener('click', updateDetailsContainer);
ch2.addEventListener('click', updateDetailsContainer);
ch3.addEventListener('click', updateDetailsContainer);


function init(id, char, enemy=false) {
	let charContainer = document.getElementById(id);
	charContainer.dataset.name = char.folderName;
	charContainer.querySelector('.avatar img').src = `images/${char.folderName}/avatar.jpg`;
	if (enemy) return;

	skills = charContainer.querySelectorAll('.skills img:not(.selected-skill)');
	skills.forEach((item, index) => {
		item.src = `images/${char.folderName}/${index+1}.jpg`;
	} );
}

function toggleOverlay(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') || e.target.classList.contains('selected-skill')) return;
	let target = e.target;

	setTimeout(function() {
		if (target.classList.contains('overlay')) {
			target.remove();
			// console.log('removed');
			return;
		}

		// create and style the overlay
		let overlay = document.createElement('div');
		overlay.style.height = target.height + 'px';
		overlay.style.width = target.width + 'px';
		overlay.style.backgroundColor = 'red';
		overlay.style.position = 'absolute';
		overlay.style.opacity = '0.3';

		overlay.style.top = target.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.style.left = target.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.classList.add('overlay');

		let tmp = document.createElement("div");
		tmp.appendChild(overlay);
		target.insertAdjacentHTML('beforebegin', tmp.innerHTML);
	});
}

function updateDetailsContainer(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') || e.target.classList.contains('selected-skill')) return;
	let target;
	if (e.target.classList.contains('overlay')) {
		target = e.target.nextSibling;
	} else {
		target = e.target;
	}
	let container = document.querySelector('#details');
	let skill = eval(e.currentTarget.dataset.name).skills[target.dataset.skill - 1];

	container.querySelector('img').src = target.src;
	container.querySelector('p.title').textContent = skill.name;
	container.querySelector('p.description').textContent = skill.description;
}