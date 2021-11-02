# from .models import Product
# from .serializers import ProductSerializer
# from djangochannelsrestframework import permissions
# from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
# from djangochannelsrestframework.mixins import ListModelMixin

# class RatingConsumer(ListModelMixin, GenericAsyncAPIConsumer):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = (permissions.AllowAny,)

import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .serializers import ProductSerializer
from .models import Product
class RatingConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'group'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'handle_action',
                'action': 'list'
            }
        )

    # Receive message from room group
    def handle_action(self, event):
        action = event['action']
        if action == 'list':
            # Send message to WebSocket
            self.send(text_data=json.dumps({
                'data': ProductSerializer(Product.objects.first()).data
            }))