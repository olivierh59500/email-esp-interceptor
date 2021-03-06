function int(str) {
  if (!str) {
    return 0;
  }
  return parseInt(str, 10);
}

const config = exports;

config.NODE_ENV = process.env.NODE_ENV || 'development';
config.port = int(process.env.PORT, 10) || 4444;

// Service Hosts
config.dbURL = process.env.MONGOHQ_URL || 'mongodb://localhost/ft-email-esp-interceptor-dev';
config.sentryDSN = process.env.SENTRY_DSN;
config.campaignsHost = process.env.CAMPAIGNS_HOST || 'https://email-webservices.ft.com/campaigns';
config.sendServiceHost = process.env.SEND_SERVICE_HOST || 'https://email-webservices.ft.com';
config.espHost = process.env.ESP_HOST || 'https://ft.sparkpostelite.com';

// Security and Auth
config.campaignsUsername = process.env.CAMPAIGNS_USERNAME || 'development';
config.campaignsPassword = process.env.CAMPAIGNS_PASSWORD || 'development';
config.sendServiceAuth = process.env.SEND_SERVICE_AUTH;
config.testSendServiceAuth = process.env.TEST_SEND_SERVICE_AUTH;
config.espAuth = process.env.ESP_AUTH;
config.espReadAuth = process.env.ESP_READ_AUTH;

// Config Variables
config.logLevel = process.env.LOG_LEVEL || 'info';

// Basic auth
config.authUser = process.env.AUTH_USER || 'development';
config.authPassword = process.env.AUTH_PASSWORD || 'development';

if (config.NODE_ENV === 'test') {
  config.port = 3000;
  config.dbURL = 'mongodb://localhost/ft-email-esp-interceptor-test';
}
