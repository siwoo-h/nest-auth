import { Controller, Post, Body, ValidationPipe, UseGuards, Logger } from '@nestjs/common';
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

  @Post('/test')
  @UseGuards(AuthGuard()) // request에 user 객체 포함
  @Roles(Role.USER, Role.ADMIN)
  test(@GetUser() user) {
    this.logger.verbose(`User ${user.username} trying to access auth controller`);
    console.log('user', user);
  }
}
