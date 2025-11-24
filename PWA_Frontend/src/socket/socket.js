import { io } from "socket.io-client";
import { socketBaseUrl } from "../config/api";

// Create socket instance that targets the configured backend origin
const socket = io(socketBaseUrl, {
  withCredentials: true,
});

export const initSocket = () => {
  console.log("Inicializando socket...");
  
  // Check if socket is connected
  if (socket.connected) {
    console.log("Estou conectado");
  } else {
    console.log("Tentando conectar...");
  }

  // Listen for connection events
  socket.on('connect', () => {
    console.log('Conectado ao servidor:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado do servidor');
  });

  return socket;
};

export const socketAddListener = (listener = "", callback = () => {}) => {
  socket.on(listener, callback);
};

export const socketRemoveListener = (listener = "", callback = () => {}) => {
  socket.off(listener, callback);
};
