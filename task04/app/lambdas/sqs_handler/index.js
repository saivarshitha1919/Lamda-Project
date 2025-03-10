exports.handler = async (event) => {
    // Log the received SQS event
    console.log("SQS Event Received:", JSON.stringify(event, null, 2));

    // Process each record in the event
    event.Records.forEach(record => {
        console.log("SQS Message Body:", record.body);
    });

    // Return a response
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};
