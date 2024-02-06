"use client"

import React, { ReactNode, FC, useState } from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon } from '@radix-ui/react-icons';
import { IDropdownItem } from "@/models/dropdown-item.model"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface MultipleSelectDropdownProps {
  buttonChild: ReactNode;
  label?: string;
  items: IDropdownItem[]
  footerChild?: ReactNode
}

const MultipleSelectDropdown: FC<MultipleSelectDropdownProps> = ({
  buttonChild,
  label,
  items,
  footerChild,
}) => {
  // const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  // const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  // const [showPanel, setShowPanel] = useState<Checked>(false)
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleCheckedChange = (itemKey: string) => {
    const newList = [...checkedList];
    const index = newList.indexOf(itemKey);

    // This item havent checked
    if (index === -1) newList.push(itemKey);
    // This item had checked, so need to remove it
    else newList.splice(index, 1);

    setCheckedList(newList);
  }

  const isItemChecked = (itemKey: string) => checkedList.includes(itemKey);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonChild}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          items.map((item: IDropdownItem) => (
            <DropdownMenuCheckboxItem
              checked={isItemChecked(item.key)}
              onCheckedChange={(_) => {
                handleCheckedChange(item.key)
              }}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 p-1 cursor-pointer"
          onClick={() => { }}
        >
          {footerChild}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MultipleSelectDropdown;
