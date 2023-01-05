import json

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
        """self.client.credentials(HTTP_AUTHORIZATION=f"token {token}")"""
        response = self.client.get('account/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class AccounTestCase(APITestCase):

    def setUp(self):
        """Here we create the user account immediately when the test scripts are lanched"""
        self.user1 = json.loads(self.create_user().content)
        self.user2 = json.loads(self.create_user1().content)

        self.token1 = json.loads(self.get_token({
            'username': 'ivantom',
            'password': '1234'
        }).content)['Token']
        self.token2 = json.loads(self.get_token({
            'username': 'ivantom1',
            'password': '1234'
        }).content)['Token']

    def create_user(self):
        data = {
            "user": {
                "username": "ivantom",
                "first_name": "navi",
                "last_name": "test",
                "email": "test@gmail1.com",
                "password": "1234"
            },
            "phone": '650039773',
            "birthday": '2022-1-1',
            "adress": "nkolmesseng",
            "pin": '0000'
        }

        response = self.client.post('/api/profile/', data)

        return response

    def create_user1(self):
        data = {
            "user": {
                "username": "ivantom1",
                "first_name": "navi",
                "last_name": "test",
                "email": "test@gmail.com",
                "password": "1234"
            },
            "phone": '620284228',
            "birthday": '2022-1-1',
            "adress": "nkolmesseng",
            "pin": '0000'
        }

        response = self.client.post('/api/profile/', data)

        return response

    def test_display_user(self):
        """This test case just check if the username created corresponds to ivantom"""

        self.assertEquals(self.user1['user']['username'], "ivantom")

    def get_token(self, data: dict):
        # data = {
        #     'username':'ivantom',
        #     'password':'1234'
        # }
        response = self.client.post('/api/auth/sing_in/', data)
        return response

    def test_login(self):
        """
        Here we are gong to test if the user can login successfully
        The request must return a status cde of 200 other wise the authentication
        was not successfull
        """
        data = {
            'username': 'ivantom',
            'password': '1234'
        }
        response = self.client.post('/api/auth/sing_in/', data)

        # token = json.loads(response.content)['Token']

        self.assertEquals(response.status_code, 200)

    def get_user1_account_info(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        response = self.client.get('/api/account/')

        return json.loads(response.content)[0]

    def get_user2_account_info(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token2}")

        response = self.client.get('/api/account/')

        return json.loads(response.content)[0]

    def test_get_account_info(self):
        """
        This test case if just to display the user account and check if the account balance
        is empty
        """
        token = json.loads(self.get_token({
            'username': 'ivantom',
            'password': '1234'
        }).content)['Token']

        self.client.credentials(HTTP_AUTHORIZATION=f"token {token}")

        response = self.client.get('/api/account/')
        # data = json.loads(response.content)

        # self.assertEquals(data[0]['balance'],0,'The account balance must be empty')
        self.assertEquals(response.status_code, 200, 'Passed')

    def test_set_account_balance_of_user1_to_5000(self):
        # print(self.token1)
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        response = self.client.get('/api/account/')
        data = json.loads(response.content)[0]
        # print(response)

        response = self.client.patch('/api/account/{}/'.format(data['id']), {'balance': 5000})
        data = json.loads(response.content)
        # print(response.content)
        self.assertEquals(response.status_code, 200, 'Passed')
        self.assertEquals(data['balance'], 5000, "The balance must be 5000")

    def test_set_account_balance_of_user2_to_10000(self):
        # print(self.token1)
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token2}")

        response = self.client.get('/api/account/')
        data = json.loads(response.content)[0]

        # print(response)

        response = self.client.patch('/api/account/{}/'.format(data['id']), {'balance': 10000})
        data = json.loads(response.content)
        # print(response.content)
        self.assertEquals(response.status_code, 200, 'Passed')
        self.assertEquals(data['balance'], 10000, "The balance must be 5000")

    def update_users_account(self, balance1: int = 5000, balance2: int = 10000):
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        response = self.client.get('/api/account/')
        data = json.loads(response.content)[0]
        # print(response)

        response = self.client.patch('/api/account/{}/'.format(data['id']), {'balance': balance1})

        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token2}")

        response = self.client.get('/api/account/')
        data = json.loads(response.content)[0]

        # print(response)

        response = self.client.patch('/api/account/{}/'.format(data['id']), {'balance': balance2})

    def test_transfer_money_from_user1_to_user2(self):
        self.update_users_account()
        # Set user's 1 token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        response = self.client.get('/api/account/')
        user_1_account_data = json.loads(response.content)[0]

        # print(user_1_account_data)

        # Set user's 2 token in the request headers

        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token2}")

        response = self.client.get('/api/account/')
        user_2_account_data = json.loads(response.content)[0]

        # print(user_2_account_data)

        # Resetting user's 1 token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        # Transaction data
        # print(self.user2)
        data = {
            "amount": 1000,
            "type": "transfert",
            "number": self.user2['phone']
        }

        response = self.client.post('/api/transactions/', data)

        transaction_data = json.loads(response.content)

        print(transaction_data)

        self.assertEquals(response.status_code, 201, "Transaction must be successfull")

        self.assertEquals(transaction_data['sender'], user_1_account_data['id'], "The account id must be equal")

        self.assertEquals(transaction_data['receiver'], user_2_account_data['id'], "The user id must be equal")

        # print(self.get_user1_account_info())
        # print(self.get_user2_account_info())

        self.assertEquals(self.get_user2_account_info()['balance'], user_2_account_data['balance'] + 1000,
                          "The account balance must be 11000")

    def test_transfer_money_from_user1_to_user2_show_return_an_error(self):
        self.update_users_account(balance1=200, balance2=400)
        # Set user's 1 token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        response = self.client.get('/api/account/')
        user_1_account_data = json.loads(response.content)[0]

        print(user_1_account_data)

        # Set user's 2 token in the request headers

        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token2}")

        response = self.client.get('/api/account/')
        user_2_account_data = json.loads(response.content)[0]

        # print(user_2_account_data)

        # Resetting user's 1 token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION=f"token {self.token1}")

        # Transaction data
        # print(self.user2)
        data = {
            "amount": 100000,
            "type": "transfert",
            "number": self.user2['phone']
        }

        response = self.client.post('/api/transactions/', data)

        transaction_data = json.loads(response.content)

        print(transaction_data)

        self.assertEquals(response.status_code, 200, "Transaction must be successfull")

        self.assertEquals(transaction_data['detail'], 'your balance is insufficient to complete this transaction')

        # Since the account balance of user 1 is insufficient the account balance must not change

        # print(self.get_user1_account_info())
        # print(self.get_user2_account_info())

        self.assertEquals(self.get_user1_account_info()['balance'], 200)
        self.assertEquals(self.get_user2_account_info()['balance'], 400)
