from django.http import Http404
from rest_framework import status
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from websocket_projects_django.students.models.Student import Student
from websocket_projects_django.students.serializers.studentsSerializer import (
    StudentSerializer,
)


class StudentsView(RetrieveModelMixin,CreateModelMixin, DestroyModelMixin,ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all().order_by('-created_at')
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        response = super(StudentsView,self).update(request, *args, **kwargs)
        instance = self.get_object()
        instance.update_student_info()
        return response
