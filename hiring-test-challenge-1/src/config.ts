import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config({ path: '.env' });
}

interface PostgresDBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface AWSConfig{
  // Access key and secret are automatically loaded from enviroment variables by AWS SDK.
  // Enviroment variables names must be:
  accessKeyId:string;
  secretAccessKey:string;
  region: string;
  warehouseServiceTopicARN: string;
  warehouseServiceQueueUrl: string;
}

export interface IConfig {
  port: number;
  apiPrefix: string;
  debugLogging: boolean;
  isDevMode: boolean;
  postgresDB: PostgresDBConfig;
  awsConfig: AWSConfig;
}

const isDevMode = process.env.NODE_ENV === 'development';

const config: IConfig = {
  apiPrefix: 'api/v1',
  port: +process.env.PORT || 3005,
  debugLogging: isDevMode,
  isDevMode,
  postgresDB: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    warehouseServiceTopicARN: process.env.AWS_WAREHOUSE_SERVICE_TOPIC_ARN,
    warehouseServiceQueueUrl: process.env.AWS_WAREHOUSE_SERVICE_QUEUE_URL
  },
};

export default config;
