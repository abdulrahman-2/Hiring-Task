"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address } from "@/lib/zod";
import AddressForm from "./forms/AddressForm";
import AddressCard from "./AddressCard";
import { MapPin } from "lucide-react";
import { getStoredAddresses, saveAddressesToStorage } from "@/lib/utils";

export default function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    setAddresses(getStoredAddresses());
  }, []);

  const handleAddAddress = (address: Address) => {
    console.log("Submitting Address:", address);
    const updatedAddresses = editingAddress
      ? addresses.map((addr) => (addr.id === address.id ? address : addr))
      : [...addresses, { ...address, id: Date.now().toString() }];

    console.log("Updated Addresses:", updatedAddresses);
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    console.log("Editing Address:", address);
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="text-[#642B24] space-y-3 m-3 w-full lg:w-4xl bg-[#FBF5F5] p-5 md:p-10">
      <h2 className="text-lg font-bold">العناوين المحفوظة</h2>

      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
            />
          ))}
        </div>
      ) : (
        <Card className="p-0">
          <CardContent className="text-[#642B24] p-3 text-center space-y-3">
            <p>لا توجد عناوين محفوظة.</p>
            <Button
              variant="outline"
              className=" h-11 w-full flex items-center justify-start gap-2 border border-[#9E6F2A]"
              onClick={handleAddNew}
            >
              <MapPin className="h-4 w-4" />
              أضف عنوانك الأول
            </Button>
          </CardContent>
        </Card>
      )}

      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#642B24]">
              {editingAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleAddAddress}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}

      {!isFormOpen && addresses.length > 0 && (
        <Button
          variant="outline"
          className="w-full h-11 flex items-center justify-start gap-2 border border-[#9E6F2A]"
          onClick={handleAddNew}
        >
          <MapPin className="h-4 w-4" />
          ادخل عنوان اخر
        </Button>
      )}
    </div>
  );
}
