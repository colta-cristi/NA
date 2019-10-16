var chakraTypes = ['taijutsu', 'bloodline', 'ninjutsu', 'genjutsu', 'any'],
	ch1 = {}, ch2 = {}, ch3 = {}, ch4 = {}, ch5 = {}, ch6 = {},
	lastClicked,
	chakra = {
		'taijutsu': Number.parseInt(document.querySelector(`.${chakraTypes[0]} .chakra-counter`).textContent[1]),
		'bloodline': Number.parseInt(document.querySelector(`.${chakraTypes[1]} .chakra-counter`).textContent[1]),
		'ninjutsu': Number.parseInt(document.querySelector(`.${chakraTypes[2]} .chakra-counter`).textContent[1]),
		'genjutsu': Number.parseInt(document.querySelector(`.${chakraTypes[3]} .chakra-counter`).textContent[1]),
		'total': function () {
			return Number.parseInt(this.taijutsu) + 
				Number.parseInt(this.ninjutsu) + 
				Number.parseInt(this.bloodline) + 
				Number.parseInt(this.genjutsu);
		}
	},
	roundNumber = 1;

function startGame(char1, char2, char3, char4, char5, char6) {
	// initialize character & skills data

	for (let key in char1) {
		ch1[key] = char1[key];
	}
	for (let key in char2) {
		ch2[key] = char2[key];
	}
	for (let key in char3) {
		ch3[key] = char3[key];
	}
	for (let key in char4) {
		ch4[key] = char4[key];
	}
	for (let key in char5) {
		ch5[key] = char5[key];
	}
	for (let key in char6) {
		ch6[key] = char6[key];
	}


	init('ch1', ch1);
	init('ch2', ch2);
	init('ch3', ch3);

	init('ch4', ch4, true);
	init('ch5', ch5, true);
	init('ch6', ch6, true);

	addChakra();
	updateSkillsActivationStatus();
}

function init(id, char, enemy = false) {
	let charContainer = document.getElementById(id);
	charContainer.dataset.name = char.folderName;
	charContainer.querySelector('.avatar img').src = `images/${char.folderName}/avatar.jpg`;

	char.hp = 100;

	if (enemy) return;

	skills = charContainer.querySelectorAll('.skills img:not(.selected-skill)');
	skills.forEach((image, index) => {
		image.src = `images/${char.folderName}/${index + 1}.jpg`;
		image.alt = eval(char.folderName).skills[index].name;
	});
}

function updateTimer(secondsPerRound = 30) {
	let timer = document.getElementById('timer-bar'),
		timerContainer = document.getElementById('timer-container');

	setInterval(() => {
		let widthPercentage = Number.parseFloat(window.getComputedStyle(timer).width) * 100 /
			Number.parseFloat(window.getComputedStyle(timerContainer).width),
			step = 100 / secondsPerRound;

		// Change round
		if (widthPercentage - step <= 0) {
			timer.style.width = 100 + '%';
			endTurn(true);
			closeModal();
		}
		timer.style.width = widthPercentage - step + '%';
	}, 1000);
}

function addChakra(charactersAlive = 3) {
	for (let i = 0; i < charactersAlive; i++) {
		let random = Math.random(),
			type = random <= 0.25 ? 'taijutsu' :
				random > 0.25 && random <= 0.5 ? 'bloodline' : 
				random > 0.5 && random <= 0.75 ? 'ninjutsu' :
				'genjutsu';

		chakra[type]++;
	}

	updateHtmlChakra();
}

function updateHtmlChakra() {
	chakra.any = chakra.total();

	chakraTypes.forEach((i) => {
		if (i == 'any') return;
		document.querySelector(`.${i} .chakra-counter`).textContent = 'x' + chakra[i];
	});

	document.querySelector(`.total .chakra-counter`).innerHTML = '<b>T</b>x' + chakra.total();
}

