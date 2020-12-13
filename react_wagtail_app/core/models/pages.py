from django.db import models
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