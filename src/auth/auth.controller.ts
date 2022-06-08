import { Controller, Post, Body, ValidationPipe, UseGuards, Logger, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@src/auth/auth.service';
import { AuthCredentialsDto } from '@src/auth/dto/auth-credential.dto';
import { Role, Roles } from '@src/common/role.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/admin')
  @UseGuards(AuthGuard()) // request에 user 객체 포함
  @Roles(Role.ADMIN)
  admin(@GetUser() user) {
    this.logger.verbose(`Admin ${user.username} trying to access auth controller`);
    console.log('user', user);
  }

  @Get('/user')
  @UseGuards(AuthGuard()) // request에 user 객체 포함
  @Roles(Role.USER)
  user(@GetUser() user) {
    this.logger.verbose(`User ${user.username} trying to access auth controller`);
    console.log('user', user);
  }
}
