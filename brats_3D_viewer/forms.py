from django.forms import ModelForm
from .models import MRIScan

class MRIScanForm(ModelForm):
    class Meta:
        model = MRIScan
        fields = ['case_id', 't1', 't1ce', 't2', 'flair']