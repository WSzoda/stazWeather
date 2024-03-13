using API.Models;

namespace API.Repositories.Interfaces;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
    IEnumerable<TEntity> GetAll();

    IEnumerable<TEntity> GetAll(int pageNumber, int RowCount);
    TEntity GetById(int id);

    void Add(TEntity entity);

    void Delete(TEntity entity);

    void DeleteById(int id);

    void Update(TEntity entity);
}