using System.Security.Claims;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Authorize]
[Route("cities/")]
public class CityController : ControllerBase
{
    private readonly ICityRepository repository;

    public CityController(ICityRepository repository)
    {
        this.repository = repository;
    }

    [HttpGet]
    public IActionResult GetCities()
    {
        var userId = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
        var cities = repository.GetAll(userId);
        return Ok(cities);
    }

    [HttpPost]
    public IActionResult AddCity(CityDto city)
    {
        var userId = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
        var cityNew = new City { CityName = city.CityName, Lat = city.Lat, Lon = city.Lon};
        repository.Add(cityNew, userId);
        return Ok(city);
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveCity(int id)
    {
        try
        {
            repository.DeleteById(id);
            return Ok();
        }
        catch (ArgumentNullException)
        {
            return NotFound();
        }
    }

    [HttpPatch]
    public IActionResult EditCity(CityDto city)
    {
        var entity = repository.GetById(city.Id);
        entity.Lat = city.Lat;
        entity.Lon = city.Lon;
        entity.CityName = city.CityName;
        repository.Update(entity);
        return Ok();
    }
}