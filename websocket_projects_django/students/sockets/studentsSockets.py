import json

import redis
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer


class StudentConsumer(AsyncWebsocketConsumer):


    async def connect(self):
        print('user connectes')
        self.room_name = 'students'
        await self.channel_layer.group_add(self.room_name,self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name,self.channel_name)

    async def add_student(self,event):
        print('create student')
        message = event['message']
        print(message)
        await self.send(text_data=json.dumps({"student":message}))

    async def delete_student(self,event):
        print('delete student')
        message = event['message']
        print(message)
        await self.send(text_data=json.dumps({"student":message}))

    async def updated_student(self,event):
        print('updated student')
        message = event['message']
        print(message)
        await self.send(text_data=json.dumps({"student":message}))




