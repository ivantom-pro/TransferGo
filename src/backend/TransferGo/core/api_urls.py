from core.api_views import ProfileViewSet, AccountViewSet, TransactionViewSet, UpdatePasswordViewSet,LoginViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('account', AccountViewSet, basename='account')
router.register('auth/update_password', UpdatePasswordViewSet, basename='update_password')
router.register('auth/sing_in', LoginViewSet, basename='sing_in')
router.register('transactions', TransactionViewSet, basename='transactions')

urlpatterns = router.urls
