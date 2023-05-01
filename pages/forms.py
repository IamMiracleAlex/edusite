from django import forms

from pages.models import Post

# from ckeditor_uploader.widgets import CKEditorUploadingWidget


# class PostAdminForm(forms.ModelForm):
#     body = forms.CharField(widget=CKEditorUploadingWidget())
#     class Meta:
#         model = Post
#         fields = '__all__'