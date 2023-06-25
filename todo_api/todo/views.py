from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from .models import Todo
from .serializers import TodoSerializer


# Todos routes
class Todos(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Auth routes
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        body = JSONParser().parse(request)
        try:
            username = body['username']
            password = body['password']
            try:
                user = User.objects.create_user(username=username, password=password)
                user.save()

                token = Token.objects.create(user=user)
                return JsonResponse({'token': str(token), 'username': user.get_username()}, status=status.HTTP_200_OK)
            except IntegrityError:
                return JsonResponse({'error': 'user already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Please enter a username or password'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)



