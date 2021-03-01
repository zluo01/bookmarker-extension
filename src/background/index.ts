import { browser, Tabs } from 'webextension-polyfill-ts';
import { HOST_SERVER } from '../constant';
import { checkBookmarkExist } from '../helper';
import { createTab, getTabInfo, updateBadge } from '../browser';

browser.commands.onCommand.addListener((command: string) => {
  if (command === 'open_manager') {
    createTab(HOST_SERVER).catch(err => console.error(err));
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
  getTabInfo(activeInfo.tabId)
    .then((labInfo: Tabs.Tab) => checkBookmarkExist(labInfo.title, labInfo.url))
    .then(res => res.json())
    .then(result => updateBadge(result.length > 0))
    .catch(err => console.error(err));
}

browser.tabs.onActivated.addListener(handleActivated);
