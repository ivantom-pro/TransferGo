from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from .serializers import ProfileSerializer, AccountSerializer, TransactionSerializer
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
        queryset = Profile.objects.filter(user=self.request.GET.get('user'))
        return queryset

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

        return Response(ProfileSerializer(instance).data, status=201)

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
        instance = serializer.save()
        return Response(ProfileSerializer(instance).data, status=201)

    def destroy(self, request, *args, **kwargs):
        instance: Transaction = self.get_object()
        if instance.user == self.request.user:
            return super().destroy(request, *args, **kwargs)