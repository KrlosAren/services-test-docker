"""
ASGI config for websocket_projects_django project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/dev/howto/deployment/asgi/

"""
import os
import sys
from pathlib import Path

from django.core.asgi import get_asgi_application

from websocket_projects_django.students.sockets.studentsSockets import StudentConsumer

# This allows easy placement of apps within the interior
# websocket_projects_django directory.
ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(ROOT_DIR / "websocket_projects_django"))

# # If DJANGO_SETTINGS_MODULE is unset, default to the local settings
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

# # This application object is used by any ASGI server configured to use this file.
# django_application = get_asgi_application()
# # Apply ASGI middleware here.
# # from helloworld.asgi import HelloWorldApplication
# # application = HelloWorldApplication(application)

# # Import websocket application here, so apps from django_application are loaded first
# from config.websocket import websocket_application  # noqa isort:skip


# async def application(scope, receive, send):
#     if scope["type"] == "http":
#         await django_application(scope, receive, send)
#     elif scope["type"] == "websocket":
#         await websocket_application(scope, receive, send)
#     else:
#         raise NotImplementedError(f"Unknown scope type {scope['type']}")



import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.conf.urls import url
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
django_asgi_app = get_asgi_application()

from websocket_projects_django.students.socket_routing import (
    websocket_urlpatterns as students_sockets,
)

application = ProtocolTypeRouter({
  "http": django_asgi_app,
  "websocket":
        AuthMiddlewareStack(
            URLRouter([
            url(r"^student/$", StudentConsumer.as_asgi()),
            ]
        )
    ),
})
