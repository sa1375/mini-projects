from django.shortcuts import render
from rest_framework import viewsets, serializers
from .models import Task, CustomUser
from .serializers import TaskSerializer, UserSerializer 
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes        #permission classes adds permission to register
from rest_framework.permissions import AllowAny         # allow anyone to register 
# ---------------------------------------------------------------------------
from rest_framework.views import APIView

# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]  # ✅ Users must be authenticated

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)  # ✅ Show only tasks belonging to the logged-in user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ✅ Ensure new tasks are assigned to the user


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to register
def register_user(request):
    try:
        data = {
            'username': request.data.get('username'),
            'email': request.data.get('email'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'age': request.data.get('age'),
            'gender': request.data.get('gender'),
            'password': request.data.get('password')
        }

                # Validate required fields
        if not all([data['username'], data['email'], data['password']]):
            return Response(
                {'error': 'Username, email, and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if username exists
        if CustomUser.objects.filter(username=data['username']).exists():
            return Response(
                {'error': 'Username already taken'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if email exists
        if CustomUser.objects.filter(email=data['email']).exists():
            return Response(
                {'error': 'Email already in use'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        # Use the serializer to create the user
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {'message': f'User {user.username} registered successfully'}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Registration error: {str(e)}")  # Add this for debugging
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

# Existing Task views remain unchanged...

# New endpoint to get user information
class UserInfoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # This will be an instance of CustomUser
        user_data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "age": user.age,
            "gender": user.gender,
        }
        return Response(user_data, status=status.HTTP_200_OK)



class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "OK"}, status=status.HTTP_200_OK)