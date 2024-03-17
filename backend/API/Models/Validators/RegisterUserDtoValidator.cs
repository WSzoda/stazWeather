using System.Data;
using API.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Models.Validators;

public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
{
    private readonly AppDbContext _dbContext;
    private readonly DbSet<User> _dbSet;

    public RegisterUserDtoValidator(AppDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<User>();
        
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);

        RuleFor(x => x.Email).Custom((value, context) =>
        {
            bool emailInUse = _dbSet.Any(u => u.Email.Equals(value));
            if (emailInUse)
            {
                context.AddFailure("Email", "That email is taken");
            }
        });
    }
}