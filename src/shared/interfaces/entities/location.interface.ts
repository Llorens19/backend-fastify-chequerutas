import { Locations } from "@/shared/entities/Locations";


export interface ILocation extends Locations{}

export interface ILocations {
  locations: ILocation[];
}