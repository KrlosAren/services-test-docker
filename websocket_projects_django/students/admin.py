from django.contrib import admin

from websocket_projects_django.students.models.Student import Student


class StuedentAdmin(admin.ModelAdmin):
    pass
admin.site.register(Student, StuedentAdmin)
