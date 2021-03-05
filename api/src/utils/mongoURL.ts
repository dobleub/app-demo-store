import appconfig from '../app.config'

const host = appconfig.DB_HOST;
const port = appconfig.DB_PORT;
const db = appconfig.DB_DATA;
const dbAuth = appconfig.DB_AUTH;
const user = appconfig.DB_USER;
const password = appconfig.DB_PASS;
const mechanism = appconfig.DB_AUTH_MECHANISM;

const mongoURL = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=${dbAuth}&authMechanism=${mechanism}`;

export default mongoURL;