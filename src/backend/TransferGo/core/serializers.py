from rest_framework import serializers
from .models import Transaction, Account, Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        Account.objects.create(user=validated_data['user'])
        return Profile.objects.create(**validated_data)


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Account
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Account.objects.create(**validated_data)


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'

        def create(self, validated_data):
            validated_data['sender'] = self.context['request'].sender
            return Transaction.objects.create(**validated_data)
