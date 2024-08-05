from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('users/register/', views.CreateUserView.as_view(), name='register' ),
    path('token/', TokenObtainPairView.as_view(), name='tokens'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('api=auth/', include('rest_framework.urls')),
]