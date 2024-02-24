"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { PickerExample } from "../PickerExample";
import { createOperatore, getSede } from "@/actions/actions.clinica";
import { TagInput } from "../TagInput";
import { MultiSelect, OptionType } from "../MultiSelect";
import { json } from "stream/consumers";

const formSchema = z.object({
  nome: z.string().min(2).max(50),
  cognome: z.string().min(2).max(50),
  colore: z.string(),
  sede: z.array(z.string().min(2)),
});

const ModalCreateOperatore = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const [colore, setColore] = useState("red");
  const [sede, setSede] = useState<{ id: string; nome: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      colore: colore,
      sede: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createOperatore(values.nome, values.cognome, colore, values.sede);
    // console.log(values);
  }

  useEffect(() => {
    // Quando il componente si monta, richiama la funzione per ottenere i dati
    getSede().then((data) => setSede(data));
  }, []);

  return (
    <AlertDialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cognome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Cognome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colore</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Colore" {...field} /> */}
                  <PickerExample
                    background={colore}
                    setBackground={setColore}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sede"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sede</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={sede.map((item) => {
                      return {
                        value: item.id,
                        label: item.nome,
                      };
                    })}
                    {...field}
                    className="sm:w-[510px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseModal}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default ModalCreateOperatore;
