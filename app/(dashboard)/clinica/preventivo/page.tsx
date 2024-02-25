"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TPrestazionePreventivo,
  columnsGentile,
  columnsDefault,
  columnsPagamenti,
  TPagamentiPreventivo,
} from "./columns";
import { DataTable } from "./data-table";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { db } from "@/lib/db";
import SelectListino from "@/components/dashboard/PianoDiCura/preventivo/SelectListino";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import {
  getPagamentiByIdPiano,
  getPrestazioniByIdPiano,
} from "@/actions/actions.clinica";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { idPiano } = useStore((state) => state);
  const [data, setData] = useState<TPrestazionePreventivo[]>([]);
  const [pagamenti, setPagamenti] = useState<TPagamentiPreventivo[]>([]);

  useEffect(() => {
    if (idPiano) {
      getPrestazioniByIdPiano(idPiano).then((data) => setData(data));
      getPagamentiByIdPiano(idPiano).then((data) => setPagamenti(data));
    }
  }, [idPiano]);

  const calculateTotale = () => {
    let costo: number = 0;
    if (searchParams.listino === "gentile") {
      data.map((item) => (costo = costo + (item.costoGentile ?? 0)));
    } else {
      data.map((item) => (costo = costo + (item.costoDefault ?? 0)));
    }
    return costo;
  };

  return (
    <div className="container flex flex-col gap-y-5">
      <div className="w-full flex flex-col md:flex-row border-2  shadow-lg">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-b-gray-900 p-3 w-full">
          <p className="text-md text-gray-500">Data preventivo</p>
          <p className="text-xl font-bold text-black">31/01/2024</p>
        </div>
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-b-gray-900  p-3 w-full">
          <p className="text-md text-gray-500">Listino</p>
          <SelectListino />
        </div>
        <div className=" p-3 w-full">
          <p className="text-md text-gray-500">Sconto</p>
          <div className="w-full flex items-center gap-2">
            <Input placeholder="0" className="w-[100px]" />
            <span className="text-gray-400">%</span>
          </div>
        </div>
      </div>

      <DataTable
        columns={
          searchParams.listino === "gentile" ? columnsGentile : columnsDefault
        }
        data={data}
      />

      <div className="ml-auto right-0 w-fit bg-white rounded p-3 shadow-xl">
        <h3 className="font-bold">
          Totale <span className="font-normal">{calculateTotale()}$</span>
        </h3>
      </div>

      <div className="w-full rounded-lg p-4">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-bold my-3">Pagamenti e acconti</h3>
          <ButtonModal
            type={EModalType.CREATE_PAGAMENTO}
            value="Crea pagamento"
          />
        </div>
        <DataTable columns={columnsPagamenti} data={pagamenti} />
      </div>
    </div>
  );
}
