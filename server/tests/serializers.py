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
        exclude = ['question']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    images = QuestionImageSerializer(many=True, read_only=True)
    have_multiple_choices = serializers.SerializerMethodField(method_name='is_have_multiple_choices')

    class Meta:
        model = Question
        fields = '__all__'

    def is_have_multiple_choices(self, instance):
        return instance.answers.filter(is_correct=True).count() > 1

    def create(self, validated_data):
        answers = validated_data.pop('answers', [])
        question = Question.objects.create(**validated_data)

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
