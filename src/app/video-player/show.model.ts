export interface Show {
    lastUpdate: Date;
    name: string;
    id: string;
    numSeasons: number;
    numEps: number;
    thumImgUrl: string;
    state: 'onGoing' | 'finished' | null;
    bannerImgUrl?: string;
}

export interface Season {
  name: string;
  id: string;
  numEps: number;
  showId: string;
  lastUpdate: Date;
}

export interface Ep {
  name: string;
  id: string;
  showId: string;
  seasonId: string;
  idx: number;
  lastUpdate: Date;
}