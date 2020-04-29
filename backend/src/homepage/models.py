from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have a email")
        if not username:
            raise ValueError("Users must have username")

        user = self.model(email=self.normalize_email(
            email), username=username,)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email), password=password, username=username,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user


class Account(AbstractBaseUser):
    Beginner = "Beginner"
    Advanced = "Advanced"
    Expert = "Expert"
    EXPERIENCES = (
        (Beginner, "Beginner"),
        (Advanced, "Advanced"),
        (Expert, "Expert"),
    )

    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)

    name = models.CharField(max_length=50)
    experience = models.CharField(
        max_length=50, choices=EXPERIENCES, default=Beginner)

    date_joined = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = AccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_perms(self, perm):
        return True

    def has_module_perms(self, app_label):
        return True


class RecipeCategory(models.Model):
    dishType = "Appetizers"
    snacks = "Snacks"
    main = "Main Dishes"
    desserts = "Desserts"
    breakfast = "Breakfast"
    lunch = "Lunch"
    dinner = "Dinner"
    smoothies = "Smoothies"
    MAIN_CATEGORY = (
        (dishType, "Dish Type"),
        (snacks, "Snacks"),
        (main, "Main Dishes"),
        (desserts, "Desserts"),
        (breakfast, "Breakfast"),
        (lunch, "Lunch"),
        (dinner, "Dinner"),
        (smoothies, "Smoothies"),
    )

    main_category = models.CharField(max_length=50, choices=MAIN_CATEGORY)

    def __str__(self):
        return self.main_category


class Recipe(models.Model):
    author = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="author", null=False
    )
    recipe_category = models.ForeignKey(
        RecipeCategory, on_delete=models.CASCADE, related_name="cat", null=False
    )
    recipe_name = models.CharField(max_length=80)
    recipe_desc = models.TextField(null=True, max_length=1000)
    recipe_img_display = models.FileField(blank=False, null=False)
    prep_time = models.CharField(max_length=20)
    cooking_time = models.CharField(max_length=20)
    serving = models.IntegerField()
    ingredients = models.TextField(max_length=1500)
    process = models.TextField(max_length=1500)
    pub_date = models.DateTimeField(auto_now_add=True)
    favorites = models.ManyToManyField(Account, blank=True)

    def __str__(self):
        return self.recipe_name


class RatingAndReview(models.Model):
    commentor = models.ForeignKey(
        Account, on_delete=models.CASCADE, null=False)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=False)
    rating = models.IntegerField()
    review = models.TextField(max_length=500, blank=True, null=True)
    review_date = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)

    def __str__(self):
        return str(self.rating)
