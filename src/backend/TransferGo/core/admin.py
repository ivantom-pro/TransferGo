from django.contrib import admin
from .models import Profile,Transaction,Account


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('type','sender', 'receiver', 'amount')
    search_fields = ('type', 'amount')


class AccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'balance', 'currency')
    search_fields = ('type', 'currency')


admin.site.register(Profile)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Account,AccountAdmin)
