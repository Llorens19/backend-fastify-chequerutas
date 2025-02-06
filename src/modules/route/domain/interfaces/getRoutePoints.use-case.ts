import { ICoordenate } from "@/shared/interfaces/utils/coordinat.interface";

export interface IRotePointsResp {
  points: {
    idRoute: string;
    startCoordinates: ICoordenate
  }[];
  count: number;
}
