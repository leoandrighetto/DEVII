from .base_model import BaseModel
from django.db import models
from django.core.validators import MinValueValidator


class Pessoa(BaseModel):

    nome = models.CharField(max_length=30, verbose_name="Nome")
    idade = models.IntegerField(
        verbose_name="Idade", validators=[MinValueValidator(18)]
    )
