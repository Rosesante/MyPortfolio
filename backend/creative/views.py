from rest_framework import generics
from .models import CreativeWork
from .serializers import CreativeWorkSerializer


class CreativeWorkListView(generics.ListAPIView):
    queryset = CreativeWork.objects.all()
    serializer_class = CreativeWorkSerializer