from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet, register_user , UserInfoAPIView, HealthCheckView # ✅ Absolute import

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)                          # ✅ Register Task API routes

urlpatterns = [
    path('', HealthCheckView.as_view(), name='health-check'),
    path('', include(router.urls)),                                    # ✅ Now accessible via `/api/tasks/`
    path('tasks/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),           # added recently
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='task-detail'),          # added recently
    path('register/', register_user, name='register'),
    path('user/', UserInfoAPIView.as_view(), name='user-info'),         # ✅ get user info endpoint
]