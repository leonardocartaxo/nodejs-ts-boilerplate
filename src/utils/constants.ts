export default class Constants {
  private static current: Constants;

  // MISC ENVS
  NODE_ENV = process.env.NODE_ENV;
  APP_PORT = process.env.APP_PORT;
  LAMBDA_PORT = process.env.LAMBDA_PORT;
  AUTHENTICATION_TOKEN = process.env.AUTHENTICATION_TOKEN;
  DB_MONGO_URI = process.env.DB_MONGO_URI;

  static () {
    Constants.current = new Constants();
  }

  static getInstance (): Constants {
    if (!Constants.current) {
      Constants.current = new Constants();
    }

    return Constants.current;
  }
}
