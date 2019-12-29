from django.urls import path

from .views import HomeView, delete_scan, get_scans

app_name = 'brats_3D_viewer'

urlpatterns = [
    path('', HomeView.as_view(), name='index'),
    path('delete/<int:scan_id>', delete_scan, name='delete'),
    path('scans', get_scans, name='get_scans')
]