export interface IEditRouteParams {
  id: string;
}

export interface IEditRouteInput {
  idRoute?: string;
  title?: string;
  description?: string;
  level?: number;
  idCategory?: string;
  isPublic?: boolean;
  idLocation?: string;
}