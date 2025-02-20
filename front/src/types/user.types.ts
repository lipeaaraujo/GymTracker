export type User = {
  id: string,
  name: string,
  email: string,
}

export type AuthType = {
  user: User
  accessToken: string
}

export type RegisterUserType = {
  name: string,
  email: string,
  password: string
}