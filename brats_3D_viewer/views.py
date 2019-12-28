from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .forms import MRIScanForm
from django.views import View
from .models import MRIScan

# Create your views here.
# def index(request):
#     return HttpResponse('Hello, ready to make a better demo!')

class HomeView(View):
    def get(self, request):
        form  = MRIScanForm()
        scans = MRIScan.objects.all()
        context = {'form': form,
                    'scans': scans}

        return render(request, 'brats_3D_viewer/index.html', context=context)

    def post(self, request):
        form = MRIScanForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            return JsonResponse({'status': 'Success'})
        else:
            return JsonResponse({'status': 'Failed to upload MRI scans.'})

