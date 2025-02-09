export interface IEditProfileInput {
  img_user?: string;
  name?: string;
  surname?: string;
  birthdate?: string;
  bio?: string;
  password?: string;
  client?: {
    phone?: string;
  };
  admin?: {
  };
}