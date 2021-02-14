import { browser } from 'webextension-polyfill-ts';
import { HOST_SERVER } from '../constant';

browser.commands.onCommand.addListener((command: string) => {
  if (command === 'open_manager') {
    browser.tabs.create({ url: HOST_SERVER }).catch(err => console.error(err));
  }

  if (command === 'add_bookmark') {
    browser.browserAction
      .openPopup()
      .then(() =>
        setTimeout(() => sendTriggerMessage('OpenAddBookmarkCommand'), 100)
      )
      .catch(err => console.error(err));
  }
});

function sendTriggerMessage(msg: string) {
  browser.runtime.sendMessage(msg).catch(err => console.error(err));
}
