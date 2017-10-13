const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const moment = require('moment-timezone');

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
      label: moment().tz('America/Los_Angeles').format('h:mm a zz') + '\tWest coast'
    },
    {
      label: moment().tz('America/Denver').format('h:mm a zz') + '\tDenver'
    },
    {
      label: moment().tz('America/North_Dakota/Center').format('h:mm a zz') + '\tOKC'
    },
    {
      label: moment().tz('America/New_York').format('h:mm a zz') + '\tNew York'
    },
    {
      label: moment().tz('Europe/London').format('h:mm a zz') + '\tLondon'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
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
  app.dock.hide();
  win = new BrowserWindow({ show: false });
  tray = new Tray(iconPath());
  setInterval(() => setupClock(tray), 1000);

  tray.on('mouse-enter', () => { isOpen = true; });
  tray.on('mouse-leave', () => { isOpen = false; });
});
