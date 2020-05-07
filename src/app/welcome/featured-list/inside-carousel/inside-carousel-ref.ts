export interface Data {
  header: string;
  subheader: string;
  showId: string;
}

export class InsideCarouselRef {
  constructor(public data: Data) {}
}
