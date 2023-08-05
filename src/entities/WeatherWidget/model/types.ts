export type Stats = {
  wind: {
    speed: number,
    deg: number,
  };
  pressure: number;
  visibility: number;
  humidity: number;
}

export type MegaProps = {
  stats: Stats,
  obj: string,
}

export type City = {
  name: string,
  id: string,
}

export type Cities = Array<City>;
