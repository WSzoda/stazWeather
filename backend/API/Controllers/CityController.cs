using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
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
        var cities = repository.GetAll();
        return Ok(cities);
    }

    [HttpPost]
    public IActionResult AddCity(City city)
    {
        repository.Add(city);
        return Ok();
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
    public IActionResult EditCity(City city)
    {
        repository.Update(city);
        return Ok();
    }
}