from rest_framework import serializers
from .models import Transaction, Account, Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
            },
            'first_name': {
                'required': True,
            },
            'last_name': {
                'required': True,
            },
        }


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'required': True,
            },
            'pin': {
                'required': True,
            },
            'adress': {
                'required': True,
            },
            'phone': {
                'required': True,
            },
            'birthday': {
                'required': True,
            },
        }

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Profile.objects.create(**validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'


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
