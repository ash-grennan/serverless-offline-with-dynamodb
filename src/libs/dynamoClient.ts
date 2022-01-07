import { DocumentClient } from 'aws-sdk/clients/dynamodb';


const getClient = (stage: string): DocumentClient => {
    if (stage == "local") {
        return new DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000"
        })
    }
    return new DocumentClient({ region: "eu-west-2"});
}

export default getClient;