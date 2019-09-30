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

updateTimer();

ch1.addEventListener('click', toggleOverlay);
ch2.addEventListener('click', toggleOverlay);
ch3.addEventListener('click', toggleOverlay);

ch1.addEventListener('click', updateDetailsContainer);
ch2.addEventListener('click', updateDetailsContainer);
ch3.addEventListener('click', updateDetailsContainer);

ch4.addEventListener('click', updateDetailsContainer);
ch5.addEventListener('click', updateDetailsContainer);
ch6.addEventListener('click', updateDetailsContainer);
