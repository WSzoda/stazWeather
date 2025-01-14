using System.ComponentModel.DataAnnotations;

namespace API.Models;

public abstract class BaseEntity
{
    [Key]
    public int Id { get; set; }
    protected BaseEntity(int id)
    { this.Id = id; }
    protected BaseEntity()
    { this.Id = 0; }
}