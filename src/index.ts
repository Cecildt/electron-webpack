import { ipcRenderer } from 'electron';

ipcRenderer.send('asynchronous-message', 'ping');

ipcRenderer.on('asynchronous-reply', function(event, arg) {
  console.log('ipc.async response:', arg);
});