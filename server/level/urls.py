from django.urls import re_path, include
from . import views

app_name = 'level'
urlpatterns = [
    re_path(r'^admin/', include([
        re_path(r'^levels$', views.AdminLevelsView.as_view(), name='admin-levels'),
        re_path(r'^level/(?P<pk>\w+)$', views.AdminLevelView.as_view(), name='admin-level'),
        re_path(r'^tasks$', views.AdminTasksView.as_view(), name='admin-tasks'),
        re_path(r'^task/(?P<pk>\w+)$', views.AdminTaskView.as_view(), name='admin-task'),
        re_path(r'^test-cases$', views.AdminTestCasesView.as_view(), name='admin-test-cases'),
        re_path(r'^test-case/(?P<pk>\w+)$', views.AdminTestCaseView.as_view(), name='admin-test-case'),
    ])),
    re_path(r'^level/(?P<pk>\w+)$', views.LevelView.as_view(), name='level'),
    re_path(r'^task/(?P<pk>\w+)$', views.TaskView.as_view(), name='task'),
    re_path(r'^check-code$', views.CodeCheckerView.as_view(), name='check-code')
]
