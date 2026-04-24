import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    user_id = event['requestContext']['authorizer']['claims']['sub']
    
    result = table.query(
        KeyConditionExpression=Key('userId').eq(user_id)
    )
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result['Items'])
    }