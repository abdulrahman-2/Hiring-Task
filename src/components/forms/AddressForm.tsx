"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addressSchema, type Address } from "@/lib/zod";
import AddressFormField from "./AddressFormField";

interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (data: Address) => void;
  onCancel: () => void;
}

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const form = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      id: "",
      title: "",
      name: "",
      street: "",
      city: "",
      buildingNumber: "",
      country: "",
    },
  });

  const handleSubmit = (data: Address) => {
    onSubmit({
      ...data,
      id: initialData?.id || "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-7 gap-x-3">
          <AddressFormField
            control={form.control}
            name="title"
            label="عنوان الموقع"
            placeholder="المنزل، العمل، إلخ"
          />

          <AddressFormField
            control={form.control}
            name="name"
            label="الاسم"
            placeholder="أدخل الاسم"
          />

          <AddressFormField
            control={form.control}
            name="street"
            label="عنوان الشارع"
            placeholder="أدخل عنوان الشارع"
          />

          <AddressFormField
            control={form.control}
            name="city"
            label="المدينة"
            placeholder="أدخل المدينة"
          />

          <AddressFormField
            control={form.control}
            name="buildingNumber"
            label="الرمز البريدي"
            placeholder="أدخل رقم المبنى"
          />

          <AddressFormField
            control={form.control}
            name="country"
            label="الدولة"
            placeholder="أدخل الدولة"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#E8BA7B] to-[#A0712C]"
          >
            {initialData ? "حفظ التغييرات" : "اضافة العنوان"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-[#FF4C4D] to-[#FF021B]"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
}
