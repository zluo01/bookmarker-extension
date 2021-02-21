import { browser, Tabs } from 'webextension-polyfill-ts';
import { HOST_SERVER } from '../constant';
import { checkBookmarkExist } from '../helper';

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

function handleActivated(activeInfo: Tabs.OnActivatedActiveInfoType) {
  browser.tabs
    .get(activeInfo.tabId)
    .then((labInfo: Tabs.Tab) => {
      checkBookmarkExist(labInfo.title, labInfo.url)
        .then(res => res.json())
        .then(result => {
          browser.browserAction
            .setBadgeText({
              text: result.length > 0 ? '*' : '',
            })
            .catch(err => console.error(err));
          browser.browserAction
            .setBadgeBackgroundColor({ color: '#303030' })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

browser.tabs.onActivated.addListener(handleActivated);
