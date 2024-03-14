from rest_framework.permissions import BasePermission
from .models import Level


class TaskIsCanBePassed(BasePermission):
    def has_object_permission(self, request, view, obj):
        completedTasks = [task.task_id for task in obj.level.completedTasks.all()]
        uncompletedTasks = list(obj.level.tasks.exclude(id__in=completedTasks).order_by('number'))

        completedLevel = [level.id for level in request.user.completedLevels.all()]
        uncompletedLevel = list(Level.objects.exclude(id__in=completedLevel).order_by('number'))

        try:
            return bool(uncompletedTasks.index(obj) == 0 and uncompletedLevel.index(obj.level) == 0)
        except ValueError:
            return True
