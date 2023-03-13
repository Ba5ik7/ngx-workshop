import { IsEmail, Matches } from 'class-validator';
export class UserAuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @Matches(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/, {
    message: 'Password too weak',
  })
  password: string;
}
