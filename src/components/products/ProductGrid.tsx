
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
    image: "https://placehold.co/200x200?text=Burger",
    category: "Food"
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    price: 12.99,
    image: "https://placehold.co/200x200?text=Pizza",
    category: "Food"
  },
  {
    id: "3",
    name: "Chicken Salad",
    price: 7.99,
    image: "https://placehold.co/200x200?text=Salad",
    category: "Food"
  },
  {
    id: "4",
    name: "Coca Cola",
    price: 2.49,
    image: "https://placehold.co/200x200?text=Cola",
    category: "Drinks"
  },
  {
    id: "5",
    name: "Iced Coffee",
    price: 4.99,
    image: "https://placehold.co/200x200?text=Coffee",
    category: "Drinks"
  },
  {
    id: "6",
    name: "Chocolate Cake",
    price: 6.49,
    image: "https://placehold.co/200x200?text=Cake",
    category: "Desserts"
  },
  {
    id: "7",
    name: "Ice Cream",
    price: 3.99,
    image: "https://placehold.co/200x200?text=IceCream",
    category: "Desserts"
  },
  {
    id: "8",
    name: "French Fries",
    price: 3.49,
    image: "https://placehold.co/200x200?text=Fries",
    category: "Snacks"
  },
  {
    id: "9",
    name: "Nachos",
    price: 5.99,
    image: "https://placehold.co/200x200?text=Nachos",
    category: "Snacks"
  },
  {
    id: "10",
    name: "Milkshake",
    price: 4.49,
    image: "https://placehold.co/200x200?text=Milkshake",
    category: "Drinks"
  },
  {
    id: "11",
    name: "Caesar Salad",
    price: 8.49,
    image: "https://placehold.co/200x200?text=CaesarSalad",
    category: "Food"
  },
  {
    id: "12",
    name: "Muffin",
    price: 2.99,
    image: "https://placehold.co/200x200?text=Muffin",
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
