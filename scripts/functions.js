var chakraTypes = ['taijutsu', 'bloodline', 'ninjutsu', 'genjutsu', 'any'],
	ch1, ch2, ch3, ch4, ch5, ch6,
	lastClicked;

function startGame(char1, char2, char3, char4, char5, char6) {
	// initialize character & skills data
	ch1 = char1, ch2 = char2, ch3 = char3, ch4 = char4, ch5 = char5, ch6 = char6;
	
	init('ch1', ch1);
	init('ch2', ch2);
	init('ch3', ch3);

	init('ch4', ch4, true);
	init('ch5', ch5, true);
	init('ch6', ch6, true);

	let chakra = addChakra();
	activateSkills(ch1, chakra);
	activateSkills(ch2, chakra);
	activateSkills(ch3, chakra);
}

function init(id, char, enemy=false) {
	let charContainer = document.getElementById(id);
	charContainer.dataset.name = char.folderName;
	charContainer.querySelector('.avatar img').src = `images/${char.folderName}/avatar.jpg`;

	if (enemy) return;

	skills = charContainer.querySelectorAll('.skills img:not(.selected-skill)');
	skills.forEach((image, index) => {
		image.src = `images/${char.folderName}/${index+1}.jpg`;
		image.alt = eval(char.folderName).skills[index].name;
	} );
}

function updateTimer(secondsPerRound = 10) {
    let timer = document.getElementById('timer-bar'),
        timerContainer = document.getElementById('timer-container');

    setInterval( () => {
        let widthPercentage = Number.parseFloat(window.getComputedStyle(timer).width) * 100 / 
            Number.parseFloat(window.getComputedStyle(timerContainer).width),
			step = 100 / secondsPerRound;
			
		// Change round
        if (widthPercentage - step <= 0) {
            timer.style.width = 100 + '%';
			secondsLeft = 60;
			
			// TODO: get charactersAlive
			let chakra = addChakra();
			activateSkills(ch1, chakra);
			activateSkills(ch2, chakra);
			activateSkills(ch3, chakra);
        }
        timer.style.width = widthPercentage - step + '%';
    }, 1000);
}

function addChakra(charactersAlive = 3) {
    let chakraCounters = {
			'taijutsu': Number.parseInt(document.querySelector(`.${chakraTypes[0]} .chakra-counter`).textContent[1]),
			'bloodline': Number.parseInt(document.querySelector(`.${chakraTypes[2]} .chakra-counter`).textContent[1]),
			'ninjutsu': Number.parseInt(document.querySelector(`.${chakraTypes[1]} .chakra-counter`).textContent[1]),
			'genjutsu': Number.parseInt(document.querySelector(`.${chakraTypes[3]} .chakra-counter`).textContent[1]),
			'total': function() {
				return this.taijutsu + this.ninjutsu + this.bloodline + this.genjutsu;
			}
		};


    for (let i = 0; i < charactersAlive; i++)
		chakraCounters[(chakraTypes[rand(1, 4) - 1])]++;

		chakraTypes.forEach((i) => {
			if (i == 'any') return;
			document.querySelector(`.${i} .chakra-counter`).textContent = 'x' + chakraCounters[i];	
		});

		chakraCounters.any = chakraCounters.total.bind(chakraCounters)();
		document.querySelector(`.total .chakra-counter`).innerHTML = '<b>T</b>x' + chakraCounters.any;

		return chakraCounters;
}

function activateSkills(character, chakra) {
	character.skills.forEach(function(skill) {
		let canActivate = true,
			chakraNeeded = chakraTypes.filter(type => skill.chakra[type] > 0);


		chakraNeeded.forEach((type) => {
			if (skill.chakra[type] > chakra[type]) {
				canActivate = false;
				return;
			}
			if (chakra[type] >= skill.chakra[type] && canActivate) {
				canActivate = true;
				document.querySelector(`.skills img[alt="${skill.name}"]`).style.opacity = 1;
			}
		});
	});
}

function rand( lowest, highest){
    var adjustedHigh = (highest - lowest) + 1;       
    return Math.floor(Math.random()*adjustedHigh) + parseFloat(lowest);
}



