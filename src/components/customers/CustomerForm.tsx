
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Customer } from "@/types/pos-types";
import { DialogFooter } from "../ui/dialog";

interface CustomerFormProps {
  initialValues?: Customer;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CustomerForm = ({ initialValues, onSubmit, onCancel }: CustomerFormProps) => {
  // Create a form with react-hook-form
  const form = useForm({
    defaultValues: initialValues ? {
      ...initialValues,
      // Convert Date objects to strings for the form
      createdAt: initialValues.createdAt?.toISOString().split('T')[0],
      lastPurchase: initialValues.lastPurchase?.toISOString().split('T')[0]
    } : {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  });

  const handleSubmit = (data: any) => {
    // Handle form submission
    const customerData = {
      ...initialValues,
      ...data,
    };
    
    onSubmit(customerData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Customer address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialValues ? "Update Customer" : "Add Customer"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CustomerForm;
