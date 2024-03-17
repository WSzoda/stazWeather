using System.Security.Claims;
using API.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Authorization;

public class ResourceOperationRequirementHandler : AuthorizationHandler<ResourceOperationRequirement, City> 
{

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ResourceOperationRequirement requirement, City city)
    {
        if (requirement.ResourceOperation == ResourceOperation.Read ||
            requirement.ResourceOperation == ResourceOperation.Create)
        {
            context.Succeed(requirement);
        }

        string userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
        if (city.CreatedById == int.Parse(userId))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}