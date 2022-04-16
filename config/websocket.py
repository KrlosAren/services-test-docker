import json
import time

import redis

re = redis.Redis(host='redis',port=6379,db=0)

async def websocket_application(scope, receive, send):
    while True:
        event = await receive()

        if event["type"] == "websocket.connect":
            await send({"type": "websocket.accept"})

        if event["type"] == "websocket.disconnect":
            break

        if event["type"] == "websocket.receive":
            if event["text"] == "ping":
                await send({"type": "websocket.send", "text": json.dumps({"message": "pong"})})

            if event['text'] == 'student':
                subs = re.pubsub()
                subs.subscribe('student')
                print('subscribing')
                await send({"type":"websocket.send","text":"1"})
