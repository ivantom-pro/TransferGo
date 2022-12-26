from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from .serializers import ProfileSerializer, AccountSerializer, TransactionSerializer, ProfileCreateSerializer, PasswordSerializer, LoginSerializer, UserSerializer,TransactionCreateserializer
from .models import Profile, Account, Transaction
from rest_framework.permissions import IsAuthenticated, AllowAny,IsAuthenticatedOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token

User = get_user_model()


class LoginViewSet(CreateModelMixin,GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(username=username, password=password)
        profil = user.profile
        if user is not None:
            token = user.auth_token.key
            context = {
                'profile': ProfileSerializer(profil).data,
                'Token': token,
            }
            return Response(context)
        else:
            return Response({'detail': 'username or password invalid'}, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordViewSet(CreateModelMixin,GenericViewSet):
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')
        confirm_password = serializer.validated_data.get('confirm_password')

        user = self.request.user
        if not user.check_password(old_password):
            return JsonResponse({'detail': 'the old password does not match'}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return JsonResponse({'detail': 'password is too short; require at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return JsonResponse({'detail': 'confirm password does not match with the new one'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return JsonResponse({'detail': 'password successfully updated'})


@method_decorator(swagger_auto_schema(
    request_body=ProfileSerializer()
), 'create')
class ProfileViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        print(user)
        queryset = Profile.objects.filter(user=user.id)
        return queryset

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method.upper() in ['POST', 'PUT', 'PATCH']:
            return ProfileCreateSerializer
        else:
            return ProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(ProfileSerializer(instance).data, status=201)

    def update(self, request, *args, **kwargs):
        instance: Profile = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are nor allow to update this profile'})

    def partial_update(self, request, *args, **kwargs):
        instance: Profile = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().partial_update(request, *args, **kwargs)
        return Response({'detail': 'you are nor allow to update this profile'})


@method_decorator(swagger_auto_schema(
    request_body=AccountSerializer()
), 'create')
class AccountViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = Account.objects.filter(user=user.id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        return Response(AccountSerializer(instance).data, status=201)


@method_decorator(swagger_auto_schema(
    request_body=TransactionCreateserializer()
), 'create')
class TransactionViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = Transaction.objects.filter(sender=user.account).order_by('-id')
        return queryset

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method.upper() in ['POST', 'PUT', 'PATCH']:
            return TransactionCreateserializer
        else:
            return TransactionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        amount = serializer.validated_data['amount']
        type = serializer.validated_data['type']
        number = serializer.validated_data.pop('number')

        sender = self.request.user.account
        profile = Profile.objects.filter(phone=number).first()
        if profile is None:
            return Response({'detail': 'this number does not match with no one of our users'})

        if profile.user == request.user:
            return Response({'detail':'Sorry, You can\'t make a transaction to your self'})

        serializer.validated_data['sender'] = sender
        receiver = profile.user.account
        serializer.validated_data['receiver'] = receiver

        print(sender.balance)

        if type is Transaction.Type.cash_in:
            # ici on effectue un dépôt
            if sender.balance > amount:
                sender.balance -= amount
                sender.save()
                receiver.balance += amount
                receiver.save()
                instance = serializer.save()
                return Response(TransactionSerializer(instance).data, status=201)
            else:
                return Response({'detail': 'your balance is insufficient to complete this transaction'})
        elif type == Transaction.Type.withdraw:
            # ici on effectue un retrait
            """if serializer.receiver.balance > (serializer.amount + 0.02*serializer.amount):
                serializer.receiver.balance -= serializer.amount + 0.02*serializer.amount
                serializer.sender.balance += serializer.amount
                instance = serializer.save()
            else:
                instance = serializer.errors"""
            pass
        else:
            # ici on effectue une transaction
            if sender.balance > (amount + 0.1*amount):
                sender.balance -= amount + 0.1*amount
                sender.save()
                receiver.balance += amount
                receiver.save()
                instance = serializer.save()
                return Response(TransactionSerializer(instance).data, status=201)
            else:
                return Response({'detail': 'your balance is insufficient to complete this transaction'})

