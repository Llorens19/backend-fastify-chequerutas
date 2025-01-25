export interface IEditRouteParams {
  id: string;
}

export interface IEditRouteInput {
  idRoute?: string;
  title?: string;
  description?: string;
  level?: string;
  idCategory?: string;
  isPublic?: boolean;
  location?: string;
}