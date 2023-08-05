import { PublicAPI } from '@/shared/api';

export const getWeatherByCities = async (cities: Array<string>) => {
  const weatherByCities = cities.map(async (city) => PublicAPI.getWeatherByCity(city)
    .then((data) => data));
  return weatherByCities;
};
