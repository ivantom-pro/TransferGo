from django.contrib import admin
from .models import Profile,Transaction,Account


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'adress', 'birthday')
    search_fields = ('phone', 'adress','birthday')


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('type', 'sender', 'receiver', 'amount')
    search_fields = ('type', 'amount')


class AccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'balance', 'currency')
    search_fields = ('type', 'currency')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Account,AccountAdmin)
