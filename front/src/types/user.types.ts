export type User = {
  id: string,
  name: string,
  email: string,
}

export type AuthType = {
  user: User
  accessToken: string
}