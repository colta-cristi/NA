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

function updateTimer() {
    let timer = document.getElementById('timer-bar'),
        timerContainer = document.getElementById('timer-container');
        
        // timerWidth = Number.parseInt(window.getComputedStyle(timer).width);
        let secondsLeft = 60;

    setInterval( () => {
        let widthPercentage = Number.parseFloat(window.getComputedStyle(timer).width) * 100 / 
            Number.parseFloat(window.getComputedStyle(timerContainer).width),
            secondsPerRound = 10,
            step = 100 / secondsPerRound;
        if (widthPercentage - step <= 0) {
            timer.style.width = 100 + '%';
            secondsLeft = 60;
            getChakra();
        }
        timer.style.width = widthPercentage - step + '%';
    }, 1000);
}

function getChakra(charactersAlive = 3) {
    let chakraTypes = ['taijutsu', 'ninjutsu', 'bloodline', 'genjutsu'],
        chakraRewarded = [];

    for (let i = 0; i < charactersAlive; i++)
        chakraRewarded.push(chakraTypes[rand(1, 4) - 1]);

        console.log(chakraRewarded);
}

function rand( lowest, highest){
    var adjustedHigh = (highest - lowest) + 1;       
    return Math.floor(Math.random()*adjustedHigh) + parseFloat(lowest);
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

		skillCost = `chakra:${chakraIcons}`;
	}

	container.querySelector('img').src = target.src;
	container.querySelector('#details .title').textContent = title;
	container.querySelector('#details .description').textContent = description;
	container.querySelector('#details #skill-cost').innerHTML = skillCost;
	container.querySelector('#details #classes').textContent = classes;
	container.querySelector('#details #cooldown').textContent = cooldown;
}