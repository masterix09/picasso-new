"use client";
import {
  addOrarioAppuntamento,
  deletePrestazionePianoCuraById,
  getDataAppuntamentoPrestazioneById,
  getPrestazioneAgendaById,
  setOrarioArrivo,
  setOrarioUscita,
} from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  start: z.string().min(2).max(50),
  end: z.string().min(2).max(50),
});

const ModalImpostaOrario = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazione } = useStore((state) => state);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    getDataAppuntamentoPrestazioneById(idPrestazione).then((item) =>
      setData(item?.data_appuntamento ?? "")
    );
  }, [idPrestazione]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "",
      end: "",
    },
  });

  console.log(data);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const start = `${data}T${values.start}`;
    const end = `${data}T${values.end}`;

    addOrarioAppuntamento(idPrestazione, start, end);
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Imposta orario appuntamento</AlertDialogTitle>
      </AlertDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario inizio prestazione</FormLabel>
                <FormControl>
                  <Input placeholder="10:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario fine prestazione</FormLabel>
                <FormControl>
                  <Input placeholder="11:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <Button type="button" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default ModalImpostaOrario;
