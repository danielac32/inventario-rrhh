import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto }  from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interface/valid-roles';
import { RolesGuard } from './roles.guard'



@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }

  @UseGuards(JwtAuthGuard)
  @RoleProtected( ValidRoles.admin )
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }


  @UseGuards(JwtAuthGuard,RolesGuard)
  @RoleProtected( ValidRoles.admin )
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @RoleProtected( ValidRoles.admin )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  

  @UseGuards(JwtAuthGuard)
  @RoleProtected( ValidRoles.admin )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }


  @UseGuards(JwtAuthGuard)
  @RoleProtected( ValidRoles.admin )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
