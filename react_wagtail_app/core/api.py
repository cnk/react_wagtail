# from rest_framework import routers
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet
from wagtail.images.api.v2.views import ImagesAPIViewSet


cms_api_router = WagtailAPIRouter("api")

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages,
# images). This is used in the URL of the endpoint The second
# parameter is the endpoint class that handles the requests

cms_api_router.register_endpoint("pages", PagesAPIViewSet)
cms_api_router.register_endpoint("images", ImagesAPIViewSet)
cms_api_router.register_endpoint("documents", DocumentsAPIViewSet)
