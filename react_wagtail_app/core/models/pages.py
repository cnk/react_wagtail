from django.db import models
from rest_framework import serializers

from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Page
from wagtail.admin.edit_handlers import StreamFieldPanel

from .blocks import HeadingBlock
from .faq import FAQBlock

class BasicPage(Page):
    body = StreamField([
        ('heading', HeadingBlock()),
        ('paragraph', blocks.RichTextBlock()),
        ('faqs', FAQBlock()),
    ])

    content_panels = Page.content_panels + [StreamFieldPanel("body", classname="full")]

    api_fields = (
        'body',
        APIField("pub_date", serializer=serializers.DateTimeField(format="%d %B %Y", source="last_published_at")),
    )
