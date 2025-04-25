import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 border px-2 py-2 border-solid border-black h-full">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Decrease quantity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0001 10.8334H5.00008C4.54175 10.8334 4.16675 10.4584 4.16675 10C4.16675 9.54169 4.54175 9.16669 5.00008 9.16669H15.0001C15.4584 9.16669 15.8334 9.54169 15.8334 10C15.8334 10.4584 15.4584 10.8334 15.0001 10.8334Z"
            fill="#0D0D0D"
          />
        </svg>
      </button>
      <div className="font-normal text-lg text-[#0D0D0D] min-w-[20px] text-center">
        {quantity}
      </div>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Increase quantity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0001 10.8334H10.8334V15C10.8334 15.4584 10.4584 15.8334 10.0001 15.8334C9.54175 15.8334 9.16675 15.4584 9.16675 15V10.8334H5.00008C4.54175 10.8334 4.16675 10.4584 4.16675 10C4.16675 9.54169 4.54175 9.16669 5.00008 9.16669H9.16675V5.00002C9.16675 4.54169 9.54175 4.16669 10.0001 4.16669C10.4584 4.16669 10.8334 4.54169 10.8334 5.00002V9.16669H15.0001C15.4584 9.16669 15.8334 9.54169 15.8334 10C15.8334 10.4584 15.4584 10.8334 15.0001 10.8334Z"
            fill="#0D0D0D"
          />
        </svg>
      </button>
    </div>
  );
};