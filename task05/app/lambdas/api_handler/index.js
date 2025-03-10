const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;  // Get table name from env variable

exports.handler = async (event) => {
    try {
        // Parse the request body (API Gateway sends it as a string)
        const requestBody = JSON.parse(event.body);

        // Validate input
        if (!requestBody.principalId || !requestBody.content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields: principalId or content" })
            };
        }

        // Create the event object
        const newEvent = {
            id: uuidv4(),  // Generate unique ID
            principalId: requestBody.principalId,  // Integer from request
            createdAt: new Date().toISOString(),  // Current timestamp in ISO 8601 format
            body: requestBody.content  // Store content from request
        };

        // Save the event to DynamoDB
        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: newEvent
        }).promise();

        // Return the correct response format
        return {
            statusCode: 201,  // Correct status code for creation
            body: JSON.stringify({ event: newEvent })  // Return the created event
        };

    } catch (error) {
        console.error("Error saving event:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
