import type { AWS } from '@serverless/typescript';
import dynamodbConfig from 'serverless/configs/dynamodbConfig';
import DynamoResources from 'serverless/dynamodb';
import getCustomer from '@functions/getCustomer';

const serverlessConfiguration: AWS = {
  service: 'serverless-offline-with-dynamodb',
  frameworkVersion: '2',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      ENVIRONMENT: '${sls:stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_NAME: '${sls:stage}-customers'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem"
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TABLE_NAME}"
      },
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Scan",
          "dynamodb:Query",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TABLE_NAME}/index/*"
      },
    ]

  },
  functions: { 
    getCustomer
  },
  resources: {
    Resources: {
      ...DynamoResources
    }
  },
  package: { individually: true },
  custom: {
    dynamodb: {
      ...dynamodbConfig
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
