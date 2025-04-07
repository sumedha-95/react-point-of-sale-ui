
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, Settings, LogOut, PieChart, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface PosLayoutProps {
  children: React.ReactNode;
}

const PosLayout = ({ children }: PosLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (menuItem: string) => {
    toast({
      title: `${menuItem} clicked`,
      description: "This would navigate to the selected section in a full implementation.",
    });
    if (isMobile) {
      setSidebarOpen(false);
    }
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
                className="w-full justify-start py-3 mb-2"
                onClick={() => handleMenuClick("Dashboard")}
              >
                <PieChart className="h-5 w-5 mr-4" />
                Dashboard
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 mb-2 bg-primary/10"
                onClick={() => handleMenuClick("Sales")}
              >
                <ShoppingCart className="h-5 w-5 mr-4" />
                Sales
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 mb-2"
                onClick={() => handleMenuClick("Products")}
              >
                <Coffee className="h-5 w-5 mr-4" />
                Products
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 mb-2"
                onClick={() => handleMenuClick("Users")}
              >
                <User className="h-5 w-5 mr-4" />
                Users
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 mb-2"
                onClick={() => handleMenuClick("Settings")}
              >
                <Settings className="h-5 w-5 mr-4" />
                Settings
              </Button>
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500"
              onClick={() => handleMenuClick("Logout")}
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
              <h1 className="ml-4 text-lg font-semibold">Sales Register</h1>
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
