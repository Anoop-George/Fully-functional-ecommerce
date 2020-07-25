from rest_framework import permissions


class IsAuthor(permissions.IsAuthenticated):

    def has_object_permission(self, request, view, obj):
        
        return obj.author == request.user

class IsAuthor2(permissions.BasePermission):
#special permission so that author can update the order details
    def has_object_permission(self, request, view, obj):
        
        return obj.user == request.user

# from rest_framework import permissions


# class IsAuthor(permissions.IsAuthenticated):

#     def has_object_permission(self, request, view, obj):
#         return self.has_permission(request, view) and obj.author == request.user