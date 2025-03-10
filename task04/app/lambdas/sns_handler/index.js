exports.handler = async (event) => {
    // Log the received SNS event
    console.log("SNS Event Received:", JSON.stringify(event, null, 2));

    // Process each record in the event
    event.Records.forEach(record => {
        console.log("SNS Message:", record.Sns.Message);
    });

    // Return a response
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};
