import browser from 'webextension-polyfill';
import { HOST_SERVER } from '../Constant';

browser.commands.onCommand.addListener(function (command) {
    if (command === 'open_manager') {
        browser.tabs.create({ url: HOST_SERVER })
            .then(() => console.log('Open server home page'))
            .catch(err => console.error(err));
    }

    if (command === 'add_bookmark') {
        browser.browserAction.openPopup()
            .then(() => setTimeout(() => sendTriggerMessage('OpenAddBookmarkCommand'), 100))
            .catch(err => console.error(err));
    }
});

function sendTriggerMessage (msg) {
    browser.runtime.sendMessage(msg).catch(err => console.log(err));
}
