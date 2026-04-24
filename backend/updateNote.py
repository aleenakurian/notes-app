import json
import boto3
from datetime import datetime, timezone

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    user_id = event['requestContext']['authorizer']['claims']['sub']
    note_id = event['pathParameters']['noteId']
    body = json.loads(event['body'])
    
    now = datetime.now(timezone.utc).isoformat()
    
    result = table.update_item(
        Key={'userId': user_id, 'noteId': note_id},
        UpdateExpression='SET title = :t, content = :c, updatedAt = :u',
        ExpressionAttributeValues={
            ':t': body.get('title', ''),
            ':c': body.get('content', ''),
            ':u': now
        },
        ReturnValues='ALL_NEW'
    )
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result['Attributes'])
    }