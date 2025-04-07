
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Customer } from "@/types/pos-types";
import { Check, ChevronDown, Search, UserPlus, X } from "lucide-react";

// Sample customer data - in a real app, this would come from your backend
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

interface CustomerSelectorProps {
  onSelect: (customer: Customer | null) => void;
  selectedCustomer: Customer | null;
}

const CustomerSelector = ({ onSelect, selectedCustomer }: CustomerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = sampleCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Customer</div>
        {selectedCustomer && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={() => onSelect(null)}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      {selectedCustomer ? (
        <div className="border rounded-md p-3 flex justify-between items-center">
          <div>
            <div className="font-medium">{selectedCustomer.name}</div>
            <div className="text-xs text-muted-foreground">
              {selectedCustomer.phone} • {selectedCustomer.email}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            Change
          </Button>
        </div>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              <span>
                {selectedCustomer ? selectedCustomer.name : "Select customer"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <div className="flex items-center border-b p-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="max-h-[300px] overflow-auto">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex cursor-pointer items-center justify-between p-2 hover:bg-accent"
                    onClick={() => {
                      onSelect(customer);
                      setIsOpen(false);
                    }}
                  >
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {customer.phone}
                      </div>
                    </div>
                    {selectedCustomer?.id === customer.id && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-sm">No customers found</div>
              )}
            </div>
            <div className="flex items-center justify-center border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Customer
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default CustomerSelector;
