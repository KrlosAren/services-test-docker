from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from websocket_projects_django.students.views.StudentsView import StudentsView
from websocket_projects_django.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("students", StudentsView)

app_name = "api"
urlpatterns = router.urls
