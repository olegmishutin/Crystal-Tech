from rest_framework.routers import DefaultRouter
from rest_framework.permissions import IsAuthenticated
from django.urls import re_path, include
from . import views

router = DefaultRouter()
router.register('tests', views.TestsViewSet, basename='tests')
router.register('questions', views.QuestionsViewSet, basename='questions')

users_tests_list = views.TestsViewSet.as_view({'get': 'list'}, permission_classes=[IsAuthenticated])
users_tests_detail = views.TestsViewSet.as_view({'get': 'retrieve'}, permission_classes=[IsAuthenticated])

app_name = 'tests'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path('', include(router.urls)),
        re_path(r'^answers/$', views.AnswerView.as_view(), name='answers'),
        re_path(r'^answers/(?P<pk>\w+)/$', views.AnswerView.as_view(), name='answers-detail'),
        re_path(r'^question_images/$', views.QuestionImageView.as_view(), name='question-images'),
        re_path(r'^question_images/(?P<pk>\w+)/$', views.QuestionImageView.as_view(), name='question-images-detail'),
    ])),
    re_path(r'^tests/$', users_tests_list, name='user-tests'),
    re_path(r'^tests/(?P<pk>\w+)/$', users_tests_detail, name='user-tests-detail'),
    re_path(r'^tests/(?P<pk>\w+)/check/$', views.check_test_answers, name='check-test')
]
