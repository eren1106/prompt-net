import React, { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { IDropdownItem } from '@/models/dropdown-item.model';

interface DropdownMenuProps {
  children: ReactNode;
  title: string;
  items: IDropdownItem[]
  onClickItemById?: (id: number) => void;
}

const DropdownMenuButton = ({
  children,
  title,
  items,
  onClickItemById
}: DropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-96 overflow-y-scroll">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {
            items.map((item: IDropdownItem) => (
              <DropdownMenuItem onClick={() => {
                onClickItemById?.(item.key as number)
              }}>
                {/* <User className="mr-2 h-4 w-4" /> */}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuButton