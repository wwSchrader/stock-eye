import openSocket from 'socket.io-client';
const socket = openSocket();

export function subscribeToStockSymbolMessages(cb) {
  socket.on('stockMessage', (stockSymbol) => cb(null, stockSymbol));
}

export function subscribeToAddStockHistory(cb) {
  socket.on('addStockHistory', (newStockHistory) => cb(null, newStockHistory));
}

export function subscribeToDeleteStockHistory(cb) {
  socket.on('deleteStockHistory', (stockSymbol) => cb(null, stockSymbol));
}

export default {
    subscribeToStockSymbolMessages,
    subscribeToAddStockHistory,
    subscribeToDeleteStockHistory};
