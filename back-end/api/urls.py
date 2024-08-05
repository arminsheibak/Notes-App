from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('notes', views.NoteViewSet, basename='notes')

urlpatterns = [
    path('users/register/', views.CreateUserView.as_view(), name='register' ),
    path('token/', TokenObtainPairView.as_view(), name='tokens'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('api=auth/', include('rest_framework.urls')),
    path('', include(router.urls))
]