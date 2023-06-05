import { Controller } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUser } from './dto/create.user.dto';
import { EventPattern } from '@nestjs/microservices';
import { LoginUser } from './dto/login.user.dto';
import { DetailsUser } from './dto/loginWith.social.dto';


@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @EventPattern("auth/register")
  async register(createUser : CreateUser) {
    console.log(createUser);
    return await this.userService.register(createUser);
  }

  @EventPattern("auth/login")
  async login(loginUser : LoginUser){
    console.log(loginUser);
    return await this.userService.login(loginUser)
  }


  @EventPattern('auth/getUser')
  async getUser(data : {id: number, cookie: string}): Promise<any> {
    const {id, cookie} = data;
    return await this.userService.getUser(id, cookie)
  }

  @EventPattern('auth/:id/comments')
	async getComments(id : number){
		return await this.userService.getComments(id);
	}



  @EventPattern('auth/google/login')
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // auth/google/redirect
  @EventPattern('auth/google/redirect')
  async handleRedirect(user : DetailsUser) {
    const data = await this.userService.validateUser(user);
    let jwt = await this.userService.forJwt(data)
    return jwt
  }


  @EventPattern('auth/vk/login')
  vkLogin() {
    return { msg: 'vk Authentication' };
  }

  // api/auth/vk/redirect
  @EventPattern('auth/vk/redirect')
  async vkRedirect(user : DetailsUser) {
    const data = await this.userService.validateUser(user);
    let jwt = await this.userService.forJwt(data)
    return jwt
  }
}
