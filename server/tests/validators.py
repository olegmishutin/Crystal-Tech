from rest_framework.exceptions import ValidationError


def validate_percentage(value):
    if value > 100:
        raise ValidationError({'message': 'Процент должно быть меньше 100'})
