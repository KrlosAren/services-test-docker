import json

import redis
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from websocket_projects_django.students.models import Student
from websocket_projects_django.students.serializers import StudentSerializer

re = redis.Redis(host='redis',port=6379,db=0)

@receiver(post_save, sender=Student)
def hear_signal(sender , instance , **kwargs):
    if kwargs.get('created'):
      print('se creo un nuevo students')

      serializer = StudentSerializer(instance)
      # re.publish('students', json.dumps(serializer.data))
      channel_layer = get_channel_layer()
      print('enviado data desde el signal created')
      data = serializer.data
      data['typeAction'] = 'created'
      async_to_sync(channel_layer.group_send)('students',{"type":'add_student',"message":data})
    return

@receiver(post_delete, sender=Student)
def delete_signal(sender , instance , **kwargs):
    print('se elimino un students')
    # re.publish('students', json.dumps(serializer.data))
    print('enviado data desde el signal delete')
    channel_layer = get_channel_layer()
    serializer = StudentSerializer(instance)
    data = serializer.data
    data['typeAction'] = 'deleted'
    async_to_sync(channel_layer.group_send)('students',{"type":'delete_student',"message":data})
    return

@receiver(post_save, sender=Student)
def updated_signal(sender , instance , **kwargs):
    if not kwargs.get('created'):
      print('se actualizo un students')
      print('enviado data desde el signal update')
      # re.publish('students', json.dumps(serializer.data))
      channel_layer = get_channel_layer()
      serializer = StudentSerializer(instance)
      data = serializer.data
      data['typeAction'] = 'updated'
      async_to_sync(channel_layer.group_send)('students',{"type":'updated_student',"message":data})
    return
