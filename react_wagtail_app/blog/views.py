from rest_framework import viewsets
from rest_framework.response import Response

from .models import BlogCategory, PostPage, Tag
from .serializers import CategorySerializer, PostPageSerializer, TagSerializer


class PostPageSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PostPageSerializer
    queryset = PostPage.objects.all()

    def get_queryset(self):
        queryset = PostPage.objects.all()
        category = self.request.query_params.get("category", None)
        tag = self.request.query_params.get("tag", None)
        if category is not None and category != "*":
            queryset = queryset.filter(categories__blog_category__slug=category)
        if tag is not None and tag != "*":
            queryset = queryset.filter(tags__slug=tag)
        return queryset

    def list(self, request):
        qs = self.get_queryset()
        serializer = PostPageSerializer(qs, many=True)
        return Response({
            "count": qs.count(),
            "results": serializer.data,
        })


class CategorySet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogCategory.objects.all()

    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response({"results": serializer.data})


class TagSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()

    def list(self, request):
        serializer = TagSerializer(self.queryset, many=True)
        return Response({"results": serializer.data})
