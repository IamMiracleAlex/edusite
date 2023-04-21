from django.contrib import admin

from users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    date_hierarchy = 'date_joined'

    list_display = ('first_name','last_name','email','phone', 
                'is_active', 'is_staff')
    list_filter = ('is_staff', 'is_active',)
   
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-date_joined',)