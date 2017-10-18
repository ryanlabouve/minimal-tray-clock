const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const moment = require('moment-timezone');

let appIcon = null;
let win = null;
let isOpen = null;

let time = () => {
  return moment().format('hh:mm a');
};

let timeHour = () => {
  return moment().format('h');
}

let getTimeWithFormat = (momentTz) => {
  return momentTz.format('hh:mm a zz');
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
      label: getTimeWithFormat(moment().tz('America/Los_Angeles')) + '\tWest coast'
    },
    {
      label: getTimeWithFormat(moment().tz('America/Denver')) + '\tDenver'
    },
    {
      label: getTimeWithFormat(moment().tz('America/North_Dakota/Center')) + '\tOKC'
    },
    {
      label: getTimeWithFormat(moment().tz('America/New_York')) + '\tNew York'
    },
    {
      label: getTimeWithFormat(moment().tz('Europe/London')) + '\tLondon'
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
