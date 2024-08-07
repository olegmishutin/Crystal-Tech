from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from .models import Test, Question, QuestionImage, Answer, TestResult
from . import serializers


class TestsViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TestSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Test.objects.all().annotate(questions_count=Count('questions')).prefetch_related(
            'questions', 'questions__answers', 'questions__images')


class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().prefetch_related('answers', 'images', 'answers__question')
    serializer_class = serializers.QuestionSerializer
    permission_classes = [IsAdminUser]


class CreateUpdateDestroyAPIView(generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = [IsAdminUser]


class AnswerView(CreateUpdateDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = serializers.AnswerSerializer


class QuestionImageView(CreateUpdateDestroyAPIView):
    queryset = QuestionImage.objects.all()
    serializer_class = serializers.QuestionImageSerializer


@sync_to_async()
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_test_answers(request, pk):
    if not TestResult.objects.filter(test_id=pk, user=request.user):
        test_check_serializer = serializers.TestCheckSerializer(data=request.data)
        test_check_serializer.is_valid(raise_exception=True)

        right_answers_count = 0
        list_data = test_check_serializer.data.get('answers')
        test = get_object_or_404(Test.objects.all().annotate(questions_count=Count('questions')), pk=pk)

        for question in test.questions.all():
            for data in list_data:
                if data.get('question') == question.id:
                    right_answers = list(question.answers.filter(is_correct=True).values_list('id', flat=True))

                    if data.get('answer') == right_answers:
                        right_answers_count += 1

        right_answers_percentage = 100 * right_answers_count / test.questions_count
        mark = round((right_answers_percentage * 5) / test.highest_score_percentage, 1)

        if mark > 5:
            mark = 5

        elif mark < 2:
            mark = 2

        test_result = TestResult.objects.create(user=request.user, test=test, mark=mark)
        test_result_serializer = serializers.TestResultSerializer(test_result)

        return Response(test_result_serializer.data, status=status.HTTP_200_OK)
    return Response({'messages': 'Вы уже прошли этот тест'}, status=status.HTTP_400_BAD_REQUEST)
