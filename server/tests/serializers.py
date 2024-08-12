from rest_framework import serializers
from .models import Test, TestResult, Question, QuestionImage, Answer


class QuestionImageSerializer(serializers.ModelSerializer):
    file = serializers.ImageField()

    class Meta:
        model = QuestionImage
        exclude = ['_file']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        extra_kwargs = {
            'question': {
                'required': False
            }
        }

    def update(self, instance, validated_data):
        updated = super().update(instance, validated_data)

        instance.question.have_multiple_choices = bool(instance.question.answers.filter(is_correct=True).count() > 1)
        instance.question.save(update_fields=['have_multiple_choices'])

        return updated


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, required=False)
    images = QuestionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs = {
            'have_multiple_choices': {
                'read_only': True
            }
        }

    def create(self, validated_data):
        answers = validated_data.pop('answers', [])
        is_have_multiple_choices = bool(len([answer for answer in answers if answer.get('is_correct')]) > 1)
        question = Question.objects.create(have_multiple_choices=is_have_multiple_choices, **validated_data)

        for answer in answers:
            Answer.objects.create(question=question, **answer)

        return question


class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    questions_count = serializers.IntegerField(read_only=True)
    mark = serializers.SerializerMethodField(method_name='get_user_mark')

    class Meta:
        model = Test
        exclude = ['passed_users']

    def get_user_mark(self, instance):
        user = self.context['request'].user

        try:
            return instance.tests_results.get(user=user).mark
        except TestResult.DoesNotExist:
            return None


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = '__all__'


class TestCheckSerializer(serializers.Serializer):
    answers = serializers.ListField(allow_empty=False, child=serializers.DictField(allow_empty=False))

    def validate(self, attrs):
        ret_attrs = super().validate(attrs)

        for answer in ret_attrs.get('answers'):
            if 'question' not in answer or 'answer' not in answer:
                raise serializers.ValidationError({'message': 'Ожидаются значения question и answer'})

        return ret_attrs
