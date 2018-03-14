import openSocket from 'socket.io-client';
const socket = openSocket();

export function subscribeToStockSymbolMessages(cb) {
  socket.on('stockMessage', (stockSymbol) => cb(null, stockSymbol));
}

export default {subscribeToStockSymbolMessages};
