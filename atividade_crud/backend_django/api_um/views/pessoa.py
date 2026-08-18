import json
from ..models import Pessoa
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class PessoaViews():

    @csrf_exempt
    def listar_pessoas(self, request):

        pessoas = list(Pessoa.objects.values('id', 'nome', 'idade'))
        return JsonResponse(pessoas, safe=False)
    
    @csrf_exempt
    def criar_pessoa(self, request):

        data = json.loads(request.body)
        pessoa = Pessoa.objects.create(nome=data['nome'], idade=data['idade'])
        return JsonResponse({'id': pessoa.id, 'nome': pessoa.nome, 'idade': pessoa.idade})
    
    @csrf_exempt
    def ler_pessoa(self, request, pk):

        pessoa = Pessoa.objects.values('id', 'nome', 'idade').get(pk=pk)
        return JsonResponse(pessoa)
    
    @csrf_exempt
    def editar_pessoa(self, request, pk):

        data = json.loads(request.body)
        Pessoa.objects.filter(pk=pk).update(nome=data['nome'], idade=data['idade'])
        return JsonResponse({'status': 'ok'})
    
    @csrf_exempt
    def excluir_pessoa(self, request, pk):

        Pessoa.objects.filter(pk=pk).delete()
        return JsonResponse({'status': 'ok'})