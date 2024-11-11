from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from database.models import UserSchoolSearch, UserPreschoolSearch, UserHDBSearch
from .forms import UserSchoolSearchForm, UserPreschoolSearchForm, UserHDBSearchForm
from django.contrib.auth.decorators import login_required

# List View
@login_required
def user_school_search_list(request):
    searches = UserSchoolSearch.objects.filter(user=request.user)
    return render(request, 'catalogue/user_school_search_list.html', {'searches': searches})

# Create View
@login_required
def user_school_search_create(request):
    if request.method == 'POST':
        form = UserSchoolSearchForm(request.POST)
        if form.is_valid():
            search = form.save(commit=False)
            search.user = request.user
            search.save()
            return redirect('user_school_search_list')
    else:
        form = UserSchoolSearchForm()
    return render(request, 'catalogue/user_school_search_form.html', {'form': form})

# Delete View
@login_required
def user_school_search_delete(request, pk):
    search = get_object_or_404(UserSchoolSearch, pk=pk, user=request.user)
    if request.method == 'POST':
        search.delete()
        return redirect('user_school_search_list')
    return render(request, 'catalogue/user_school_search_confirm_delete.html', {'search': search})

# Detail View
@login_required
def user_school_search_detail(request, pk):
    search = get_object_or_404(UserSchoolSearch, pk=pk, user=request.user)
    return render(request, 'catalogue/user_school_search_detail.html', {'search': search})

@login_required
def user_preschool_search_list(request):
    searches = UserPreschoolSearch.objects.filter(user=request.user)
    return render(request, 'catalogue/user_preschool_search_list.html', {'searches': searches})

# Create View
@login_required
def user_preschool_search_create(request):
    if request.method == 'POST':
        form = UserPreschoolSearchForm(request.POST)
        if form.is_valid():
            search = form.save(commit=False)
            search.user = request.user
            search.save()
            return redirect('user_preschool_search_list')
    else:
        form = UserPreschoolSearchForm()
    return render(request, 'catalogue/user_preschool_search_form.html', {'form': form})

# Detail View
@login_required
def user_preschool_search_detail(request, pk):
    search = get_object_or_404(UserPreschoolSearch, pk=pk, user=request.user)
    return render(request, 'catalogue/user_preschool_search_detail.html', {'search': search})

# Delete View
@login_required
def user_preschool_search_delete(request, pk):
    search = get_object_or_404(UserPreschoolSearch, pk=pk, user=request.user)
    if request.method == 'POST':
        search.delete()
        return redirect('user_preschool_search_list')
    return render(request, 'catalogue/user_preschool_search_confirm_delete.html', {'search': search})

@login_required
def user_hdb_search_list(request):
    searches = UserHDBSearch.objects.filter(user=request.user)
    return render(request, 'catalogue/user_hdb_search_list.html', {'searches': searches})

# Create View
@login_required
def user_hdb_search_create(request):
    if request.method == 'POST':
        form = UserHDBSearchForm(request.POST)
        if form.is_valid():
            search = form.save(commit=False)
            search.user = request.user
            search.save()
            return redirect('user_hdb_search_list')
    else:
        form = UserHDBSearchForm()
    return render(request, 'catalogue/user_hdb_search_form.html', {'form': form})

# Detail View
@login_required
def user_hdb_search_detail(request, pk):
    search = get_object_or_404(UserHDBSearch, pk=pk, user=request.user)
    return render(request, 'catalogue/user_hdb_search_detail.html', {'search': search})

# Delete View
@login_required
def user_hdb_search_delete(request, pk):
    search = get_object_or_404(UserHDBSearch, pk=pk, user=request.user)
    if request.method == 'POST':
        search.delete()
        return redirect('user_hdb_search_list')
    return render(request, 'catalogue/user_hdb_search_confirm_delete.html', {'search': search})