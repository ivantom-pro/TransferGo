from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from .serializers import ProfileSerializer, AccountSerializer, TransactionSerializer, ProfileCreateSerializer
from .models import Profile, Account, Transaction
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator


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
