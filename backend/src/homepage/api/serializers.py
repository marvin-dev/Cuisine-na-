from rest_framework import serializers
from homepage.models import Recipe, Account, RecipeCategory, RatingAndReview

from rest_framework_jwt.settings import api_settings

# Rating and Review Serializers


class RatingReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = RatingAndReview
        fields = ("pk", "commentor", "review_date", "recipe", "rating", "review")


# Recipe Serializers


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = (
            "pk",
            "author",
            "recipe_category",
            "recipe_name",
            "recipe_desc",
            "recipe_img_display",
            "prep_time",
            "cooking_time",
            "serving",
            "ingredients",
            "process",
            "pub_date",
            "favorites"
        )


# Recipe Category Serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = ("pk", "main_category")


# Users serializers


class AccountSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = Account
        fields = (
            "pk",
            "name",
            "email",
            "username",
            "password",
            "experience",
            "date_joined",
            "token",
        )
