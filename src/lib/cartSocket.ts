import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  autoConnect: false,
});

export const connectSocket = (userId: string) => {
  socket.auth = { userId };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};