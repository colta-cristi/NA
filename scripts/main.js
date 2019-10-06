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

endTurnButton.addEventListener('click', endTurn);
