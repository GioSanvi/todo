from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
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


class TodosDelete(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        todo = Todo.objects.filter(pk=kwargs['pk'], user=self.request.user)
        if todo.exists():
            self.destroy(request, *args, **kwargs)
            return JsonResponse({'message': 'todo deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return JsonResponse({'error': 'todo does not exist'}, status=status.HTTP_400_BAD_REQUEST)


class TodosComplete(generics.UpdateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        todo = get_object_or_404(Todo, pk=kwargs['pk'], user=self.request.user)
        if todo is not None:
            todo.completed = not todo.completed
            todo.save()
            return JsonResponse({'message': 'todo completed'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return JsonResponse({'error': 'todo does not exist'}, status=status.HTTP_400_BAD_REQUEST)


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



