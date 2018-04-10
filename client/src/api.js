import openSocket from 'socket.io-client';
const socket = openSocket();

export function subscribeToStockSymbolMessages(cb) {
  socket.on('stockMessage', (stockSymbol) => cb(null, stockSymbol));
}

export function subscribeToAddStockHistory(cb) {
  socket.on('addStockHistory', (newStockHistory) => cb(null, newStockHistory));
}

export default {subscribeToStockSymbolMessages, subscribeToAddStockHistory};
