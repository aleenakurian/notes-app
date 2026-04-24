import json
import boto3
import uuid
from datetime import datetime, timezone

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    user_id = event['requestContext']['authorizer']['claims']['sub']
    body = json.loads(event['body'])
    
    note_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    item = {
        'userId': user_id,
        'noteId': note_id,
        'title': body.get('title', ''),
        'content': body.get('content', ''),
        'createdAt': now,
        'updatedAt': now
    }
    
    table.put_item(Item=item)
    
    return {
        'statusCode': 201,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(item)
    }