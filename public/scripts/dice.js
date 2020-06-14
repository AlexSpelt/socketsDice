const socket = io();
const diceSound = new Audio('/sounds/dice-sound.mp3');

let name;
let timeOut = false;
let playSound = true;

const rollDice = () => {
    if(!timeOut) {
        timeOut = true;
        
        if(playSound)
            diceSound.play();

        socket.emit('roll-dice', name);

        setTimeout(() => {
            timeOut = false;
        }, 500);
    }
}

$('#nameRetriever').modal({
    keyboard: false,
    backdrop: 'static'
});

$('#nameRetriever form').submit((e) => {
    e.preventDefault();
    $('#nameRetriever').modal('hide');
    name = $('#name')[0].value;

    console.log(name);
});

$('input[type=radio][name=sound]').change(() => playSound = $('input[type=radio][name=sound]')[0].checked);

socket.on('dice-rolled', (diceObj) => {
    $('#msg').text(`${diceObj.name} has rolled the dice last.`);
    $('#dice1').attr('src', `/images/dice-${diceObj.rollDice.dice1}.png`);
    $('#dice2').attr('src', `/images/dice-${diceObj.rollDice.dice2}.png`);
    
    if(playSound)    
        diceSound.play();
});
