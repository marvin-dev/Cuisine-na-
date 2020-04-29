from django.urls import path

from .views import (
    RecipeListView,
    RecipeDetailView,
    CategoryListView,
    AccountListView,
    AccountDetailView,
    current_user,
    CreateAccount,
    RatingAndReviewListView,
)

urlpatterns = [
    path("recipe/", RecipeListView.as_view()),
    path("recipe/<pk>", RecipeDetailView.as_view()),
    path("recipe/category/", CategoryListView.as_view()),
    path("account/", AccountListView.as_view()),
    path("account/<pk>", AccountDetailView.as_view()),
    path("account/current_user/", current_user),
    path("account/signup/", CreateAccount.as_view()),
    path("rating_review/", RatingAndReviewListView.as_view()),
]
