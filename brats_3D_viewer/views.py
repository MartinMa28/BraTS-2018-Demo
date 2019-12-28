from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .forms import MRIScanForm
from django.views import View
from .models import MRIScan
from django.views.decorators.csrf import csrf_exempt

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
    
    
@csrf_exempt
def delete_scan(request, scan_id):
    if request.method == 'DELETE':
        try:
            scan_instance = MRIScan.objects.get(pk=scan_id)
        except MRIScan.DoesNotExist:
            scan_instance = None

        if scan_instance:
            scan_instance.delete()

            return JsonResponse({'status': 'Deleted successfully.'})
        else:
            return JsonResponse({'status': "The target doesn't exist."})
    else:
        return JsonResponse({'status': 'Please use HTTP DELETE method.'})

def get_scans(request):
    scans = MRIScan.objects.all()
    scans = tuple(map(lambda s: (s.case_id, s.id), scans))

    return JsonResponse({'scans': scans})




