from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    created_at = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Todo
        fields = ['id', 'title', 'user', 'user_id', 'created_at', 'completed']