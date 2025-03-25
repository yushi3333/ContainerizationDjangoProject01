from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path('', views.index, name = "index"),
    path('complete-signup', views.handle_signin_link, name='handle_signin_link'),
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name = 'signin'),
    path('logout', views.logout,name="logouts"),
    path('settings',views.settings, name='settings'),
    path('upload', views.upload, name='upload'),
    path('like_post', views.like_post, name="like_post"),
    path('profile/<str:username>', views.profile, name = "profile"),
    path('follow', views.follow, name='follow'),
    path('search', views.search, name='search'),
    path('comment/<uuid:post_id>/', views.add_comment, name='add_comment'),
    path('delete/<uuid:post_id>/', views.delete_post, name='delete_post'),
   

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)