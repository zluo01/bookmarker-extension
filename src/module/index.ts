import { useEffect, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';

function onTrigger(): boolean {
  const [change, setChange] = useState(false);

  useEffect(() => {
    browser.runtime.onMessage.addListener(request =>
      setChange(request === 'OpenAddBookmarkCommand')
    );
  }, []);

  return change;
}

export default onTrigger;
