from django.db import models
from django.contrib.auth.models import User
from database.models import HDB_data, school_info, preschool_centre

class SavedHDB(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_hdb')
    hdb = models.ForeignKey(HDB_data, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'hdb')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.username} - {self.hdb.block} {self.hdb.street_name}"

class SavedSchool(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_schools')
    school = models.ForeignKey(school_info, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'school')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.username} - {self.school.school_name}"

class SavedPreschool(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_preschools')
    preschool = models.ForeignKey(preschool_centre, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'preschool')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.username} - {self.preschool.centre_name}"