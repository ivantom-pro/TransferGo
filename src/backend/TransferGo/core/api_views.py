from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from .serializers import ProfileSerializer, AccountSerializer, TransactionSerializer, ProfileCreateSerializer, PasswordSerializer, LoginSerializer, UserSerializer
from .models import Profile, Account, Transaction
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout
from rest_framework import status
from rest_framework.authtoken.models import Token

User = get_user_model()


class LoginViewSet(GenericViewSet):
    def sing_in(self):
        serializer = LoginSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get_or_create(user=user).first()
            print(f"token {token.key}")
            return Response(UserSerializer(user).data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordViewSet(UpdateModelMixin, GenericViewSet):
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')
        confirm_password = serializer.validated_data.get('confirm_password')

        user = request.user
        if not user.check_password(old_password):
            return Response({'detail': 'the old password don\'t match'}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
                return Response({'detail': 'password is too short; require at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'detail': 'password don\'t match'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'detail': 'password successfully updated'})


@method_decorator(swagger_auto_schema(
    request_body=ProfileSerializer()
), 'create')
class ProfileViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Profile.objects.filter(user=self.request.user)
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
        if instance.user == self.request.user:
            return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        instance: Profile = self.get_object()
        if instance.user == self.request.user:
            return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance: Profile = self.get_object()
        if instance.user == self.request.user:
            return super().destroy(request, *args, **kwargs)


@method_decorator(swagger_auto_schema(
    request_body=AccountSerializer()
), 'create')
class AccountViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Account.objects.get(user=self.request.GET.get('user'))
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        return Response(AccountSerializer(instance).data, status=201)

    def update(self, request, *args, **kwargs):
        instance: Account = self.get_object()
        if instance.user == self.request.user:
            return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        instance: Account = self.get_object()
        if instance.user == self.request.user:
            return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance: Account = self.get_object()
        if instance.user == self.request.user:
            return super().destroy(request, *args, **kwargs)


@method_decorator(swagger_auto_schema(
    request_body=TransactionSerializer()
), 'create')
class TransactionViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Transaction.objects.filter(sender=self.request.GET.get('account')).order_by('id')
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.type == Transaction.Type.cash_in:
            # ici on effectue un dépôt
            if serializer.sender.balance > serializer.amount:
                serializer.sender.balance -= serializer.amount
                serializer.receiver.balance += serializer.amount
                instance = serializer.save()
            else:
                instance = serializer.errors
        elif serializer.type == Transaction.Type.withdraw:
            # ici on effectue un retrait
            if serializer.receiver.balance > (serializer.amount + 0.02*serializer.amount):
                serializer.receiver.balance -= serializer.amount + 0.02*serializer.amount
                serializer.sender.balance += serializer.amount
                instance = serializer.save()
            else:
                instance = serializer.errors
        else:
            # ici on effectues une transaction
            if serializer.sender.balance > (serializer.amount + 0.1*serializer.amount):
                serializer.sender.balance -= serializer.amount + 0.1*serializer.amount
                serializer.receiver.balance += serializer.amount
                instance = serializer.save()
            else:
                instance = serializer.errors
        return Response(TransactionSerializer(instance).data, status=201)

    def destroy(self, request, *args, **kwargs):
        instance: Transaction = self.get_object()
        if instance.user == self.request.user:
            return super().destroy(request, *args, **kwargs)
