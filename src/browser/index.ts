import { browser, Tabs } from 'webextension-polyfill-ts';

export async function createTab(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url: url });
}

export async function getCurrentTabInfo(): Promise<Tabs.Tab> {
  return browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then(tabs => tabs[0]);
}

export function updateBadge(exist: boolean): void {
  browser.browserAction
    .setBadgeText({
      text: exist ? '*' : '',
    })
    .then(() =>
      browser.browserAction.setBadgeBackgroundColor({ color: '#303030' })
    )
    .catch(err => console.error(err));
}

export async function getTabInfo(tabID: number): Promise<Tabs.Tab> {
  return browser.tabs.get(tabID);
}
