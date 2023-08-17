import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  //@User() es un decorador personalizado
  login(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }

  @Auth()
  @Get('profile')
  async profile(@User() user: UserEntity) {
    return {
      message: 'Petición correcta',
      data: user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}
