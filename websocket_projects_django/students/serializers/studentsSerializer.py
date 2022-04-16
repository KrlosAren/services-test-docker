from rest_framework import serializers

from websocket_projects_django.students.models import Student


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student 
        fields = ('pk', 'name', 'email', 'phone','address','age')
