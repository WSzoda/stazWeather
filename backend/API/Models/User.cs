using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User : BaseEntity
{
    [Required] public string Email { get; set; } = string.Empty;
    [Required] public string PasswordHash { get; set; } = string.Empty;
    
    public int RoleId { get; set; }
    public virtual Role Role { get; set; }
}