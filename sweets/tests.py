from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Sweet

class DayOneTests(APITestCase):
    def test_register_and_login_and_sweets_flow(self):
        # REGISTER USER
        resp = self.client.post('/api/auth/register/', {
            'username': 'user1', 'email': 'user1@example.com', 'password': 'pass12345'
        }, format='json')
        self.assertEqual(resp.status_code, 201)

        # LOGIN USER -> get token
        login = self.client.post('/api/auth/login/', {
            'username': 'user1', 'password': 'pass12345'
        }, format='json')
        self.assertEqual(login.status_code, 200)
        token = login.data['access']

        # user should see empty sweets list
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        list_resp = self.client.get('/api/sweets/')
        self.assertEqual(list_resp.status_code, 200)
        self.assertEqual(list_resp.data, [])

        # CREATE ADMIN and add a sweet
        admin = User.objects.create_user('admin', 'admin@example.com', 'adminpass')
        admin.is_staff = True
        admin.save()
        admin_login = self.client.post('/api/auth/login/', {'username': 'admin', 'password': 'adminpass'}, format='json')
        admin_token = admin_login.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + admin_token)
        create = self.client.post('/api/sweets/', {
            'name': 'Ladoo', 'category': 'Mithai', 'price': '25.00', 'quantity': 10
        }, format='json')
        self.assertEqual(create.status_code, 201)
        sweet_id = create.data['id']

        # USER purchases 2
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        purchase = self.client.post(f'/api/sweets/{sweet_id}/purchase/', {'quantity': 2}, format='json')
        self.assertEqual(purchase.status_code, 200)
        self.assertIn('remaining', purchase.data)
        self.assertEqual(purchase.data['remaining'], 8)
