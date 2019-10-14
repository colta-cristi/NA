// import {nu} from 'data/characters';

let team = document.querySelector('#team-a'),
character1 = document.querySelector('#ch1'),
character2 = document.querySelector('#ch2'),
character3 = document.querySelector('#ch3'),
character4 = document.querySelector('#ch4'),
character5 = document.querySelector('#ch5'),
character6 = document.querySelector('#ch6'),
endTurnButton = document.getElementById('next-round');



startGame(naruto, sakura, sasuke, 
    sakura, sasuke, naruto);

updateTimer();

character1.addEventListener('click', toggleOverlay);
character2.addEventListener('click', toggleOverlay);
character3.addEventListener('click', toggleOverlay);

character1.addEventListener('click', updateDetailsContainer);
character2.addEventListener('click', updateDetailsContainer);
character3.addEventListener('click', updateDetailsContainer);

character4.addEventListener('click', updateDetailsContainer);
character5.addEventListener('click', updateDetailsContainer);
character6.addEventListener('click', updateDetailsContainer);

endTurnButton.addEventListener('click', function() {
    let counters = [],
        chakraCounters = document.querySelectorAll('.chakra span.chakra-counter'),
        skillsToBeApplied = document.querySelectorAll('.skill-to-be-used');

    if (!skillsToBeApplied[0]) {
        endTurn(true);
        return;
    }

    chakraCounters.forEach((c) => {
        if (!isNaN( Number.parseInt( c.textContent.slice(1) ) ))
            counters.push(Number.parseInt(c.textContent.slice(1)));
    })

    openUpdatedModal(counters);
});

let htmlAllSkills = document.querySelectorAll('.skills img');

htmlAllSkills.forEach((sk) => {
	sk.addEventListener('dblclick', (e) => {
		if(e.target && e.target.classList.contains('skill-to-be-used'))
		unprepareSkill(e.target);
	});
});