using System.Text.Json.Serialization;

namespace API.Models;

public class City : BaseEntity
{
    public string CityName { get; set; } = string.Empty;
    public float Lat { get; set; }
    public float Lon { get; set; }
    [JsonIgnore]
    public int CreatedById { get; set; }
    [JsonIgnore]
    public virtual User CreatedBy { get; set; }
}