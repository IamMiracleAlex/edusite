from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from pages import views


urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('blog', views.post_list, name='post_list'),
    path('blog/<int:pk>/<slug:slug>/', views.post_detail, name='post_detail'),
    # path('tag/<slug:tag_slug>/', views.blog_index, name='posts_by_tag'),
    # path('search/', views.blog_search, name='blog_search'),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
