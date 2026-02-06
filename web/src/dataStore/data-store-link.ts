import { create } from "zustand";
import type { ILink } from "../types/link";

interface DataStoreLink {
  links: ILink[];
  addStoreLink: (newLink: ILink) => void;
  setStoreLinks: (links: ILink[]) => void;
  removeStoreLink: (shortenedLink: string) => void;
  updateAccessLink: (shortenedLink: string, newAccessCount: number) => void;
}

export const useDataStoreLink = create<DataStoreLink>((set) => ({
  links: [],
  addStoreLink: (newLink: ILink) => set((state: DataStoreLink) => ({ links: [...state.links, newLink] })),
  setStoreLinks: (links: ILink[]) => set({ links }),
  removeStoreLink: (shortenedLink: string) => set((state: DataStoreLink) => ({ links: state.links.filter((link: ILink) => link.shortenedLink !== shortenedLink) })),
  updateAccessLink: (shortenedLink: string, newAccessCount: number) => set((state: DataStoreLink) => ({
    links: state.links.map((link: ILink) =>
      link.shortenedLink === shortenedLink ? { ...link, accessCount: newAccessCount } : link
    ),
  })),
}));