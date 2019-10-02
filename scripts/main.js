// import {nu} from 'data/characters';

let team = document.querySelector('#team-a'),
character1 = document.querySelector('#ch1'),
character2 = document.querySelector('#ch2'),
character3 = document.querySelector('#ch3');

startGame(naruto, sakura, sasuke, 
    sakura, sasuke, naruto);

updateTimer();

character1.addEventListener('click', toggleOverlay);
character2.addEventListener('click', toggleOverlay);
character3.addEventListener('click', toggleOverlay);

character1.addEventListener('click', updateDetailsContainer);
character2.addEventListener('click', updateDetailsContainer);
character3.addEventListener('click', updateDetailsContainer);

character1.addEventListener('click', updateDetailsContainer);
character2.addEventListener('click', updateDetailsContainer);
character3.addEventListener('click', updateDetailsContainer);
