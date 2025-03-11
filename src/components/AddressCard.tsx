import { MapPin, Trash2 } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Address } from "@/lib/zod";
import { Separator } from "./ui/separator";
import { BiMessageAltEdit } from "react-icons/bi";

const AddressCard = ({
  address,
  handleDeleteAddress,
  handleEditAddress,
}: {
  address: Address;
  handleDeleteAddress: (id: string) => void;
  handleEditAddress: (address: Address) => void;
}) => {
  return (
    <Card className="p-0" key={address.id}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text/60">
            <MapPin className="h-4 w-4" />
            <h3>{address.title}</h3>
          </div>
          <div className="flex space-x-2 h-5">
            <BiMessageAltEdit
              className="h-[18px] w-[18px] text-text/60 cursor-pointer"
              onClick={() => handleEditAddress(address)}
            />

            <Separator orientation="vertical" />

            <Trash2
              className="h-4 w-4 text-red-600 cursor-pointer"
              onClick={() => handleDeleteAddress(address.id || "")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
