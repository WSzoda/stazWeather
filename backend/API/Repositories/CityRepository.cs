using API.Data;
using API.Models;
using API.Repositories.Interfaces;

namespace API.Repositories;

public class CityRepository : AbstractRepository<City>, ICityRepository
{

    public CityRepository(AppDbContext context) : base(context)
    {
    }

    public void Add(City entity, int userId)
    {
        entity.CreatedById = userId;
        dbSet.Add(entity);
        context.SaveChanges();
    }

    public void Delete(City entity)
    {
        dbSet.Remove(entity);
        context.SaveChanges();
    }

    public void DeleteById(int id)
    {
        var entity = dbSet.FirstOrDefault(c => c.Id == id);
        ArgumentNullException.ThrowIfNull(entity);

        dbSet.Remove(entity);
        context.SaveChanges();
    }

    public IEnumerable<City> GetAll()
    {
        return dbSet.ToList();
    }

    public IEnumerable<City> GetAll(int pageNumber, int RowCount)
    {
        return dbSet.Skip(pageNumber * RowCount).Take(RowCount).ToList();
    }

    public City GetById(int id)
    {
        var entity = dbSet.FirstOrDefault(c => c.Id == id);
        ArgumentNullException.ThrowIfNull(entity);

        return entity;
    }

    public void Update(City entity)
    {
        dbSet.Update(entity);
        context.SaveChanges();
    }
}