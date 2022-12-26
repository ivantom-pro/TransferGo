from rest_framework import serializers
from .models import Transaction, Account, Profile
from django.contrib.auth import get_user_model
from rest_framework import fields
from rest_framework.serializers import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
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


class LoginSerializer(serializers.Serializer):

    username = fields.CharField(required=True, max_length=120, help_text='User\'s username')
    password = fields.CharField(required=True, max_length=120, help_text='User\'s password')


class PasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(max_length=120, help_text='old password')
    new_password = serializers.CharField(max_length=120, help_text='new password')
    confirm_password = serializers.CharField(max_length=120, help_text='confirmation of the new password')

    class Meta:
        extra_kwargs = {
            'old_password': {'required': True}, 'new_password': {'required': True}, 'confirm_password': {'required': True}}


class ProfileCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'
        extra_kwargs = {
            'user': {
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
            'pin': {
                'read_only': True,
            },
            'deleted_at': {
                'read_only': True,
            }

        }

    def create(self, validated_data):
        user = validated_data.pop('user')
        print(user)
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        user_instance = serializer.save()
        user_instance.set_password(user_instance.password)
        user_instance.save()
        print(user_instance.password)
        validated_data['user'] = user_instance

        profile = Profile(**validated_data)
        profile.user = user_instance
        profile.save()

        return profile


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'
        extra_kwargs = {
            'pin': {
                'write_only': True,
            },
            'deleted_at': {
                'write_only': True,
            }

        }


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Account.objects.create(**validated_data)


class TransactionCreateserializer(serializers.ModelSerializer):
    number = serializers.CharField(max_length=155)

    class Meta:
        model = Transaction
        fields = ('amount', 'type', 'number', 'sender', 'receiver')
        extra_kwargs = {
            'sender': {
                'read_only': True,
            },
            'receiver': {
                'read_only': True,
            },

        }

        def create(self, validated_data):
            validated_data['sender'] = self.context['request'].sender
            return Transaction.objects.create(**validated_data)


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'
