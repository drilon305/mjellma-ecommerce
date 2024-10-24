'use client'

import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction, useState } from "react"
import { useFormContext } from "react-hook-form"

type InputTagsProps = InputProps & {
    value: string[],
    onChange: Dispatch<SetStateAction<string[]>>
}

export const InputTags = ({onChange, value}: InputTagsProps) => {
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [focused, setFocused] = useState(false);

  function addPendingDataPoint() {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  }

  const { setFocus } = useFormContext();

  return (
    <div
      className={
        (cn(
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ),
        focused
          ? "ring-offset-2 outline-none ring-ring ring-2"
          : "ring-offset-0 outline-none ring-ring ring-0")
      }
      onClick={() => setFocus("tags")}
    >
      <div className="flex">
        <Input
          value={pendingDataPoint}
          onClick={(e) => setFocused(true)}
          onBlurCapture={(e) => setFocused(false)}
          onChange={(e) => setPendingDataPoint(e.target.value)}
        />
      </div>
    </div>
  );
}