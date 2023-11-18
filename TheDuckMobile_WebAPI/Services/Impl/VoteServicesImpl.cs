using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services.Impl
{
    public class VoteServicesImpl : IVoteServices
    {
        private readonly DataContext _context;

        public VoteServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<VoteUserResponse>> CreateVote(Guid customerId, Guid productId, CreateVoteRequest request)
        {
            var product = await _context.Products
                .Include(p => p.Votes)!
                .ThenInclude(v => v.Customer)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product is null)
                throw new CustomNotFoundException("Product not found");

            var customer = await _context.Customers.FindAsync(customerId);
            if (customer is null)
                throw new CustomNotFoundException("Customer not found");

            // Check if customer already voted
            var vote = await _context.Votes
                .Include(v => v.Customer)
                .FirstOrDefaultAsync(v => v.CustomerId == customerId && v.ProductId == productId);


            // Update product rate
            product.Rate = (float)((product.Rate * product.Votes!.Count + request.Rating) / (product.Votes.Count + 1));

            if (vote != null)
            {
                vote.Content = request.Comment;
                vote.VoteRate = (float)request.Rating;
            }
            else
            {
                vote = new Vote
                {
                    CreatedAt = DateTime.Now,
                    Customer = customer,
                    Product = product,
                    Content = request.Comment,
                    VoteRate = (float)request.Rating
                };
                await _context.Votes.AddAsync(vote);

            }

            await _context.SaveChangesAsync();

            return product.Votes.Select(v => new VoteUserResponse(v)).ToList();
        }

        public async Task<ICollection<VoteUserResponse>> GetAllVotesByProductId(Guid productId)
        {
            var product = await _context.Products
                .Include(p => p.Votes)!
                .ThenInclude(v => v.Customer)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product is null)
                throw new CustomNotFoundException("Product not found");

            return product.Votes!.Select(v => new VoteUserResponse(v)).ToList();
        }
    }
}
