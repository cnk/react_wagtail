import bleach
from django_bleach.utils import get_bleach_default_options
from django import template
from django.utils.safestring import mark_safe


register = template.Library()

@register.filter(name='custom_bleach')
def custom_bleach(value, allowed_tags):
    """
    Works just like the 'bleach' template filter, but takes an
    argument of a comma-separated string of the tags that should be
    allowed through the filter. This list of tags *overrides* the list
    in the settings, so be thorough.
    """
    # Use the bleach_args built from the settings, but replace the 'tags' arg with the supplied comma-separated list.
    bleach_args = get_bleach_default_options()
    kwargs = dict(**bleach_args)
    kwargs['tags'] = [tag.strip() for tag in allowed_tags.split(',')]
    bleached_value = bleach.clean(value, **kwargs)
    return mark_safe(bleached_value)
