"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EListino } from "@/enum/types";
import { useStore } from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SelectListino = () => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const { listino, setListino } = useStore((state) => state);

  const handleClick = (listino: string) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("listino", listino);
    // replace(`${pathname}?${params.toString()}`);
    setListino(listino as EListino);
  };
  return (
    <Select
      onValueChange={(e) => handleClick(e)}
      defaultValue={EListino.DEFAULT}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Scegli" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={EListino.DEFAULT} defaultChecked>
          Default
        </SelectItem>
        <SelectItem value={EListino.GENTILE}>Gentile</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectListino;
