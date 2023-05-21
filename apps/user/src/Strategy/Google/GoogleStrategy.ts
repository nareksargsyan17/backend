import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
  ) {
    super({
      clientID: '700983029898-o0srv3kclftr3oocphool2h206celaot.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3020/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done : VerifyCallback) {
    const user = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      gKey : profile.id
    }
    done(null, user)
  }
}