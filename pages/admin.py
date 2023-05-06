from django.contrib import admin

from .models import Post, Employer
from .forms import PostAdminForm



@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm

    list_display = ('short_title', 'author', 'status','views', 'featured','created_at', 'updated_at')
    list_filter = ('created_at', 'status')
    search_fields = ('title', 'body')
    raw_id_fields = ('author',)
    date_hierarchy = 'created_at'
    exclude = ['slug', 'views', 'featured']

    def short_title(self, obj):
        return obj.title[:20]


@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "company", "email", "role", "created_at"]
    list_filter = ('created_at',)
    search_fields = ('first_name', 'last_name', 'company', 'email', 'role')
    date_hierarchy = 'created_at'


admin.site.site_header = 'Recruiture Admin'
