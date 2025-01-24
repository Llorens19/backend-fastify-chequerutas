import { ICoordenate } from "@/shared/interfaces/utils/coordinat.interface";

export const calculateGradient = (coordinates: ICoordenate[]) => {
  for (const coordinate of coordinates) {
    if (coordinate.length < 3 || coordinate[2] === undefined || coordinate[2] === null) {
      return {
        positiveGradient: null,
        negativeGradient: null,
        cumulativeGradient: null,
      };
    }
  }

  let positiveGradient = 0;
  let negativeGradient = 0;
  let cumulativeGradient = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const altitudeFirstPoint = coordinates[i - 1][2];
    const altitudeSecondPoint = coordinates[i][2];

    if (typeof altitudeFirstPoint === "number" && typeof altitudeSecondPoint === "number") {

      const altitudeRest = altitudeSecondPoint - altitudeFirstPoint;


      if (altitudeRest > 0) {
        positiveGradient += altitudeRest;
      } else {
        negativeGradient += Math.abs(altitudeRest);
      }
      cumulativeGradient += Math.abs(altitudeRest);
    }
  }

  return {
    positiveGradient,
    negativeGradient,
    cumulativeGradient,
  };
}