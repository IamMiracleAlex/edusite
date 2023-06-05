from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from pages.models import Employer, Post, Applicant


def index(request):
	template = "pages/index.html"
	posts = Post.objects.filter(status=Post.PUBLISH).order_by('-created_at')[:3]
	return render(request, template, {"posts": posts})


def about(request):
	template = "pages/about.html"
	return render(request, template,)


def post_list(request):
	template = "pages/post_list.html"
	posts = Post.objects.filter(status=Post.PUBLISH).order_by('-created_at')[:10]
	return render(request, template, {"posts": posts})


def post_detail(request, pk, slug=None):
    template = 'pages/post_detail.html'
    post = get_object_or_404(Post, pk=pk)
    post.views += 1
    post.save()

    # List of similar posts
    post_tags_ids = post.tags.values_list('id', flat=True)
    similar_posts = Post.objects.filter(status=Post.PUBLISH).filter(
                                        tags__in=post_tags_ids).exclude(id=post.id)[:3]

    return render(request, template, {'post': post, "similar_posts": similar_posts})


def employer_form(request):
    data = {name: request.POST.get(name, "") for name in request.POST 
                if name != "csrfmiddlewaretoken"}
    response = {}
    # raise Exception("Testing error")
    if Employer.objects.filter(**data).exists():
        response['detail'] = 'Data has already been recorded'
        return JsonResponse(response, status=400)

    try:
        Employer.objects.create(**data)
        response['detail'] = 'Data recorded successfully'
    except Exception as e:
        response['detail'] = "Oops! Something went wrong. Please try again later"
        print("error:", e)
        return JsonResponse(response, status=500)

    return JsonResponse(response)


def applicant_form(request):
    data = {name: request.POST.get(name, "") for name in request.POST 
                if name != "csrfmiddlewaretoken"}
    response = {}
    
    if Applicant.objects.filter(**data).exists():
        response['detail'] = 'Data has already been recorded'
        return JsonResponse(response, status=400)

    try:
        Applicant.objects.create(**data, resume=request.FILES.get("resume"))
        response['detail'] = 'Data recorded successfully'
    except Exception as e:
        response['detail'] = "Oops! Something went wrong. Please try again later"
        print("error:", e)
        return JsonResponse(response, status=500)

    return JsonResponse(response)
