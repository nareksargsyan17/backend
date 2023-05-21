import { Body, Controller, Get, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUser } from './dto/create.user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUser } from './dto/login.user.dto';
import { Response, Request, response } from 'express';
import { GoogleAuthGuard } from './Strategy/Google/Guards';
import { DetailsUser } from './dto/loginWith.social.dto';


@Controller("auth")
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() createUser : CreateUser) {
    return await this.userService.register(createUser);
  }

  @Post("login")
  async login(
    @Body() loginUser : LoginUser,
    @Res({passthrough:true}) response:Response
    ){
      return await this.userService.login(loginUser, response)
  }


  @Get('getUser')
  async getUser(@Body('id') id: number, @Req() request: Request): Promise<any> {
    return await this.userService.getUser(id, request)
  }



  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req: Request, @Res({passthrough : true}) response : Response) {
    const user :  any  = req.user;
    await this.userService.validateUser(user);
    await this.userService.forJwt(user, response)
    return user
  }
}
