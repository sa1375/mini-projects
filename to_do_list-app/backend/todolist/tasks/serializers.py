from rest_framework import serializers
from .models import Task, CustomUser


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # ✅ Shows username but doesn't require input
    class Meta:
        model = Task
        fields = ["id", "title", "description", "completed", "due_date", "created_at", "user", "priority", ]  # ✅ Explicit field list

# ✅This ensures tasks are serialized into JSON format, allowing proper API interaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "first_name", "last_name", "age", "gender", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user