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

ch4.addEventListener('click', updateDetailsContainer);
ch5.addEventListener('click', updateDetailsContainer);
ch6.addEventListener('click', updateDetailsContainer);


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
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') || 
		e.target.classList.contains('selected-skill') ||
		e.target.closest('.avatar')) 
			return;

	let target = e.target;

	setTimeout(function() {
		if (target.classList.contains('overlay')) {
			target.remove();
			return;
		}

		// create and style the overlay
		let overlay = document.createElement('div');
		overlay.style.height = target.height + 'px';
		overlay.style.width = target.width + 'px';

		overlay.style.top = target.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.style.left = target.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.classList.add('overlay');

		let tmp = document.createElement("div");
		tmp.appendChild(overlay);
		target.insertAdjacentHTML('beforebegin', tmp.innerHTML);
	});
}

function updateDetailsContainer(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') || 
		e.target.classList.contains('selected-skill')) 
			return;

	let target, 
		container = document.querySelector('#details'),
		char = eval(e.currentTarget.dataset.name),
		title = '', 
		description = '',
		classes = '',
		cooldown = '',
		skillCost = '';

	if (e.target.classList.contains('overlay')) {
		target = e.target.nextSibling;
	} else {
		target = e.target;
	}

	if (e.target.closest('.avatar')) {
		title = char.name;
		description = char.story;
	} else {
		let skill = char.skills[target.dataset.skill - 1],
			chakraIcons = '';

		title = skill.name;
		description = skill.description;
		classes = `classes: ${skill.classes}`;
		cooldown = `cooldown: ${skill.cooldown}`;

		skill.chakra.forEach((i) => {
			chakraIcons += `<div class="${i}"></div>`;
		});

		skillCost = `chakra: ${chakraIcons}`;
	}

	container.querySelector('img').src = target.src;
	container.querySelector('#details .title').textContent = title;
	container.querySelector('#details .description').textContent = description;
	container.querySelector('#details #skill-cost').innerHTML = skillCost;
	container.querySelector('#details #classes').textContent = classes;
	container.querySelector('#details #cooldown').textContent = cooldown;
}