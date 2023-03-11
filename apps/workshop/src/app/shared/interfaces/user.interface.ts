export interface IUser {
  _id?: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  accessToken?: string,
  refreshToken?: string
}
