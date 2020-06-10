const socket = io();
const diceSound = new Audio('/sounds/dice-sound.mp3');

let name;
let timeOut = false;

const rollDice = () => {
    if(!timeOut) {
        timeOut = true;
        
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

socket.on('dice-rolled', (diceObj) => {
    $('#msg').text(`${diceObj.name} has rolled the dice last.`);
    $('#dice1').attr('src', `/images/dice-${diceObj.rollDice.dice1}.png`);
    $('#dice2').attr('src', `/images/dice-${diceObj.rollDice.dice2}.png`);
    
    diceSound.play();
});
