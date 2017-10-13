const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const moment = require('moment');

let appIcon = null;
let win = null;
let isOpen = null;

let time = () => {
  return moment().format('h:mm a');
};

let timeHour = () => {
  return moment().format('h');
}

let contextMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: time()
    },
    {
      type: 'separator'
    },
    {
      label: 'quit',
      accelerator: 'Command+q',
      selector: 'terminate:'
    }
  ]);
};

let iconPath = () =>  path.join(__dirname, 'icons', `${timeHour()}-Template.png`);

let setupClock = (tray) => {
  tray.setToolTip(time());
  tray.setImage(iconPath());
  if (!isOpen) {
    tray.setContextMenu(contextMenu());
  }
}

app.on('ready', () => {
  win = new BrowserWindow({ show: false });
  tray = new Tray(iconPath());
  setInterval(() => setupClock(tray), 1000);

  tray.on('mouse-enter', () => { isOpen = true; });
  tray.on('mouse-leave', () => { isOpen = false; });
});
