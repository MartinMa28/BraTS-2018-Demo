from django.urls import path

from .views import HomeView, delete_scan, get_scans

urlpatterns = [
    path('', HomeView.as_view(), name='index'),
    path('delete/<int:scan_id>', delete_scan),
    path('scans', get_scans)
]