module.exports = {
  environment: 'development',

  passport: {
    'facebook': {
      'FACEBOOK_APP_ID': '353460018186588',
      'FACEBOOK_APP_SECRET': '30b7175fdb7bbb445cd3cd4b198381c9',
      'CALLBACK_URL': 'http://playlingua.herokuapp.com/auth/facebook/callback'
    },
    'google': {
      'GOOGLE_CONSUMER_KEY': '864648951920-n80hr3gnob47kqu2cmada0cinrm7eair',
      'GOOGLE_CONSUMER_SECRET': 'wml2W1ELHmWtBS3dEDw',
      'GOOGLE_CALLBACK_URL': 'http://playlingua.herokuapp.com/auth/google/callback'
    },
    'twitter': {
      'TWITTER_CONSUMER_KEY': '4BpKSr5FpwixL96vlreK6ANml',
      'TWITTER_CONSUMER_SECRET': '4iJ8K1F3aP3wP4kScseVy7zojjZJ3oXXMIvfmHJXhBS6ClK9xg',
      'TWITTER_CALLBACK_URL': 'http://playlingua.herokuapp.com/auth/twitter/callback'
    },
    'localStrategy': {
      usernameField: 'email',
      passReqToCallback: true
    },
    'localApiStragety': {

    }
  },
  development: {
    'database': 'mongodb://localhost/elaiodb',
    'path': '/app',
    'views': '/app',
    'port': 2000
  },

  production: {
    'path': '/',
    'views': '/dist'
    'database': 'mongodb://heroku_5tw0dl6q:coercion3927@ds011873.mlab.com:11873/heroku_5tw0dl6q'
  },
  url: 'https://elaio.com/',
  secret: 'elaio'
}
