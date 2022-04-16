from django.urls import re_path

from websocket_projects_django.students.sockets.studentsSockets import StudentConsumer

websocket_urlpatterns = [
    re_path(r'^students/$', StudentConsumer.as_asgi()),
]
