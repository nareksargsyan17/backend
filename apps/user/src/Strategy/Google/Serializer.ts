import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { DetailsUser } from '../../dto/loginWith.social.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: DetailsUser, done: Function) {
    console.log('Serializer User');
    console.log(user);
    done(null, user);
  }
  deserializeUser(payload: any, done: Function) {
    done(null, null);
  }
}
