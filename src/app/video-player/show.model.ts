export interface Show {
    lastUpdate: Date;
    name: string;
    id: string;
    numSeasons: number;
    numEps: number;
    thumImgUrl: string;
    state: 'onGoing' | 'finished' | null;
}
