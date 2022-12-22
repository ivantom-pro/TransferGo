from django.test import TestCase
from django.urls import include, path, reverse
from .models import *
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase


class Tests(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('api/', include('core.urls')),
    ]

    def test_get_account(self):
        
        self.client.credentials(HTTP_AUTHORIZATION=f"token {token}")
        response = self.client.get('account/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)