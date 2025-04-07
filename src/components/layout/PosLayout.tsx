
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, Settings, LogOut, PieChart, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

interface PosLayoutProps {
  children: React.ReactNode;
}

const PosLayout = ({ children }: PosLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logout clicked",
      description: "This would log out a user in a full implementation.",
    });
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Check if the current path matches the link's path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-bold">POS System</h1>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/">
                  <PieChart className="h-5 w-5 mr-4" />
                  Dashboard
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/sales') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/sales">
                  <ShoppingCart className="h-5 w-5 mr-4" />
                  Sales
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/products') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/products">
                  <Coffee className="h-5 w-5 mr-4" />
                  Products
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/customers') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/customers">
                  <User className="h-5 w-5 mr-4" />
                  Customers
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/users') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/users">
                  <User className="h-5 w-5 mr-4" />
                  Users
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start py-3 mb-2 ${isActive('/settings') ? 'bg-primary/10' : ''}`}
                asChild
              >
                <Link to="/settings">
                  <Settings className="h-5 w-5 mr-4" />
                  Settings
                </Link>
              </Button>
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <h1 className="ml-4 text-lg font-semibold">
                {location.pathname === "/" && "Sales Register"}
                {location.pathname === "/sales" && "Sales Overview"}
                {location.pathname === "/products" && "Product Management"}
                {location.pathname === "/customers" && "Customer Management"}
                {location.pathname === "/users" && "User Management"}
                {location.pathname === "/settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">John Cashier</span>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PosLayout;
