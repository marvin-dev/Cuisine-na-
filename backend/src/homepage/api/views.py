from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from homepage.models import RecipeCategory, Recipe, Account, RatingAndReview
from .serializers import (
    AccountSerializer,
    RecipeSerializer,
    RatingReviewSerializers,
    CategorySerializer,
)


@api_view(["GET"])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = AccountSerializer(request.user)
    return Response(serializer.data)


class CategoryListView(ListAPIView):
    queryset = RecipeCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecipeListView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (permissions.AllowAny,)


class AccountListView(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    permission_classes = (permissions.AllowAny,)

    # permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountDetailView(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingAndReviewListView(ListAPIView):
    queryset = RatingAndReview.objects.all()
    serializer_class = RatingReviewSerializers

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = RatingReviewSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateAccount(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
