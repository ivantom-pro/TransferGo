from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    pin = models.PositiveIntegerField(default=0000)
    adress = models.CharField(max_length=255)
    phone = models.IntegerField()
    created_at = models.DateTimeField(auto_created=True)
    deleted_at = models.DateTimeField(blank=True,null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    birthday = models.DateField()

    def __str__(self):
        return f"profile of {self.user.username}"


class Account(models.Model):
    balance = models.PositiveBigIntegerField(default=0)
    currency = models.CharField(max_length=255)
    statut = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"account of {self.user.username}"


class Transaction(models.Model):
    amount = models.PositiveBigIntegerField()
    type = models.CharField(max_length=255)
    date = models.DateTimeField(auto_created=True)
    sender = models.OneToOneField(User, on_delete=models.CASCADE, related_name='send')
    receiver = models.OneToOneField(User, on_delete=models.CASCADE,related_name='receive')

    def __str__(self):
        return f"transaction of {self.sender.username} to  {self.receiver.username}"
