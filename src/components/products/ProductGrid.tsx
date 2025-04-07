
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/pos-types";
import ProductCard from "./ProductCard";

// Sample data
const CATEGORIES = ["All", "Food", "Drinks", "Desserts", "Snacks"];

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cheeseburger",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
    category: "Food"
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=500&fit=crop",
    category: "Food"
  },
  {
    id: "3",
    name: "Chicken Salad",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    category: "Food"
  },
  {
    id: "4",
    name: "Coca Cola",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1629203432180-71e9b1b amnc36?w=500&h=500&fit=crop",
    category: "Drinks"
  },
  {
    id: "5",
    name: "Iced Coffee",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1574086786874-e7054e2f6af5?w=500&h=500&fit=crop",
    category: "Drinks"
  },
  {
    id: "6",
    name: "Chocolate Cake",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
    category: "Desserts"
  },
  {
    id: "7",
    name: "Ice Cream",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
    category: "Desserts"
  },
  {
    id: "8",
    name: "French Fries",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=500&fit=crop",
    category: "Snacks"
  },
  {
    id: "9",
    name: "Nachos",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&h=500&fit=crop",
    category: "Snacks"
  },
  {
    id: "10",
    name: "Milkshake",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&h=500&fit=crop",
    category: "Drinks"
  },
  {
    id: "11",
    name: "Caesar Salad",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=500&fit=crop",
    category: "Food"
  },
  {
    id: "12",
    name: "Muffin",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=500&fit=crop",
    category: "Desserts"
  }
];

interface ProductGridProps {
  addToCart: (product: Product) => void;
}

const ProductGrid = ({ addToCart }: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const filterProducts = () => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const filteredProducts = filterProducts();

  return (
    <div className="h-full flex flex-col">
      {/* Search and filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-grow overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center p-10">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
