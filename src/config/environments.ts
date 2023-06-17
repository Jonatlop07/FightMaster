export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'local.env';
    case 'test':
      return 'test.env';
    case 'production':
      return 'prod.env';
    default:
      return 'local.env';
  }
}
