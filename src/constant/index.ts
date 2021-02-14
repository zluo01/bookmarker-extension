export const HOST_SERVER = 'http://localhost:1234';

export interface IHistory {
  id: number;
  title: string;
}

export interface ITab {
  id: number;
  title?: string;
  url?: string;
  parent?: number;
}

export interface IBookmark {
  id: number;
  type: number;
  parent: number;
  position: number;
  title: string;
  url: string;
  description: string;
}

export interface IFolder {
  id: number;
  title: string;
  last_update: number;
}
