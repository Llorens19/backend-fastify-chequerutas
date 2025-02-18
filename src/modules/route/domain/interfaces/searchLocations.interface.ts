import { ILocation } from "@/shared/interfaces/entities/location.interface";

export interface ISearchLocationsInput {
  search: string;
}

export interface ISearchLocationsOutput {
  locations: {value: string, label: string}[];
}