import { HOST_SERVER } from '../constant';
import querystring from 'querystring';

export function checkBookmarkExist(
  title?: string,
  url?: string
): Promise<Response> {
  return fetch(
    `${HOST_SERVER}/api/extension/check?${querystring.stringify({
      title: title,
      url: url,
    })}`
  );
}
