import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { Auth } from '../../../decorators/auth.decorator';
import { AuthType } from '../../../enums/auth-type.enum';
import { UserAuthDto } from './dto/user-auth.dto';

const cookieOptions = {
  secure: false,
  httpOnly: true,
  sameSite: true,
};

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() userAuthDto: UserAuthDto,
  ) {
    await this.authService.signUp(userAuthDto);
    const jwt = await this.authService.signIn(userAuthDto);
    response.cookie('accessToken', jwt.accessToken, cookieOptions);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() userAuthDto: UserAuthDto,
  ) {
    const jwt = await this.authService.signIn(userAuthDto);
    response.cookie('accessToken', jwt.accessToken, cookieOptions);
    // Let's think about the need of refresh-tokens
    // response.cookie('refreshToken', jwt.refreshToken, cookieOptions);
  }

  @HttpCode(HttpStatus.OK)
  @Get('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    response.end();
  }

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Get('is-user-logged-in')
  isLoggedIn(): boolean {
    return true;
  }

  // Let's think about the need of refresh-tokens
  // @HttpCode(HttpStatus.OK)
  // @Post('refresh-tokens')
  // async refreshTokens(
  //   @Res({ passthrough: true }) response: Response,
  //   @Body() refreshTokenDto: RefreshTokenDto,
  // ): Promise<void> {
  //   const jwt = await this.authService.refreshTokens(refreshTokenDto);
  //   response.cookie('accessToken', jwt.accessToken, cookieOptions);
  //   response.cookie('refreshToken', jwt.refreshToken, cookieOptions);
  // }
}
