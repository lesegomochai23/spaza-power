using Microsoft.AspNetCore.Mvc;
using SpazaPower.Models;

namespace SpazaPower.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> _products = new List<Product>
    {
        new Product { Id = 1, Name = "Rechargeable LED Bulbs", Description = "Lasts 8 hours on a single charge. Perfect for spaza counters.", PriceZAR = 850, BulkQuantity = 12, Category = "Lighting" },
        new Product { Id = 2, Name = "Solar Power Bank (20,000mAh)", Description = "Keep your card machines and phones running during Stage 6.", PriceZAR = 4500, BulkQuantity = 10, Category = "Power" },
        new Product { Id = 3, Name = "Gas Stove & Cylinder Combo", Description = "Keep the kota grill running when the grid is down.", PriceZAR = 3200, BulkQuantity = 5, Category = "Cooking" },
        new Product { Id = 4, Name = "12V Deep Cycle Battery", Description = "Heavy-duty backup for fridges and security gates.", PriceZAR = 12500, BulkQuantity = 4, Category = "Power" }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return Ok(_products);
    }
}