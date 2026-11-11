namespace SpazaPower.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal PriceZAR { get; set; }
    public int BulkQuantity { get; set; } 
    public string Category { get; set; } = string.Empty; 
}