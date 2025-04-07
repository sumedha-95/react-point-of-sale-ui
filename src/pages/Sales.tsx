
import PosLayout from "../components/layout/PosLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Sales = () => {
  const { toast } = useToast();
  
  return (
    <PosLayout>
      <div className="h-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Overview</h1>
          <Button onClick={() => toast({ title: "This feature is coming soon", description: "Sales reports will be available in a future update." })}>
            Export Reports
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Today's Sales</h2>
            <p className="text-3xl font-bold">$1,245.89</p>
            <p className="text-sm text-green-600 mt-2">+15% from yesterday</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Weekly Sales</h2>
            <p className="text-3xl font-bold">$8,942.50</p>
            <p className="text-sm text-green-600 mt-2">+8% from last week</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Monthly Sales</h2>
            <p className="text-3xl font-bold">$32,758.21</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 px-4">Transaction ID</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#TXN-5647</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">Today, 10:30 AM</td>
                  <td className="py-2 px-4">$125.00</td>
                  <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#TXN-5646</td>
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4">Today, 9:15 AM</td>
                  <td className="py-2 px-4">$85.50</td>
                  <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#TXN-5645</td>
                  <td className="py-2 px-4">Robert Johnson</td>
                  <td className="py-2 px-4">Yesterday, 5:30 PM</td>
                  <td className="py-2 px-4">$210.75</td>
                  <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PosLayout>
  );
};

export default Sales;
