import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    user_id = event['requestContext']['authorizer']['claims']['sub']
    note_id = event['pathParameters']['noteId']
    
    result = table.get_item(Key={
        'userId': user_id,
        'noteId': note_id
    })
    
    item = result.get('Item')
    if not item:
        return {
            'statusCode': 404,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Note not found'})
        }
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(item)
    }