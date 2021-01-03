from rest_framework import routers

from .views import CategorySet, PostPageSet, TagSet

# Below is custom router which has some advanced feature not implemented by Wagtail
blog_router = routers.DefaultRouter()
blog_router.register(r"posts", PostPageSet)
blog_router.register(r"categories", CategorySet)
blog_router.register(r"tags", TagSet)
