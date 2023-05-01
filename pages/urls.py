from django.urls import path

from pages import views


urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('blog/<int:pk>/<slug:slug>/', views.blog, name='blog'),
    # path('tag/<slug:tag_slug>/', views.blog_index, name='posts_by_tag'),
    # path('search/', views.blog_search, name='blog_search'),
]