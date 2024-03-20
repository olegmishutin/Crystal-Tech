from rest_framework.permissions import BasePermission


class TaskIsCanBePassed(BasePermission):
    def has_object_permission(self, request, view, obj):
        taskLanguage = obj.level.language
        userAccepted = True

        if taskLanguage.is_closed:
            userAccepted = taskLanguage.accepted_users.filter(id=request.user.id).exists()

        completedTasks = [task.task_id for task in obj.level.completedTasks.all()]
        uncompletedTasks = list(obj.level.tasks.exclude(id__in=completedTasks).order_by('number'))

        completedLevels = [level.id for level in request.user.completedLevels.all()]
        uncompletedLevels = list(taskLanguage.levels.all().exclude(id__in=completedLevels).order_by('number'))

        try:
            return bool(uncompletedTasks.index(obj) == 0 and uncompletedLevels.index(obj.level) == 0 and userAccepted)
        except ValueError:
            return True
