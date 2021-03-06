import { Token, User } from '../../models';

export function auth(accessToken: string, refreshToken: string, profile: any, done: any): any {
  User.findOne({ fb_uid: profile.id }, (err: any, user: any) => {
    if (err) {
      return done(err);
    }
    if (user) {
      done(null, user);
    } else {
      const user: any = new User();
      user.provider = profile.provider;
      user.uid = profile.id;
      user.fb_uid = profile.id;
      user.name = profile.displayName;
      user.first_name = profile._json.first_name;
      user.gender = profile._json.gender;
      user.fb_username = profile._json.username;
      user.email = profile._json.email;
      user.save((err: any) => {
        if (err) {
          throw err;
        }
        else {
          done(null, user);
        }
      });
    }
  });

  Token.update({}, {
    token: accessToken,
    id: profile.id
  }, (err: any, docs: any) => {
    if (err) {
      console.log(err);
    }
  });
}
