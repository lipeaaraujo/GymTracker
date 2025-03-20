export type User = {
  id: string,
  name: string,
  email: string,
}

export type AuthType = {
  user: User
  accessToken: string
}

export type RegisterUserBody = {
  name: string,
  email: string,
  password: string
}

export type LoginUserBody = {
  email: string,
  password: string
}