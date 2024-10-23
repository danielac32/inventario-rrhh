import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto }  from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../db-connections/prisma.service';
import {User} from './interface/user.interface'



@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}


  async create(createAuthDto: CreateAuthDto) {
        const { password, ...userData } = createAuthDto;
        let user = await this.prisma.userEntity.findFirst({
                  where: {
                          email: userData.email
                  }
        });
        if(user){
           throw new ConflictException('User already exist');
        }
        try{
            const newUser = await this.prisma.userEntity.create({
                    data:{
                        ...userData,
                        password:bcrypt.hashSync( password, 10 )
                    }
            });
            delete newUser.password;
            return {
              message: "User has been created successfully",
              newUser
            }
        } catch (error) {
            throw new HttpException('Error creating user', 500);
        }
  }

  

  async findAll() {
      const users = await this.prisma.userEntity.findMany();
      return{
        users
      }
  }

  private async getUser(id:string):Promise<User> {
      let user;
        // Verifica si el término es un correo electrónico
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
            user = await this.prisma.userEntity.findFirst({
                where: {
                        email: id
                }
            });
        }
        if (!user) {
            const userId = Number(id);
            if (!isNaN(userId)) {
              user = await this.prisma.userEntity.findFirst({
                where: {
                  id: userId
                }
              });
            }
        }
        return user;
  }

  async findOne(id: string) {
        const user= await this.getUser(id);
        if(!user)throw new NotFoundException(`Entity with ID ${id} not found`);
        return {
            user
        }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user= await this.getUser(id);
    if(!user)throw new NotFoundException(`Entity with ID ${id} not found`);
    const {password,...userData}=updateAuthDto
 
    let tempData: UpdateAuthDto=null;
    let hashPassword=null;

    if(password){
       hashPassword = bcrypt.hashSync( password, 10 );
       tempData={password:hashPassword,...userData};
    }else{
       tempData={...userData};
    }
    const updatedUser = await this.prisma.userEntity.update({
        where: {
          email: user.email
        },
        data:{
          ...tempData
        }
    });
    delete updatedUser.password;
    return {updatedUser};
  }

  async remove(id: string) {
    const user= await this.getUser(id);
    if(!user)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedUser = await this.prisma.userEntity.delete({
      where: {
        email: user.email
      },
    });
    delete deletedUser.password;
    return {deletedUser}
  }

  async login( loginUserDto: LoginUserDto ) {
    const { email, password } = loginUserDto;
    let user;
    user = await this.prisma.userEntity.findFirst({
        where: {
                email: email
        }
    });
    if(!user)
      throw new NotFoundException(`${email} not found`);

    if( !bcrypt.compareSync(password, user.password) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;
    
    const payload={ id: user.id, name:user.name };

    const token= await this.jwtService.sign(payload)

    return{
       status: HttpStatus.OK,
       user,
       token
    }
  }
}
