from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class StudentsConfig(AppConfig):
    name = "websocket_projects_django.students"
    verbose_name = _("Students")

    def ready(self):
        try:
            import websocket_projects_django.students.signals  # noqa F401
        except ImportError:
            pass
