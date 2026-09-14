from rest_framework import serializers


class RecommendationRequestSerializer(serializers.Serializer):
    recipe_id = serializers.IntegerField()
    ingredient_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )