
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/types/pos-types";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { name, price, image } = product;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square bg-gray-100">
        <img
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm truncate">{name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold">${price.toFixed(2)}</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 w-7 p-0"
            onClick={onAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
