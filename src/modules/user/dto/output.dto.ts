export class GetUserDTO {
  username: string
  email: string
}

export class LoggedInDTO {
  accessToken: string
  username: string
  email: string
  phone: string
  bio: string
  avatar: string
}
