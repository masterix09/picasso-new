import { addPrestazionePianoCura, createPaziente } from "@/actions/actions.clinica";
import useGetSearchParams from "@/utils/useGetSearchParams";
import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"
import { z } from "zod";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formSchema: z.ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny, {
  [x: string]: any;
}, {
  [x: string]: any;
}> = z.object({})


// 2. Define a submit handler.
export function onSubmitCreatePaziente(values: z.infer<typeof formSchema >) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  // console.log(values);
  const {
    cap,
    cellulare,
    cf,
    citta,
    cognome,
    dataNascita,
    email,
    indirizzo,
    listino,
    luogoNascita,
    motivo,
    nome,
    professione,
    richiamo,
    sesso,
    straniero,
    telefono,
  } = values;

  const data = format(new Date(dataNascita), "yyyy-MM-dd");

  createPaziente(
    nome,
    cognome,
    data,
    sesso,
    cf,
    straniero,
    luogoNascita,
    indirizzo,
    cap,
    citta,
    telefono,
    email,
    cellulare,
    motivo,
    listino,
    richiamo,
    professione
  );
}
// 2. Define a submit handler.
export function onSubmitCreatePrestazione(values: z.infer<typeof formSchema >, idPiano: string, idDente: string) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.  
  addPrestazionePianoCura(values.prestazioni, idPiano, idDente, values.sede, values.operatore)
}


// 2. Define a submit handler.
export function onSubmitCreateDocumento(values: z.infer<typeof formSchema >, idPiano: string, idDente: string) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.  
  addPrestazionePianoCura(values.prestazioni, idPiano, idDente, values.sede, values.operatore)
}


