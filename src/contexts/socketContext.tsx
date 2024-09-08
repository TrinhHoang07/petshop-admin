import { io } from 'socket.io-client';

export const socketContext = io('http://localhost:3008', {
    timeout: 5000,
    // autoConnect: true,
});
