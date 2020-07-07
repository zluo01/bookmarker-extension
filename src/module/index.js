import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

export default () => {
    const [change, setChange] = useState(false);

    useEffect(() => {
        browser.runtime.onMessage.addListener((request) => setChange(request === 'OpenAddBookmarkCommand'));
    }, []);

    return change;
};
