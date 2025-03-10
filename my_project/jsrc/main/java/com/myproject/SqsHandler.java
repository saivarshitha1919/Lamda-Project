package com.myproject;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.syndicate.deployment.annotations.lambda.LambdaHandler;
import com.syndicate.deployment.model.RetentionSetting;

import java.util.HashMap;
import java.util.Map;

@LambdaHandler(
    lambdaName = "sqs_handler",
	roleName = "sqs_handler-role",
	isPublishVersion = true,
	aliasName = "${lambdas_alias_name}",
	logsExpiration = RetentionSetting.SYNDICATE_ALIASES_SPECIFIED
)

public class SqsHandler implements RequestHandler<Map<String, Object>, String> {
	@Override
	public String handleRequest(Map<String, Object> event, Context context) {
		List<Map<String, Object>> records = (List<Map<String, Object>>) event.get("Records");
		for (Map<String, Object> record : records) {
			String message = (String) record.get("body");
			context.getLogger().log("Received SQS message: " + message);
		}
		return "Messages processed";
	}
}

