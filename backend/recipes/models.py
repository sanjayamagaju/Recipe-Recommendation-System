from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    cooking_time = models.IntegerField()
    difficulty = models.CharField(max_length=50)
    is_vegetarian = models.BooleanField(default=False)

    ingredients = models.ManyToManyField(
        Ingredient,
        related_name="recipes",
        blank=True
    )

    def __str__(self):
        return self.name