from django.urls import path
from .views import PessoaViews

views = PessoaViews()

urlpatterns = [
    path("", views.listar_pessoas, name="listar_pessoas"),
    path("criar_pessoa/", views.criar_pessoa, name="criar_pessoa"),
    path("ler_pessoa/<int:id>/", views.ler_pessoa, name="ler_pessoa"),
    path("editar_pessoa/<int:id>/", views.editar_pessoa, name="editar_pessoa"),
    path("excluir_pessoa/<int:id>/", views.excluir_pessoa, name="excluir_pessoa"),
]


