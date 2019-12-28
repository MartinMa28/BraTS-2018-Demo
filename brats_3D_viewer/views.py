from django.shortcuts import render
from django.http import HttpResponse
from .forms import MRIScanForm
from django.views import View

# Create your views here.
# def index(request):
#     return HttpResponse('Hello, ready to make a better demo!')

class HomeView(View):
    def get(self, request):
        form  = MRIScanForm()
        context = {'form': form}

        return render(request, 'brats_3D_viewer/index.html', context=context)