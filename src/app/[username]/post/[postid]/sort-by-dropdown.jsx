"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Component = ({sortOptions=[], selectedSort, setSelectedSort}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-fit justify-between">
          <span>Sort By: {selectedSort.label}</span>
          <ChevronsUpDown className="cursor-pointer ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="select-none">Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem 
            key={option.value} 
            onSelect={() => setSelectedSort(option)}
            className="flex items-center justify-between hover:bg-primary/30 cursor-pointer"
          >
            {option.label}
            {option.value === selectedSort.value && (
              <Check className="h-4 w-4"/>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Component;