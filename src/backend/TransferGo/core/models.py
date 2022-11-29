from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

User = get_user_model()


class Profile(models.Model):
    pin = models.PositiveIntegerField(default=1234)
    adress = models.CharField(max_length=255)
    phone = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True )
    deleted_at = models.DateTimeField(blank=True,null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    birthday = models.DateField()

    def __str__(self):
        return f"profile of {self.user.username}"


class Account(models.Model):
    class Type(models.TextChoices):
        simple = 'simple', ('simple')
        commercial = 'commercial', ('commercial')

    class Currency(models.TextChoices):
        dolar = 'dolar', ('dolar')
        cfa = 'cfa', ('cfa')
        euro = 'euro', ('euro')
    balance = models.PositiveBigIntegerField(default=0)
    currency = models.CharField(max_length=255, choices=Currency.choices, default=Currency.cfa)
    type = models.CharField(max_length=255, choices=Type.choices, default=Type.simple)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"account of {self.user.username}"

    def is_commercial(self):
        if self.type == Transaction.Type.commercial:
            return True
        else:
            return False


@receiver(post_save, sender=User)
def createAccount(sender, instance, **kwargs):
    if instance.id is not None:
        Account.objects.create(user=instance)


class Transaction(models.Model):
    class Type(models.TextChoices):
        cash_in = 'cash_in', ('cash_in')
        withdraw = 'withdraw', ('withdraw')
        transfert = 'transfert', ('transfert')

    amount = models.PositiveBigIntegerField()
    type = models.CharField(max_length=155, choices=Type.choices, default=Type.transfert)
    date = models.DateTimeField(auto_created=True)
    sender = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='send')
    receiver = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='receive')

    def __str__(self):
        return f"transaction of {self.sender.username} to  {self.receiver.username}"
