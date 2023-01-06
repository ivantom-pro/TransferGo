from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from django.contrib.auth import get_user_model
from .models import Account,Token

User = get_user_model()

@receiver(post_save, sender=User)
def createAccount(sender, instance, **kwargs):
    if instance.id is not None:
        if not Account.objects.filter(user=instance):
            Account.objects.create(user=instance)
            Token.objects.create(user=instance)