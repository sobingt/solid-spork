module.exports = function(){
 var development=  {
  port: 3000,
  db: process.env.MONGODB|| 'mongodb://localhost:27017/demo',
  sessionSecret: process.env.SESSION_SECRET || 'c3423v4g23h23m4b3m44',
  tokenSecret : 'm324u2m3n4uu423mn',
  mandrill: {
    user: process.env.MANDRILL_USER || 'sobingt@gmail.com',
    password: process.env.MANDRILL_PASSWORD || '5_d9MTWZJMHpa2e4pq2Keg'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '566588809382-t7g6gmdik8q6g7mtk5apqmfqs4uiu37j.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'CXbNa-tupJ-_7r9YtvrqEjvo',
    callbackURL: '/auth/google',
    passReqToCallback: true
  },
  github: {
    clientID: process.env.GITHUB_ID || '506f66d607e44defbe0e',
    clientSecret: process.env.GITHUB_SECRET || '0d80bef5a5edde1e9f4faa51bcc2b8f8524c7a48',
    callbackURL: '/auth/github',
    passReqToCallback: true
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || '75ituwm22trpn1',
    clientSecret: process.env.LINKEDIN_SECRET || '9c0Us0LQnewsp1Qd',
    callbackURL: '/auth/linkedin',
    scope: ['r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '631388166902710',
    clientSecret: process.env.FACEBOOK_SECRET || 'ec74db05a1d419605290f408c12ff077',
    callbackURL: '/auth/facebook',
    passReqToCallback: true
  },
  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'y5TiCaCBANoiAvUJF7AccYE7z',
    consumerSecret: process.env.TWITTER_SECRET  || '9L63v7EhMqNKVaqnPe0UKXuwzLxu4iL3GszrErXGcJHS3ziPMr',
    callbackURL: '/auth/twitter',
    passReqToCallback: true
  },
  foursquare: {
    clientId: process.env.FOURSQUARE_ID || 'FOURSQUARE_ID',
    clientSecret: process.env.FOURSQUARE_SECRET || 'FOURSQUARE_SECRET',
    redirectUrl: process.env.FOURSQUARE_REDIRECT_URL || 'http://localhost:3000/auth/foursquare/callback'
  },
  twilio: {
    sid: process.env.TWILIO_SID || 'TWILIO_SID',
    token: process.env.TWILIO_TOKEN || 'TWILIO_TOKEN'
  },
  amazon: {
    accessKeyId: "AKIAIWHGTAKSSBVVQPUQ", 
    secretAccessKey: "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", 
    region: "us-east-1"
  }
   
 };

 switch(process.env.NODE_ENV){
  case 'development':
      return development;
  case 'production':
      return production;
  default:
      return development;
 }
};