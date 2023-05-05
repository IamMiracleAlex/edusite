from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from taggit.managers import TaggableManager

from users.models import User
# from utils.handlers import image_resizer


class Post(models.Model):

    DRAFT, PUBLISH = "draft", "publish"
    status_choices = ((DRAFT, 'Draft'),
                    (PUBLISH, 'Publish'))

    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=250, blank=True, default="")
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    body = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default=DRAFT, choices=status_choices)
    image = models.ImageField(upload_to='blog', null=True)  
    views = models.BigIntegerField(default=0)  
    featured = models.BooleanField(default=False)                        

    tags = TaggableManager()                                                  

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("post_detail", args=[self.pk, self.slug])
    
    def get_author_name(self):
        return self.author.get_full_name() if self.author else ""

    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = slugify(self.title)

        # if self.image:    
        #     image_resizer(self.image)
            
        super().save(*args, **kwargs)

                                                                    
class Employer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    company = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    role = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
