from rest_framework import status
from rest_framework.test import APITestCase
from PIL import Image
import io

category_list = [
    "Appetizers",
    "Snacks",
    "Main Dishes",
    "Desserts",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Smoothies"
]

class APITest(APITestCase):
    def call_category(self):
        for cat in category_list:
            data = {
                "main_category": cat
            }
            response = self.client.post('/api/recipe/category/', data)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get('/api/recipe/category/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data

    # TEST FOR RECIPE IMAGE
    def generate_recipe_image(self):
        file = io.BytesIO()
        image = Image.new("RGBA", size=(250, 250), color=(155, 0, 0))
        image.save(file, "png")
        file.name = "testcase.png"
        file.seek(0)
        return file

    # TEST FOR SIGNUP
    def test_signup(self, username="tester", email="tester@gmail.com"):
        data = {
            "name": "Tester T. Test",
            "email": email,
            "username": username,
            "password": "fakepassword",
            "experience": "Expert"
        }
        response = self.client.post('/api/account/signup/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response

    # TEST FOR LOGIN
    def test_login(self, username="test_user", email="test_user@gmail.com"):
        user = self.test_signup(username, email)
        data = {
            "username": username,
            "password": "fakepassword",
        }
        response = self.client.post('/token-auth/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data, user.data

    # TEST FOR CREATING RECIPES

    def test_create_recipe(self):
        user = self.test_login()[1]
        category = self.call_category()
        data = {
            "author": user["pk"],
            "recipe_category": category[1]['pk'],
            "recipe_name": "Ginataang Manok",
            "recipe_desc": "This is test description",
            "recipe_img_display": self.generate_recipe_image(),
            "prep_time": 30,
            "cooking_time": 80,
            "serving": 5,
            "ingredients": "This is ingredients",
            "process": "This is procedure"
        }
        # print(data)
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + user['token'])
        response = self.client.post('/api/recipe/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data, user

    # TEST FOR RATING AND REVIEW
    def test_rating_review(self):
        recipe = self.test_create_recipe()[0]
        user = self.test_login("commentor_1", "commentor_user@gmail.com")[1]
        data = {
            "commentor": user["pk"],
            "recipe": recipe['pk'],
            "rating": 4,
            "review": "Test Review"
        }
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + user['token'])
        response = self.client.post('/api/rating_review/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data

    # TEST FOR EDIT RECIPE
    def test_edit_recipe(self):
        recipe = self.test_create_recipe()
        category = self.call_category()
        data = {
            "author": recipe[1]["pk"],
            "recipe_category": category[3]['pk'],
            "recipe_name": "Ginataang Manok with Patatas",
            "recipe_desc": "This is for edit description",
            "recipe_img_display": self.generate_recipe_image(),
            "prep_time": 15,
            "cooking_time": 50,
            "serving": 4,
            "ingredients": "This is for edit ingredients",
            "process": "This is for edit procedure"
        }
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + recipe[1]["token"])
        response = self.client.patch("/api/recipe/{}".format(recipe[0]['pk']), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data

    # TEST FOR DELETING RECIPE

    def test_delete_recipe(self):
        recipe = self.test_create_recipe()
        self.client.credentials(HTTP_AUTHORIZATION="JWT " + recipe[1]['token'])
        response = self.client.delete("/api/recipe/{}".format(recipe[0]['pk']))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        return response.data
