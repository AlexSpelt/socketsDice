export const socketAPI = (io: SocketIO.Server) => {
    io.on('connection', (socket: SocketIO.Socket) => {
        console.log('a user connected');

        socket.on('roll-dice', (name) => {
            const rollDice = {
                dice1: Math.round(Math.random() * 5) + 1,
                dice2: Math.round(Math.random() * 5) + 1
            };
            
            console.log(`Rolling the dice ${rollDice.dice1}, ${rollDice.dice2} from ${name}.`);
            
            io.emit('dice-rolled', { name: name, rollDice: rollDice })
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

    });
}