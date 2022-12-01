from core.api_views import ProfileViewSet, AccountViewSet, TransactionViewSet, UpdatePasswordViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('account', AccountViewSet, basename='account')
router.register('update_password', UpdatePasswordViewSet, basename='update_password')
router.register('transactions', TransactionViewSet, basename='transactions')

urlpatterns = router.urls
