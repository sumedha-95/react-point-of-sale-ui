
import { useState } from "react";
import PosLayout from "../components/layout/PosLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("My POS Business");
  const [address, setAddress] = useState("123 Main Street");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [email, setEmail] = useState("contact@mybusiness.com");
  const [taxRate, setTaxRate] = useState("8.5");
  const [receiptEnabled, setReceiptEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Updated",
      description: "Your appearance settings have been updated successfully.",
    });
  };

  return (
    <PosLayout>
      <div className="h-full p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium">Business Name</label>
                  <Input 
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  <Input 
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="taxRate" className="text-sm font-medium">Tax Rate (%)</label>
                  <Input 
                    id="taxRate"
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between pt-7">
                  <span className="text-sm font-medium">Enable Receipt Printing</span>
                  <Switch 
                    checked={receiptEnabled}
                    onCheckedChange={setReceiptEnabled}
                  />
                </div>
              </div>
              <Button onClick={handleSaveGeneral} className="mt-4">Save Changes</Button>
            </TabsContent>
            
            <TabsContent value="appearance">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Dark Mode</span>
                  <Switch 
                    checked={darkModeEnabled}
                    onCheckedChange={setDarkModeEnabled}
                  />
                </div>
                <Button onClick={handleSaveAppearance} className="mt-4">Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <p className="text-gray-500">Notification settings coming soon.</p>
            </TabsContent>
            
            <TabsContent value="integrations">
              <p className="text-gray-500">Integration settings coming soon.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PosLayout>
  );
};

export default Settings;
