import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-vkontakte';

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor() {
    super(
      {
        clientID: '51657569',
        clientSecret: 'zqVO13JxCjXT0hSXyQ8r',
        callbackURL: 'http://localhost:4000/auth/vk/redirect',
        scope: ['profile'],
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ) {
        const user = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          socialKey: profile.username,
        };
        console.log(user);
        return done(null, user);
      },
    );
  }
}
