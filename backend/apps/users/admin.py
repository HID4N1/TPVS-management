from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    # 🔹 Display in list view
    list_display = (
        "email",
        "last_name",
        "role",
        "is_active",
        "is_staff",
        "created_at",
    )

    # 🔹 Filters (VERY important for admin usability)
    list_filter = (
        "role",
        "is_active",
        "is_staff",
        "created_at",
    )

    # 🔹 Search
    search_fields = (
        "email",
        "phone",
    )

    ordering = ("-created_at",)

    # 🔹 Read-only fields
    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "last_login",
    )

    # 🔹 Field organization (detail page)
    fieldsets = (
        ("Authentication", {
            "fields": ("email", "password")
        }),

        ("Personal Info", {
            "fields": ("phone","last_name","first_name", )
        }),

        ("Role & Permissions", {
            "fields": ("role", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")
        }),

        ("Timestamps", {
            "fields": ("last_login", "created_at", "updated_at")
        }),
    )

    # 🔹 Create user form (admin add)
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "role", "is_active", "is_staff"),
        }),
    )

    # 🔹 Use email as username
    filter_horizontal = ("groups", "user_permissions")