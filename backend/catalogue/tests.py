from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from database.models import UserSchoolSearch

class UserSchoolSearchTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        self.search = UserSchoolSearch.objects.create(
            user=self.user,
            search_query='Test Query',
            school_name='Test School',
            url_address='http://example.com',
            address='123 Test St',
            postal_code='123456',
            telephone_no='12345678',
            email_address='test@example.com'
        )

    def test_user_school_search_list(self):
        response = self.client.get(reverse('user_school_search_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test School')

    def test_user_school_search_create(self):
        response = self.client.post(reverse('user_school_search_create'), {
            'search_query': 'New Query',
            'school_name': 'New School',
            'url_address': 'http://example.com',
            'address': '456 New St',
            'postal_code': '654321',
            'telephone_no': '87654321',
            'email_address': 'new@example.com'
        })
        self.assertEqual(response.status_code, 302)  # Redirect after successful creation
        self.assertEqual(UserSchoolSearch.objects.count(), 2)

    def test_user_school_search_detail(self):
        response = self.client.get(reverse('user_school_search_detail', args=[self.search.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test School')

    def test_user_school_search_delete(self):
        response = self.client.post(reverse('user_school_search_delete', args=[self.search.pk]))
        self.assertEqual(response.status_code, 302)  # Redirect after successful deletion
        self.assertEqual(UserSchoolSearch.objects.count(), 0)