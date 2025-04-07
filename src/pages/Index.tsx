
import { useState } from "react";
import PosLayout from "../components/layout/PosLayout";
import ProductGrid from "../components/products/ProductGrid";
import Cart from "../components/cart/Cart";
import { Product } from "../types/pos-types";

const Index = () => {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <PosLayout>
      <div className="flex flex-col md:flex-row h-full gap-4">
        <div className="w-full md:w-2/3 overflow-auto">
          <ProductGrid addToCart={addToCart} />
        </div>
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg">
          <Cart 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            getCartTotal={getCartTotal}
          />
        </div>
      </div>
    </PosLayout>
  );
};

export default Index;
