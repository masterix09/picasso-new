import { db } from "@/lib/db";
import { differenceInDays, differenceInYears, format } from "date-fns";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Page() {
  const appuntamenti = await db.prestazione.findMany({
    where: {
      data_appuntamento: format(new Date(), "yyyy-MM-dd"),
    },
    include: {
      pianoCura: {
        include: {
          cliente: true,
        },
      },
    },
  });

  const currentDate = format(new Date(), "yyyy-MM-dd");

  const compleanni = await db.cliente.findMany({
    where: {
      data_nascita: {
        endsWith: currentDate.substring(5),
      },
    },
  });

  const cliente = await db.cliente.findMany({
    where: {
      Richiamo: {
        not: {
          equals: "Non Richiamare",
        },
      },
    },
  });

  return (
    <div className="w-full flex flex-col md:flex-row gap-y-6 md:gap-x-6 p-4">
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Appuntamenti oggi
        </h3>
        {appuntamenti.map((item, idx) => {
          return (
            <div
              className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
              key={item.id}
            >
              <span className="text-xl font-bold text-white bg-slate-800 rounded-full w-9 h-8 text-center">
                {idx + 1}
              </span>
              <div className="w-full">
                <p className="text-xl font-semibold">
                  {item.pianoCura.cliente.cognome} {item.pianoCura.cliente.nome}
                </p>
                <p className="text-md font-normal">
                  {item.nome} {item.start?.substring(item.start.length, 11)} -{" "}
                  {item.end?.substring(item.end.length, 11)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Compleanni Oggi
        </h3>
        {compleanni.map((item, idx) => {
          return (
            <div
              className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
              key={idx}
            >
              <span className="text-xl font-bold text-white">
                <Image
                  src="/gestionale/clinica/cake.svg"
                  alt="torta"
                  width={40}
                  height={40}
                />
              </span>
              <div className="w-full">
                <p className="text-xl font-semibold">
                  {item.cognome} {item.nome}
                </p>
                <p className="text-md font-normal">
                  {differenceInYears(
                    format(new Date(), "yyyy-MM-dd"),
                    item.data_nascita!
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Richiami
        </h3>
        {cliente.map((item, idx) => {
          return (
            differenceInDays(new Date(item.data_richiamo!), new Date()) >= 0 &&
            differenceInDays(new Date(item.data_richiamo!), new Date()) <
              11 && (
              <div
                className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
                key={idx}
              >
                <span className="text-xl font-bold text-white bg-slate-800 rounded-full w-9 h-8 text-center">
                  {idx + 1}
                </span>
                <div className="w-full">
                  <p className="text-xl font-semibold">
                    {item.cognome} {item.nome}
                  </p>
                  <p className="text-md font-normal">{item.data_richiamo}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
