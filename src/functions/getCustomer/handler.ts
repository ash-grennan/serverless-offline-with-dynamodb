import { badRequestResponse, formatJSONResponse, notFoundResponse } from '@libs/apiGateway';
import getClient from '@libs/dynamoClient';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';


const getCustomer = async (event): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters.id) {
    return badRequestResponse();
  }

  console.log(process.env.ENVIRONMENT)
  const dbClient = getClient(process.env.ENVIRONMENT);
  const params = {
    Key: {
      "customerId": event.pathParameters.id
    },
    TableName: process.env.TABLE_NAME,
  }
  try {
    const result = await dbClient.get(params).promise();
    if (!result?.Item) {
      return notFoundResponse();
    }

    return formatJSONResponse(result.Item);
  }
  catch (err) {
    console.log(err);
    return badRequestResponse();
  }
}

export const main = middyfy(getCustomer);
