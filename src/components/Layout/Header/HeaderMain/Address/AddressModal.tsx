import { useState } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import AddressMap from "./AddressMap";
import SearchAddress from "./SearchAddress";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddressModal = ({ isOpen, onClose }: AddressModalProps) => {
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]);

  if (!isOpen) {
    return null;
  }

  const handleAddressSelect = (lat: number, lng: number, address: string) => {
    setPosition([lat, lng]);

    console.log("آدرس انتخاب شده:", address);
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      dir="rtl"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4"
    >
      <div className="relative flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              انتخاب موقعیت مکانی
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              برای تحویل به‌موقع سفارش، موقعیت را دقیق انتخاب کنید.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <LuX size={22} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 p-4">
          <div className="h-full w-full overflow-hidden rounded-xl">
            <SearchAddress onSelect={handleAddressSelect} />
            <AddressMap position={position} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddressModal;
