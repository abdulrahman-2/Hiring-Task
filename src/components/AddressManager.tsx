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
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    setAddresses(getStoredAddresses());
  }, []);

  const handleAddAddress = (address: Address) => {
    const updatedAddresses = editingAddress
      ? addresses.map((addr) => (addr.id === address.id ? address : addr))
      : [...addresses, { ...address, id: Date.now().toString() }];

    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
    setEditingAddress(null);
    setIsAddingNew(false);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddingNew(false);
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsAddingNew(true);
  };

  const handleCancel = () => {
    setEditingAddress(null);
    setIsAddingNew(false);
  };

  return (
    <div className="text-text space-y-3 m-3 w-full lg:w-4xl bg-[var(--background-main)] p-5 md:p-10">
      <h2 className="text-lg font-bold">العناوين المحفوظة</h2>

      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id}>
              <AddressCard
                address={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
              {editingAddress?.id === address.id && (
                <Card className="mt-2">
                  <CardHeader>
                    <CardTitle className="text-text">تعديل العنوان</CardTitle>
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
            </div>
          ))}

          {isAddingNew && (
            <Card className="mt-2">
              <CardHeader>
                <CardTitle className="text-text">إضافة عنوان جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm
                  onSubmit={handleAddAddress}
                  onCancel={handleCancel}
                />
              </CardContent>
            </Card>
          )}

          {!isAddingNew && (
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
      ) : (
        <Card className="p-0">
          <CardContent className="text-text p-3 space-y-3">
            {isAddingNew ? (
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle className="text-text">إضافة عنوان جديد</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    onSubmit={handleAddAddress}
                    onCancel={handleCancel}
                  />
                </CardContent>
              </Card>
            ) : (
              <>
                <p>لا توجد عناوين محفوظة.</p>
                <Button
                  variant="outline"
                  className="h-11 w-full flex items-center justify-start gap-2 border border-[#9E6F2A]"
                  onClick={handleAddNew}
                >
                  <MapPin className="h-4 w-4" />
                  أضف عنوانك الأول
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
