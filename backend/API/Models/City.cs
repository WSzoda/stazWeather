namespace API.Models;

public class City : BaseEntity
{
    public string CityName { get; set; } = string.Empty;
    public int CreatedById { get; set; }
    public virtual User CreatedBy { get; set; }
}