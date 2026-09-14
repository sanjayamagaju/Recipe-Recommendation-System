from rest_framework.response import Response
from rest_framework.views import APIView

from recipes.serializers import RecipeSerializer
from recommendations.serializers import RecommendationRequestSerializer
from recommendations.services import get_recommendations


class RecommendationView(APIView):

    def post(self, request):
        serializer = RecommendationRequestSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        ingredient_ids = serializer.validated_data['ingredient_ids']
        recipe_id = serializer.validated_data['recipe_id']
        recommendations = get_recommendations(ingredient_ids, recipe_id)
        data = []

        for recommendation in recommendations:
            data.append({
                'recipe': RecipeSerializer(recommendation['recipe']).data,
                'score': recommendation['score'],
                'match_percentage': recommendation['match_percentage'],
            })

        return Response(data)
