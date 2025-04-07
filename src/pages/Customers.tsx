
import { useState } from "react";
import { PlusCircle, Search, UserPlus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Customer } from "@/types/pos-types";
import { useToast } from "@/hooks/use-toast";
import CustomerForm from "@/components/customers/CustomerForm";
import PosLayout from "@/components/layout/PosLayout";

// Sample customer data
const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    createdAt: new Date("2023-01-15"),
    lastPurchase: new Date("2023-04-20"),
    totalSpent: 1250.75,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    address: "456 Oak Ave, Somewhere, USA",
    createdAt: new Date("2023-02-10"),
    lastPurchase: new Date("2023-04-18"),
    totalSpent: 795.25,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "555-123-4567",
    address: "789 Pine Rd, Nowhere, USA",
    createdAt: new Date("2023-03-05"),
    totalSpent: 0,
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const handleAddCustomer = (customer: Omit<Customer, "id" | "createdAt" | "totalSpent">) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      createdAt: new Date(),
      totalSpent: 0,
      ...customer,
    };

    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
    toast({
      title: "Customer Added",
      description: `${customer.name} has been added to your customers.`,
    });
  };

  const handleUpdateCustomer = (customer: Customer) => {
    setCustomers(
      customers.map((c) => (c.id === customer.id ? customer : c))
    );
    setSelectedCustomer(null);
    setIsDialogOpen(false);
    toast({
      title: "Customer Updated",
      description: `${customer.name}'s information has been updated.`,
    });
  };

  const handleDeleteCustomer = (id: string) => {
    const customerToDelete = customers.find((c) => c.id === id);
    setCustomers(customers.filter((customer) => customer.id !== id));
    toast({
      title: "Customer Deleted",
      description: `${customerToDelete?.name} has been removed from your customers.`,
      variant: "destructive",
    });
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  return (
    <PosLayout>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-bold">Customer Management</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedCustomer(null)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedCustomer ? "Edit Customer" : "Add New Customer"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedCustomer
                      ? "Update the customer details below."
                      : "Fill out the form below to add a new customer to your system."}
                  </DialogDescription>
                </DialogHeader>
                <CustomerForm
                  initialValues={selectedCustomer || undefined}
                  onSubmit={
                    selectedCustomer
                      ? handleUpdateCustomer
                      : handleAddCustomer
                  }
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search customers by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{customer.email}</span>
                            <span className="text-sm text-gray-500">
                              {customer.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.lastPurchase
                            ? new Date(customer.lastPurchase).toLocaleDateString()
                            : "Never"}
                        </TableCell>
                        <TableCell className="text-right">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PosLayout>
  );
};

export default Customers;
