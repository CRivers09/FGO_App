from django.shortcuts import render
import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
# from api.models import Contact, ContactSerializer
from app.models import Servant, ActiveSkill, ActiveSkillEffect
from app.models import ServantSerializer, ServantListSerializer
# from django.http import HttpResponse

# def home(request):
#     return HttpResponse("Hello, Django!")

class ServantView(APIView):
    def get(self, request, servant_id=None):
        if servant_id is not None:
            servant = Servant.objects.get(id=servant_id)
            serializer = ServantSerializer(servant, many=False)
            return Response(serializer.data)
        else:
            servant = Servant.objects.all()
            serializer = ServantSerializer(servant, many=True)
            return Response(serializer.data)

class ServantBattleView(APIView):
    def get(self, request, servant_id=None):
        if servant_id is not None:
            servant = Servant.objects.get(id=servant_id)
            serializer = ServantSerializer(servant, many=False)
            return Response(serializer.data)
        else:
            servant = Servant.objects.all()
            serializer = ServantSerializer(servant, many=True)
            return Response(serializer.data)

class ServantListView(APIView):
    def get(self, request, id=None):
        if id is None:
            servant = Servant.objects.all().order_by('id')

            for x in servant:
                x.name = x.__str__()

            serializer = ServantListSerializer(servant, many=True)
            return Response(serializer.data)
        else:
            servant = Servant.objects.get(id=id)
            serializer = ServantListSerializer(servant, many=True)
            return Response(serializer.data)