from rest_framework.permissions import BasePermission
from .models import Language


class UserIsAccepted(BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.is_closed and not request.user.is_superuser:
            return obj.accepted_users.filter(id=request.user.id).exists()
        return True