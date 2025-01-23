import { ICoordenate } from "../interfaces/utils/coordinat.interface";

export const calculateDistance = (coordinates: ICoordenate[]): number => {
  const radEarth = 6371000
  let distance = 0;

  for (let indice = 0; indice < coordinates.length - 1; indice++) {
    const [latStart, longStart] = coordinates[indice];
    const [latEnd, longEnd] = coordinates[indice + 1];

    const latStartRads = (latStart * Math.PI) / 180;
    const latEndRads = (latEnd * Math.PI) / 180;
    const difLat = ((latEnd - latStart) * Math.PI) / 180;
    const difLong = ((longEnd - longStart) * Math.PI) / 180;

    const haversine =
      Math.sin(difLat / 2) * Math.sin(difLat / 2) +
      Math.cos(latStartRads) *
      Math.cos(latEndRads) *
      Math.sin(difLong / 2) *
      Math.sin(difLong / 2);
    const angCent =
      2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    const distanceBetweenPoints = radEarth * angCent;

    distance += distanceBetweenPoints;
  }

  return distance / 1000;
}