function updateSkillsActivationStatus(characters = [ch1, ch2, ch3]) {

	characters.forEach((character) => {
		character.skills.forEach(function (skill) {
			let canActivate = true,
				chakraNeeded = chakraTypes.filter(type => skill.chakra[type] > 0),
				htmlSkill = document.querySelector(`.skills img[alt="${skill.name}"]`);
	
	
			chakraNeeded.forEach((type) => {
				// deactivate skill if it was not used this round
				if (skill.chakra[type] > chakra[type] && !htmlSkill.classList.contains('skill-to-be-used')) {
					canActivate = false;
					htmlSkill.style.opacity = '';
					return;
				}
				if (chakra[type] >= skill.chakra[type] && canActivate) {
					canActivate = true;

					if (skill.requires != undefined) {
						// check if skill has requirements
						if (character.skills[skill.requires[1]].activated) {
							htmlSkill.style.opacity = 1;
						} else {
							htmlSkill.style.opacity = '';
						}
					} else {
						htmlSkill.style.opacity = 1;
					}
				}
			});

			if ((roundNumber - skill.lastUsedInRound) < skill.cooldown) {
				htmlSkill.style.opacity = '';
			} 
			if ((roundNumber - skill.lastUsedInRound) >= skill.cooldown) {
				if (htmlSkill.closest('.char').querySelector('.cooldown')){
					htmlSkill.closest('.char').querySelector('.cooldown').remove();
				}					
			}
		});
	})
}

function createCooldownOverlay(skill) {
	let htmlSkill = document.querySelector(`.skills img[alt="${skill.name}"]`),
		htmlSkillTranslatedBy = Math.abs(Number.parseInt(htmlSkill.style.transform.split('(')[1].slice(0, -1)));

	let cdOverlay = document.createElement('div');
	cdOverlay.innerHTML = skill.cooldown;
	cdOverlay.style.height = window.getComputedStyle(htmlSkill).height;
	cdOverlay.style.width = window.getComputedStyle(htmlSkill).width;
	cdOverlay.classList.add('cooldown');

	cdOverlay.style.top = htmlSkill.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(htmlSkill).border) + 'px';
	cdOverlay.style.left = htmlSkill.getBoundingClientRect().left + htmlSkillTranslatedBy + Number.parseInt(window.getComputedStyle(htmlSkill).border) + 'px';

	let tmp = document.createElement("div");
	tmp.appendChild(cdOverlay);
	htmlSkill.insertAdjacentHTML('beforebegin', tmp.innerHTML);
}

function toggleOverlay(e) {
	if (e.target.tagName !== 'IMG' && !e.target.classList.contains('overlay') ||
		e.target.classList.contains('selected-skill') ||
		e.target.closest('.avatar') ||
		!e.target.classList.contains('overlay') && e.target.style.opacity != 1 ||
		e.target.classList.contains('skill-to-be-used'))
		return;

	let target = e.target.tagName == 'IMG' ? e.target : e.target.nextElementSibling,
		allOverlays = document.querySelectorAll('.overlay'),
		clickedCharacterName = e.currentTarget.dataset.name,
		character = eval(clickedCharacterName),
		htmlEnemies = document.querySelectorAll('#team-b .avatar img:not([src="images/dead.jpg"])'),
		htmlAllies = document.querySelectorAll('#team-a .avatar img:not([src="images/dead.jpg"])'),
		htmlAlliesExceptSelf = document.querySelectorAll(`#team-a div:not([data-name="${e.currentTarget.dataset.name}"]) .avatar img:not([src="images/dead.jpg"])`),
		htmlAll = document.querySelectorAll('#teams .avatar img:not([src="images/dead.jpg"])'),
		htmlSelf = document.querySelector(`#team-a div[data-name="${clickedCharacterName}"] .avatar img`),
		charactersTargeted = '';

	setTimeout(function () {
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
			}
		}

		addCharacterOverlay(charactersTargeted);

		let characterOverlays = document.querySelectorAll('#teams .avatar .overlay');

		characterOverlays.forEach((ch) => {
			if (ch.dead) return;

			ch.addEventListener('click', function (e) {
				prepareSkill(clickedCharacterName, skillClicked, e);
			});
		});
	});
}

