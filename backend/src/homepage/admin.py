from django.contrib import admin
from django.contrib.auth.models import Group
from django import forms
from django.contrib.auth.admin import UserAdmin
from .models import Account, Recipe, RecipeCategory, RatingAndReview
# Register your models here.


class CustomRecipe(admin.ModelAdmin):
    fieldsets = [("Recipe Information", {"fields": ['favorites']})]
    list_display = ('pk', 'author', 'recipe_category', 'recipe_name',
                    'recipe_img_display', 'ingredients', 'process', 'pub_date')

    search_fields = ['recipe_name']


class CustomRatingReview(admin.ModelAdmin):
    list_display = ('pk', 'commentor', 'review_date',
                    'recipe', 'rating', 'review')


password_helptext = ' '.join([
    "Your password can't be too similar to your other personal information.<br/><br/>",
    "Your password must contain at least 8 characters.<br/><br/>",
    "Your password can't be a commonly used password.<br/><br/>",
])


class AccountCreationForm(forms.ModelForm):
    password1 = forms.CharField(
        label='Password', widget=forms.PasswordInput, help_text=password_helptext)
    password2 = forms.CharField(
        label='Password confirmation',
        widget=forms.PasswordInput,
        help_text="Enter the same password as before, for verification."
    )

    class Meta:
        model = Account
        fields = ('username', 'email')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("The two Passwords didn't match")
        if len(password1) < 8 and len(password2) < 8:
            raise forms.ValidationError(
                "The Password must not be less than 8 characters")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'date_joined',
                    'last_login', 'is_admin', 'is_staff')
    search_fields = ['email', 'username']
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

    add_form = AccountCreationForm

    add_fieldsets = (
        ("Account Information", {
            'fields': ('name', 'email', 'username', 'password1', 'password2', 'experience')
        }),
    )


admin.site.site_header = 'Recipe App'
admin.site.register(Account, AccountAdmin),
admin.site.register(Recipe, CustomRecipe),
admin.site.register(RecipeCategory),
admin.site.register(RatingAndReview, CustomRatingReview),
admin.site.unregister(Group)
