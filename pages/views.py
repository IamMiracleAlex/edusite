from django.shortcuts import render


def index(request):
	template = "pages/index.html"

	return render(request, template,)