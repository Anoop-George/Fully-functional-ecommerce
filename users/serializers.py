from rest_framework import serializers
from . models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    emailid = serializers.ReadOnlyField()

    class Meta:
        model = Profile

        fields = ('name', 'user', 'address', 'phone', 'emailid')
