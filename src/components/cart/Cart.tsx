
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  MinusCircle, 
  PlusCircle, 
  ShoppingCart, 
  CreditCard,
  Wallet,
  Banknote
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/pos-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartProps {
  cart: (Product & { quantity: number })[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const Cart = ({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  getCartTotal 
}: CartProps) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const processPayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Select payment method",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    // Process payment logic would go here in a real app
    toast({
      title: "Payment successful!",
      description: `Your order has been processed via ${paymentMethod}.`,
    });
    
    clearCart();
    setCheckoutOpen(false);
    setPaymentMethod(null);
  };

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.1; // 10% tax
  const grandTotal = cartTotal + tax;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Current Order
          </h2>
          {cart.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 h-8"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
            <ShoppingCart className="w-12 h-12 mb-2" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center p-2 border rounded-md">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded">
                  <img
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4"
          size="lg"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          <CreditCard className="mr-2 h-5 w-5" /> Checkout
        </Button>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your order by selecting a payment method below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="mb-3 font-medium">Order Summary:</h3>
            <div className="space-y-1 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <h3 className="mb-3 font-medium">Payment Method:</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === "Credit Card" ? "default" : "outline"}
                className="flex flex-col h-auto py-3"
                onClick={() => setPaymentMethod("Credit Card")}
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-sm">Credit Card</span>
              </Button>
              <Button
                variant={paymentMethod === "Cash" ? "default" : "outline"}
                className="flex flex-col h-auto py-3"
                onClick={() => setPaymentMethod("Cash")}
              >
                <Banknote className="h-6 w-6 mb-1" />
                <span className="text-sm">Cash</span>
              </Button>
              <Button
                variant={paymentMethod === "Digital Wallet" ? "default" : "outline"}
                className="flex flex-col h-auto py-3"
                onClick={() => setPaymentMethod("Digital Wallet")}
              >
                <Wallet className="h-6 w-6 mb-1" />
                <span className="text-sm">Digital Wallet</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline"
              onClick={() => setCheckoutOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={processPayment}>
              Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
