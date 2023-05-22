import { Text, TextInput } from "@tremor/react";
import React, { useState, useEffect, useRef } from "react";
import { formatCurrency } from "~/utils/currency";

interface EditableTextProps {
  defaultValue: number;
  symbol: string;
  onEnterPress: (value: number) => Promise<void>;
}

export default function EditableText({
  defaultValue,
  symbol,
  onEnterPress,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !error) {
      await onEnterPress(value);
      setEditing(false);
    }
  };

  return editing || !!error ? (
    <TextInput
      required
      error={!!error}
      defaultValue={defaultValue.toFixed(2)}
      ref={inputRef}
      onChange={(e) => {
        try {
          const inputValue = Number(e.target.value);

          if (inputValue < 0) throw new Error("Number must be positive");
          if (isNaN(inputValue)) throw new Error("Input must be a number");

          setError(undefined);

          return setValue(inputValue);
        } catch (error: any) {
          setError(error.message);
        }
      }}
      onKeyDown={handleKeyDown}
      onBlur={() => setEditing(false)}
      className="max-w-[5.5rem] min-w-[3rem] mr-[3px] max-h-[1.5rem]"
    />
  ) : (
    <div onClick={() => setEditing(true)}>
      <Text>{formatCurrency(symbol, defaultValue)}</Text>
    </div>
  );
}
