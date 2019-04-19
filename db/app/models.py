from rest_framework import serializers
from django.db import models
from django import forms
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
# from django.contrib.auth.models import User

ATTRIBUTES = [
    ('m', 'Man'),
    ('e', 'Earth'),
    ('s', 'Sky'),
    ('t', 'Star'),
    ('b', 'Beast')]

GROWTH = [
    ('l','Linear'),
    ('s','S'),
    ('rs','Reverse S'),
    ('ss','Semi S'),
    ('srs','Semi Reverse S')
]

ALIGNS = [
    ('lg', 'Lawful ・ Good'),
    ('ln', 'Lawful ・ Neutral'),
    ('le', 'Lawful ・ Evil'),
    ('li', 'Lawful ・ Insane'),
    ('ls', 'Lawful ・ Summer'),
    ('ng', 'Neutral ・ Good'),
    ('tn', 'True Neutral'),
    ('ne', 'Neutral ・ Evil'),
    ('ns', 'Neutral ・ Summer'),
    ('cg', 'Chaotic ・ Good'),
    ('cn', 'Chaotic ・ Neutral'),
    ('ce', 'Chaotic ・ Evil'),
    ('ci', 'Chaotic ・ Insane'),
    ('cb', 'Chaotic ・ Bride'),
    ('cs', 'Chaotic ・ Summer'),
    ('jh', 'Lawful-Good (Jekyll)・Chaotic-Evil (Hyde)')
]

RANKS = [
    ('\'EX\'', '\'EX\''), ('EX', 'EX'),
    ('A+++', 'A+++'), ('A++', 'A++'), ('A+', 'A+'), ('A', 'A'), ('A-', 'A-'),
    ('B+', 'B+'), ('B', 'B'), ('B-', 'B-'),
    ('C+', 'C+'), ('C', 'C'), ('C-', 'C-'),
    ('D+', 'D+'), ('D', 'D'), ('D-', 'D-'),
    ('E+', 'E+'), ('E', 'E')
]

VAS = [
    ('a', 'Takahashi Rie'),
    ('b', 'Sakurai Takahiro'),
    ('c', 'Namikawa Daisuke'),
    ('d', 'Yusa Kōji')
]

ARTISTS = [
    ('a', 'Takeuchi Takashi'),
    ('b', 'Taiki'),
    ('d', 'Honjou Raita')
]

