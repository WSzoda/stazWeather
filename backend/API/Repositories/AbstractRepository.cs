using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;


public abstract class AbstractRepository<TEntity> where TEntity : BaseEntity
{
    protected readonly AppDbContext context;
    protected readonly DbSet<TEntity> dbSet;

    protected AbstractRepository(AppDbContext context)
    {
        this.context = context;
        dbSet = context.Set<TEntity>();
    }
}