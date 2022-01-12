export default class AppConfig {
  private static current: AppConfig;

  // MISC ENVS
  NODE_ENV = process.env.NODE_ENV;
  APP_PORT = process.env.APP_PORT;
  LAMBDA_PORT = process.env.LAMBDA_PORT;
  AUTHENTICATION_TOKEN = process.env.AUTHENTICATION_TOKEN;
  DB_MONGO_URI = process.env.DB_MONGO_URI;

  static () {
    AppConfig.current = new AppConfig();
  }

  static getInstance (): AppConfig {
    if (!AppConfig.current) {
      AppConfig.current = new AppConfig();
    }

    return AppConfig.current;
  }
}