class Servant(models.Model):
    id = models.PositiveIntegerField(validators=[MinValueValidator(1)], unique=True, primary_key=True)
    name = models.CharField(max_length=80, default="Mash Kyrielight")
    cost = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    atk_min = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    atk_max = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    atk_grail = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    hp_min = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    hp_max = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    hp_grail = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    attribute = models.CharField(max_length=1, choices=ATTRIBUTES, blank=True, default='m')
    va = models.CharField(max_length=1, choices=VAS, blank=True, default='a')
    artist = models.CharField(max_length=1, choices=ARTISTS, blank=True, default='a')
    growth_curve = models.CharField(max_length=3, choices=GROWTH, blank=True, default='l')
    star_absorption = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    star_generation = models.DecimalField(max_digits=5, decimal_places=2,
                        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    np_charge_atk = models.DecimalField(max_digits=5, decimal_places=2,
                        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    np_charge_def = models.DecimalField(max_digits=5, decimal_places=2,
                        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    death_rate = models.DecimalField(max_digits=5, decimal_places=2,
                        validators=[MinValueValidator(1), MaxValueValidator(100)], default=1)
    alignment = models.CharField(max_length=2, choices=ALIGNS, blank=True, default='lg')
    gender = models.CharField(max_length=1, choices=[('m', 'Male'), ('f', 'Female')], blank=True, default='m')
    skill_1 = models.ForeignKey('ActiveSkill', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    skill_2 = models.ForeignKey('ActiveSkill', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    skill_3 = models.ForeignKey('ActiveSkill', on_delete=models.SET_NULL, blank=True, null=True, related_name='+')
    np = 0

    def __str__(self):
        num = ""
        for x in range(3 - len(str(self.id))):
            num = num + "0"
        return (num + str(self.id) + " - " + self.name)

class ActiveSkill(models.Model):
    name = models.CharField(max_length=80)
    rank = models.CharField(max_length=4, choices=RANKS, blank=True, default='e')
    initial_cd = models.PositiveIntegerField(validators=[MinValueValidator(3)], default=7)
    effect = models.ManyToManyField('ActiveSkillEffect')

    def __str__(self):
        return (self.name + ' ' + self.rank)

class ActiveSkillEffect(models.Model):
    skill_type = models.CharField(max_length=80)
    target = models.CharField(max_length=7, choices=[('Self', 'Self'), ('Target', 'Target'), ('Ally', 'Ally'), ('Party', 'Party'), ('enemies', 'Enemies')], blank=True, default='Self')
    duration = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    turn_type = models.CharField(max_length=7, choices=[('Instant', 'Instant'), ('turn', 'Turn'), ('time', 'Time')], blank=True, default='turn')
    description = models.CharField(max_length=80)
    level_1 = models.DecimalField(max_digits=6, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_2 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_3 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_4 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_5 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_6 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_7 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_8 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    # level_9 = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1)], default=1)
    level_10 = models.DecimalField(max_digits=6, decimal_places=1, validators=[MinValueValidator(1)], default=1)

    def __str__(self):
        if self.level_1 == self.level_10:
            if self.turn_type == 'Instant':
                return (self.skill_type + ' (' + self.target + ')' + ' [' + str(self.level_1) + '%]')
            else:
                if self.duration == 1:
                    return (self.skill_type + ' (1 ' + self.turn_type + ', ' + self.target + ')' + ' [' + str(self.level_1) + '%]')
                else:
                    return (self.skill_type + ' (' + str(self.duration) + ' ' + self.turn_type + 's, ' + self.target + ')' + ' [' + str(self.level_1) + '%]')
        else:
            if self.turn_type == 'Instant':
                return (self.skill_type + ' (' + self.target + ')' + ' [Min: ' + str(self.level_1) + '%/Max: ' + str(self.level_10) + '%]')
            else:
                if self.duration == 1:
                    return (self.skill_type + ' (1 ' + self.turn_type + ', ' + self.target + ')' + ' [Min: ' + str(self.level_1) + '%/Max: ' + str(self.level_10) + '%]')
                else:
                    return (self.skill_type + ' (' + str(self.duration) + ' ' + self.turn_type + 's, ' + self.target + ')' + ' [Min: ' + str(self.level_1) + '%/Max: ' + str(self.level_10) + '%]')

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servant
        fields = ('atk_min', 'atk_max', 'atk_grail', 'hp_min', 'hp_max', 'hp_grail')
        read_only_fields = ('atk_min', 'atk_max', 'atk_grail', 'hp_min', 'hp_max', 'hp_grail')

class ActiveSkillEfffectSerializer(serializers.ModelSerializer):
    target = serializers.CharField(source='get_target_display')
    turn_type = serializers.CharField(source='get_turn_type_display')

    class Meta:
        model = ActiveSkillEffect
        exclude = ('id',)

class ActiveSkillSerializer(serializers.ModelSerializer):
    rank = serializers.CharField(source='get_rank_display')
    effect = ActiveSkillEfffectSerializer(read_only=True, many=True)

    class Meta:
        model = ActiveSkill
        exclude = ('id',)

class ServantSerializer(serializers.ModelSerializer):
    attribute = serializers.CharField(source='get_attribute_display')
    va = serializers.CharField(source='get_va_display')
    artist = serializers.CharField(source='get_artist_display')
    growth_curve = serializers.CharField(source='get_growth_curve_display')
    alignment = serializers.CharField(source='get_alignment_display')
    gender = serializers.CharField(source='get_gender_display')
    skill_1 = ActiveSkillSerializer(read_only=True)
    skill_2 = ActiveSkillSerializer(read_only=True)
    skill_3 = ActiveSkillSerializer(read_only=True)

    class Meta:
        model = Servant
        exclude = ()

class ServantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servant
        fields = ('id', 'name', 'np')