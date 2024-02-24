"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

const ButtonModal = ({
  value,
  type,
  children,
  variant,
  className,
}: {
  value?: string;
  type: string;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("modalOpen", "true");
    params.set("modalType", type);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant ?? "default"}
      className={className}
    >
      {value || children}
    </Button>
  );
};

export default ButtonModal;
