import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Address } from "@/lib/zod";
import { MapPin } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface AddressFormFieldProps {
  control: Control<Address>;
  name: keyof Address;
  label: string;
  placeholder: string;
}

export default function AddressFormField({
  control,
  name,
  label,
  placeholder,
}: AddressFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#642B24]/60">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                className="text-sm bg-[#FBF5F5] pr-8"
              />
              <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </FormControl>
          {error && (
            <FormMessage className="text-red-500 text-xs mt-1">
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
