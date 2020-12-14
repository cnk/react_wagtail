from django.db import models
from wagtail.core import blocks
from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel


class FAQ(Page):
    question = models.CharField(max_length=512)
    answer = models.TextField(max_length=4096, blank=True)
    view_count = models.PositiveIntegerField(default=0)

    faq_content_panels = [
        FieldPanel("question", classname="full"),
        FieldPanel("answer", classname="full"),
    ]
    content_panels = Page.content_panels + faq_content_panels


class FAQBlock(blocks.StructBlock):
    show = blocks.IntegerBlock(
        default=5,
        label="Number of FAQs to Display",
        help_text="Display this many FAQs in the block.",
    )

    class Meta:
        form_classname = 'faq-block struct-block'
        label = 'FAQ List'
        icon = 'doc-full-inverse'
        template = 'core/blocks/faq.html'

    def get_items(self, value):
        return FAQ.objects.live().order_by('view_count')[:value['show']]

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context)
        faqs = self.get_items(value)
        context['faqs'] = faqs

        return context

    def get_api_representation(self, value, context=None):
        faqs = self.get_items(value)
        return [
            {
                "id": item.id,
                "question": item.question,
                "answer": item.answer,
                "view_count": item.view_count
            } for item in faqs
        ]