function toggleOverlay(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') || 
		e.target.classList.contains('selected-skill') ||
		e.target.closest('.avatar') ||
		!e.target.classList.contains('overlay') && e.target.style.opacity != 1)
			return;

	let target = e.target.tagName == 'IMG' ? e.target : e.target.nextElementSibling,
		allOverlays = document.querySelectorAll('.overlay'),
		character = eval(e.currentTarget.dataset.name),
		htmlEnemies = document.querySelectorAll('#team-b .avatar img'),
		htmlAllies = document.querySelectorAll('#team-a .avatar img'),
		htmlAlliesExceptSelf = document.querySelectorAll(`#team-a div:not([data-name="${e.currentTarget.dataset.name}"]) .avatar img`),
		htmlAll = document.querySelectorAll('#teams'),
		htmlSelf = document.querySelector(`#team-a div[data-name="${e.currentTarget.dataset.name}"] .avatar img`),
		charactersTargeted = '';

	setTimeout(function() {
		let skillClicked = character.skills[target.dataset.skill - 1];
		if (lastClicked) {
			if (lastClicked.name == skillClicked.name) {
				// remove overlays if I click the same skill again
				allOverlays.forEach((overlay) => overlay.remove());
				lastClicked = '';
				return;
			}
		}

		lastClicked = skillClicked;

		// remove overlays if I select another skill
		allOverlays.forEach((overlay) => overlay.remove());

		// create and style the overlays
		let skillOverlay = document.createElement('div');
		skillOverlay.style.height = target.height + 'px';
		skillOverlay.style.width = target.width + 'px';

		skillOverlay.style.top = target.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		skillOverlay.style.left = target.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		skillOverlay.classList.add('overlay');

		let tmp = document.createElement("div");
		tmp.appendChild(skillOverlay);
		target.insertAdjacentHTML('beforebegin', tmp.innerHTML);

		if (skillClicked.targets.includes('ally')) {
			charactersTargeted = htmlAlliesExceptSelf;
		}

		if (skillClicked.targets.includes('enemy')) {
			if (skillClicked.targets.includes('ally')) {
				charactersTargeted = htmlAll;
			} else {
				charactersTargeted = htmlEnemies;
			}
		}

		if (skillClicked.targets.includes('self')) {
			if (skillClicked.targets.includes('ally')) {
				charactersTargeted = htmlAllies;
			} else {
				charactersTargeted = htmlSelf;
				overlay = document.createElement('div');
				overlay.style.height = charactersTargeted.height + 'px';
				overlay.style.width = charactersTargeted.width + 'px';

				overlay.style.top = charactersTargeted.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(charactersTargeted).border) + 'px';
				overlay.style.left = charactersTargeted.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(charactersTargeted).border) + 'px';
				overlay.classList.add('overlay');

				let tmp2 = document.createElement("div");
				tmp2.appendChild(overlay);
				charactersTargeted.insertAdjacentHTML('beforebegin', tmp2.innerHTML);

				return;
			}
		}

		charactersTargeted.forEach((enemy) => {
			overlay = document.createElement('div');
			overlay.style.height = enemy.height + 'px';
			overlay.style.width = enemy.width + 'px';

			overlay.style.top = enemy.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(enemy).border) + 'px';
			overlay.style.left = enemy.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(enemy).border) + 'px';
			overlay.classList.add('overlay');
			overlay.classList.add('character');

			let tmp2 = document.createElement("div");
			tmp2.appendChild(overlay);
			enemy.insertAdjacentHTML('beforebegin', tmp2.innerHTML);
		});

		let characterOverlays = document.querySelectorAll('#teams .avatar .overlay');

		characterOverlays.forEach((ch) => {
			ch.addEventListener('click', applySkill);
		});
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
		if (e.target.classList.contains('character')) {
			return;
		}
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

		chakraTypes.forEach((type) => {
			if (skill.chakra[type] > 0 ) {
				for (let i = 0; i < skill.chakra[type]; i++)
					chakraIcons += `<div class="chakra ${type}"><div class="square"></div></div>`;
			}
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

function applySkill(e) {
	let allOverlays = document.querySelectorAll('.overlay');

	// TODO: add skill icon near character avatar
	allOverlays.forEach((overlay) => overlay.remove());
	lastClicked = '';
	e.stopPropagation();
}