import django.dispatch
from django.db import models
from django.urls import reverse

update_student = django.dispatch.Signal()

class Student(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField('register_day',auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("students:detail", kwargs={"student": self.name})

    def update_student_info(self):
        update_student.send(sender=self.__class__, instance=self,created=False,updated=True)
        