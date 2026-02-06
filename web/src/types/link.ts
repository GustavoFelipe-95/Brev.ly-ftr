export interface ILink {
  id: string;
  originalLink: string;
  shortenedLink: string;
  accessCount: number;
}

export interface IShortLinkOutput {
    accessCount: number;
    originalLink: string;
    shortenedLink: string;
}