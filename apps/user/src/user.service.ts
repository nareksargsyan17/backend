import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';
import {DetailsUser} from "./dto/loginWith.social.dto"
import { CreateUser } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response} from 'express';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository : Repository<User>,
    private jwtService : JwtService
    ){}
  async register(createUser : CreateUser) {
    console.log(createUser);
    if(!await this.userRepository.findOne({where:{email:createUser.email}})){
      createUser.password = await bcrypt.hash(createUser.password, 12);//password hashing
      try{
        await this.userRepository.save(createUser);
        return "You are succesfully registered"
      }catch(e){
        
        return e;
      }
  }else{
      return "Email is allready exist"
    }
  }

  async forJwt(data : any, response : Response){
    const jwt = await this.jwtService.signAsync({id : data.id, role: data.role})
    response.cookie("jwt", jwt, {httpOnly : true})
    return jwt
  }

  async login(loginUser : LoginUser, response : Response){
    try{
      const data = await this.userRepository.findOne({where : {email : loginUser.email}})
      if(await bcrypt.compare(loginUser.password, data.password)){
        return await this.forJwt(data, response)
      }else{
        return "wrong password!!!"
      }
      
    }catch{
      return "wrong email"
    }
  }


  async validateUser(details: DetailsUser) {
    let user = await this.userRepository.findOneBy({ gKey: details.gKey});
    if (!user){
      console.log('User not found. Creating...');
      user = await this.userRepository.save(details);;
    }
    const {password, ...data} = user
    return data
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async getUser( id : number, request : Request){
    try {
      const jwt: any = this.jwtService.decode(request.cookies['jwt']); //decoding jwt token
      if (id && jwt.role) {
        const { password, ...user} = await this.userRepository.findOne({
          where : {id}
        })
        return user; //get user from admin
      } else if (jwt.id) {
        const {password, ...user} = await this.userRepository.findOne({
          where : {id : jwt.id},
        });
        return user; // get user
      } else {
        return 'not found user';
      }
    } catch (e) {
      return 'user is logouted';
    }
  }
}
