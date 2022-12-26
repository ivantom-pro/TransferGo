from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


User = get_user_model()


class Profile(models.Model):
    phone = models.IntegerField()
    birthday = models.DateField()
    adress = models.CharField(max_length=155)
    pin = models.PositiveIntegerField(default=1234)
    created_at = models.DateTimeField(auto_now_add=True )
    deleted_at = models.DateTimeField(blank=True,null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

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
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='account')

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
        if not Account.objects.filter(user=instance):
            Account.objects.create(user=instance)
            Token.objects.create(user=instance)


class Transaction(models.Model):
    class Type(models.TextChoices):
        cash_in = 'cash_in', ('cash_in')
        withdraw = 'withdraw', ('withdraw')
        transfert = 'transfert', ('transfert')

    amount = models.PositiveBigIntegerField()
    type = models.CharField(max_length=155, choices=Type.choices, default=Type.transfert)
    date = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='receiver')

    def __str__(self):
        return f"transaction of {self.sender.user.username} to  {self.receiver.user.username}"

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude)
        if self.sender == self.reciever:
            raise ValidationError(_("You Can't Transfer Money To Your Self"))

        if self.amount > self.sender.balance:
            raise ValidationError({
                "sender": _(
                    "This account is not able to transfer money because the account balance is insufficient! {} > {}".format(
                        self.amount, self.sender.balance))
            })
        if not self.sender.is_commercial():
            raise ValidationError({
                "sender": _("your are not allow to perform the transaction you heve a simple account ")
            })