function addCharacterOverlay(target) {
	let overlay = document.createElement('div');
	if (target.length) {
		target.forEach((enemy) => {
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
	} else {
		overlay.style.height = target.height + 'px';
		overlay.style.width = target.width + 'px';

		overlay.style.top = target.getBoundingClientRect().top + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.style.left = target.getBoundingClientRect().left + Number.parseInt(window.getComputedStyle(target).border) + 'px';
		overlay.classList.add('overlay');

		let tmp2 = document.createElement("div");
		tmp2.appendChild(overlay);
		target.insertAdjacentHTML('beforebegin', tmp2.innerHTML);
	}
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
			if (skill.chakra[type] > 0) {
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

function endTurn(isConfirmed = false) {
	let skillsToBeApplied = document.querySelectorAll('.skill-to-be-used'),
		timer = document.getElementById('timer-bar');

	if (isConfirmed) {
		timer.style.width = '100%';

		if (skillsToBeApplied[0]) {
			skillsToBeApplied.forEach((hSkill) => {
				let skillObject = eval(hSkill.closest('.char').id).skills[hSkill.dataset.skill - 1];

				if (skillObject.activated != undefined) {
					skillObject.activated = 1;
				}

				applySkill(skillObject, hSkill.dataset.skillTarget);
				createCooldownOverlay(skillObject);
				unprepareSkill(hSkill);
			});
		}
		// TODO: get charactersAlive
		addChakra();
		updateSkillsActivationStatus();
		roundNumber++;

		let cooldownDivs = document.querySelectorAll('.cooldown');
		cooldownDivs.forEach((cd) => {
			let skill = eval(cd.closest('.char').id).skills[cd.nextElementSibling.dataset.skill - 1];
			
			cd.textContent = skill.cooldown + skill.lastUsedInRound - roundNumber + 1;
		})
	}

	return;
}

function prepareSkill(skillOwnerName, skill, e) {
	let skillAlreadyUsed = document.querySelector(`div[data-name="${skillOwnerName}"] .skill-to-be-used`);
	if (skillAlreadyUsed) {
		unprepareSkill(skillAlreadyUsed);
	}

	let allOverlays = document.querySelectorAll('.overlay');

	// TODO: add skill icon near character avatar

	let htmlSkill = document.querySelector(`img[alt="${skill.name}"`),
		htmlSelectedSkill = document.querySelector(`div[data-name="${skillOwnerName}"] .selected-skill`);

	htmlSkill.style.transform = `translateX(${htmlSelectedSkill.offsetLeft - htmlSkill.offsetLeft}px)`;
	htmlSkill.classList.add('skill-to-be-used');
	htmlSkill.setAttribute('data-skill-target', e.target.closest('.char').id);


	allOverlays.forEach((overlay) => overlay.remove());
	lastClicked = '';
	// Update chakra, so i cannot use more skills than i have chakra for
	Object.keys(skill.chakra).forEach((type) => {
		if (type != 'any') {
			chakra[type] -= skill.chakra[type];
		}
	})

	updateHtmlChakra();
	updateSkillsActivationStatus();

	e.stopPropagation();
}

function unprepareSkill(htmlSkill) {
	htmlSkill.style.transform = '';
	htmlSkill.classList.remove('skill-to-be-used');

	// If i don't want to use a skill anymore, refill chakra
	let skill = eval(htmlSkill.closest('.char').id).skills[htmlSkill.dataset.skill - 1];
	Object.keys(skill.chakra).forEach((type) => {
		if (type != 'any') {
			chakra[type] += skill.chakra[type];
		}
	})

	updateHtmlChakra();
	updateSkillsActivationStatus();
}

function applySkill(skill = '', skillTarget = '') {
	let applyOnChar = eval(skillTarget),
		htmlCharClicked = document.getElementById(skillTarget),
		htmlHP = htmlCharClicked.querySelector('.current-health'),
		htmlHpBar = htmlCharClicked.querySelector('.health-bar-remaining');

	if (skill.damage) {
		applyOnChar.hp = applyOnChar.hp < skill.damage ? 0 : applyOnChar.hp - skill.damage;
	}
	if (skill.heal && applyOnChar.hp < 100) {
		applyOnChar.hp = applyOnChar.hp + skill.heal > 100 ? 100 : applyOnChar.hp + skill.heal;
	}

	htmlHP.textContent = applyOnChar.hp;

	htmlHpBar.style.width = applyOnChar.hp + '%';
	if (applyOnChar.hp <= 70) {
		htmlHpBar.style.backgroundColor = 'orange';

		if (applyOnChar.hp <= 40) {
			htmlHpBar.style.backgroundColor = 'red';

			if (applyOnChar.hp <= 0) {
				htmlCharClicked.querySelector('.avatar img').src = 'images/dead.jpg';
				applyOnChar.dead = true;
			}
		}
	} else {
		htmlHpBar.style.backgroundColor = '#3CE041';
	}

	// TODO: make lines below a function updateChakra()
	Object.keys(skill.chakra).forEach((type) => {
		chakra[type] -= skill.chakra[type];
		updateHtmlChakra();
	});

	skill.lastUsedInRound = roundNumber;
	updateSkillsActivationStatus();
}

// modal-related functions & variables

let modalContainer = document.getElementById('modal-container'),
	modalOverlay = document.getElementById('popup-overlay'),
	cancel = document.querySelector('#modal-footer *[data-option="cancel"]'),
	okay = document.querySelector('#modal-footer *[data-option="ok"]'),
	board = document.getElementById('board'),
	currentCounters = document.querySelectorAll('.current-values .chakra-counter'),
	plusMinus = document.querySelectorAll('.adjustment-controls span');

plusMinus.forEach((control) => {
	control.addEventListener('click', adjustChakra)
});

cancel.addEventListener('click', closeModal);
okay.addEventListener('click', function() {

	// update chakra counters after consuming selected random chakra
	let i = 0;
	chakraTypes.forEach((type) => {
		if (type == 'any') return;
		chakra[type] = currentCounters[i++].textContent;
	});

	endTurn(true);
	closeModal();
});

function closeModal() {
	let images = document.querySelectorAll('#skills-carousel img');

	images.forEach((image) => image.remove());
	board.style.position = 'static';
	modalContainer.style.visibility = 'hidden';
	modalOverlay.style.display = 'none';
}

function openUpdatedModal(counters) {
	let i = 0;

	counters.forEach((c) => {
		currentCounters[i++].textContent = c;
	})

	let skillsToBeApplied = document.querySelectorAll('.skill-to-be-used'),
		skillsCarousel = document.getElementById('skills-carousel'),
		chakraToSelect = 0;

	if (skillsToBeApplied[0]) {
		skillsToBeApplied.forEach((htmlSkill) => {
			let img = document.createElement('img');
				char = eval(htmlSkill.closest('.char').id),
				skillCost = char.skills[htmlSkill.dataset.skill - 1].chakra,
				chakraToSelect += skillCost.any ? skillCost.any : 0;

			img.src = htmlSkill.src;
			img.alt = htmlSkill.alt;

			skillsCarousel.prepend(img);
		})

		board.style.position = 'relative';
		modalContainer.style.visibility = 'visible';
		modalOverlay.style.display = 'block';

		let htmlChakraToSelect = document.getElementById('modal-choose-counter');
		htmlChakraToSelect.textContent = chakraToSelect;

		if (htmlChakraToSelect.textContent == 0) {
			okay.classList.remove('disabled');
		} else if (!okay.classList.contains('disabled')) {
			okay.classList.add('disabled');
		}
	}
}

function adjustChakra(e) {
	let subtractedValues = document.querySelectorAll('.subtracted-values span'),
		index = e.target.dataset.index,
		leftToChoose = document.getElementById('modal-choose-counter');

		if (e.target.classList.value == 'plus' && Number.parseInt(currentCounters[index].textContent)) {
			if (leftToChoose.textContent == 0) {
				return;
			}
			subtractedValues[index].textContent++;
			currentCounters[index].textContent--;
			leftToChoose.textContent--;
		} 

		if (e.target.classList.value == 'minus' && Number.parseInt(subtractedValues[index].textContent)) {
			subtractedValues[index].textContent--;
			currentCounters[index].textContent++;
			leftToChoose.textContent++;
		}

		if (leftToChoose.textContent == 0) {
			okay.classList.remove('disabled');
		} else if (!okay.classList.contains('disabled')) {
			okay.classList.add('disabled');
		}
}