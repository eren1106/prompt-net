"use client"

import React, { ReactNode, FC, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IDropdownItem } from "@/models/dropdown-item.model";

interface RadioSelectDropdownProps {
  buttonChild: ReactNode;
  label?: string;
  items: IDropdownItem[]
  footerChild?: ReactNode
}

const RadioSelectDropdown: FC<RadioSelectDropdownProps> = ({
  buttonChild,
  label,
  items,
  footerChild,
}) => {
  const [selectedValue, setSelectedValue] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonChild}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          {
            items.map((item: IDropdownItem) =>
              <DropdownMenuRadioItem value={item.key?.toString() ?? ""} key={item.key}>{item.label}</DropdownMenuRadioItem>
            )
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      {
        footerChild &&
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {footerChild}
          </DropdownMenuItem>
        </>
      }
    </DropdownMenu>
  )
}

export default RadioSelectDropdown;
