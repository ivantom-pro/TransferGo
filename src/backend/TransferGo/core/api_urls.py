from core.api_views import ProfileViewSet, AccountViewSet, TransactionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('Profile', ProfileViewSet, basename='profile')
router.register('account', AccountViewSet, basename='account')
router.register('transactions', TransactionViewSet, basename='transactions')

urlpatterns = router.urls
