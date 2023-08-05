import { API_KEY, BASE_API } from '../config/weatherApi';

export class PublicAPIClass {
  constructor(
    private readonly baseAPI: string,
    private readonly ApiKey: string,
  ) {
    this.baseAPI = baseAPI;
    this.ApiKey = ApiKey;
  }

  public async getWeatherByCity(cityName: string) {
    return fetch(`${this.baseAPI}q=${cityName}&appid=${this.ApiKey}`)
      .then((response) => response.json())
      .then((data) => data);
  }
}

export const PublicAPI = new PublicAPIClass(BASE_API, API_KEY);
