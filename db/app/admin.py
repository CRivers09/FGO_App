from django.contrib import admin

# Make ModelAdmin models for your models
# class ActiveSkillEffectAdmin(admin.ModelAdmin):
#     fields = ('skill_type', 'duration', 'turn_type', 'description',
#                 ('level_1', 'level_2', 'level_3', 'level_4', 'level_5'),
#                 ('level_6', 'level_7', 'level_8', 'level_9', 'level_10'))

# Register your models here.
from app.models import Servant, ActiveSkill, ActiveSkillEffect
admin.site.register(Servant)
admin.site.register(ActiveSkill)
admin.site.register(ActiveSkillEffect)