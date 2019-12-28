from django.db import models

# Create your models here.
class MRIScan(models.Model):
    case_id = models.CharField(max_length=50, unique=True)
    
    # files will be uploaded to MEDIA_ROOT/scans
    t1 = models.FileField(upload_to='scans')
    t1ce = models.FileField(upload_to='scans')
    t2 = models.FileField(upload_to='scans')
    flair = models.FileField(upload_to='scans')

    def __str__(self):
        return self.case_id

    def delete(self, *args, **kwargs):
        # delete the uploaded files before calling
        # the base class's delete method
        self.t1.delete()
        self.t1ce.delete()
        self.t2.delete()
        self.flair.delete()

        super().delete(*args, **kwargs)

