import type { AWS } from '@serverless/typescript'

const DynamoResources: AWS['resources']['Resources'] = {
    configurationTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${sls:stage}-customers',
            Tags: [
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'customerId',
                    AttributeType: 'S'
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'customerId',
                    KeyType: 'HASH',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST'
        }
    }
}

export default DynamoResources;