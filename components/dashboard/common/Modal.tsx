"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EModalType } from "@/enum/types";
import ModalCreatePianoCura from "../ModalDashboard/ModalCreatePianoCura";
import ModalCreatePaziente from "../ModalDashboard/ModalCreatePaziente";
import ModalAddPrestazionePianoCura from "../ModalDashboard/ModalAddPrestazionePianoCura";
import ModalCreatePrestazione from "../ModalDashboard/ModalCreatePrestazione";
import ModalCreateOperatore from "../ModalDashboard/ModalCreateOperatore";
import ModalCreateSede from "../ModalDashboard/ModalCreateSede";
import ModalCreatePagamento from "../ModalDashboard/ModalCreatePagamento";
import CreateDocumento from "../ModalDashboard/createDocumento/CreateDocumento";
import ModalDettaglio from "../ModalDashboard/modalAgenda/ModalDettaglio";
import ModalArrivo from "../ModalDashboard/modalAgenda/ModalArrivo";
import ModalUscita from "../ModalDashboard/modalAgenda/ModalUscita";
import ModalDeletePrestazionePianoCura from "../ModalDashboard/pianoCuraPrestazione/ModalDeletePrestazionePianoCura";
import ModalDataAppuntamento from "../ModalDashboard/pianoCuraPrestazione/ModalDataAppuntamento";
import ModalImpostaOrario from "../ModalDashboard/pianoCuraPrestazione/ModalImpostaOrario";
import ModalDeletePrestazione from "../ModalDashboard/prestazioni/ModalDeletePrestazione";
import ModalDeleteSede from "../ModalDashboard/sede/ModalDeleteSede";
import ModalEliminaOperatore from "../ModalDashboard/operatore/ModalEliminaOperatore";
import ModalDeleteDocumento from "../ModalDashboard/documento/ModalDeleteDocumento";

const Modal = () => {
  const searchParams = useSearchParams();
  const open = searchParams.get("modalOpen");
  const type = searchParams.get("modalType");
  const idCliente = searchParams.get("idCliente");
  const idPiano = searchParams.get("idPiano");

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modalOpen");
    params.delete("modalType");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AlertDialog open={(open as unknown as boolean) ?? false}>
      {type === EModalType.ADD_PRESTAZIONE_PIANOCURA && (
        <ModalAddPrestazionePianoCura handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_PRESTAZIONE && (
        <ModalCreatePrestazione handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_OPERATORE && (
        <ModalCreateOperatore handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_SEDE && (
        <ModalCreateSede handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_PIANO_CURA && (
        <ModalCreatePianoCura
          idCliente={idCliente}
          handleCloseModal={handleCloseModal}
        />
      )}
      {type === EModalType.CREATE_PAZIENTE && (
        <ModalCreatePaziente handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_DOCUMENTO && (
        <CreateDocumento handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.CREATE_PAGAMENTO && (
        <ModalCreatePagamento
          handleCloseModal={handleCloseModal}
          idPiano={idPiano}
        />
      )}
      {type === EModalType.DETTAGLIO_EVENTO && (
        <ModalDettaglio handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ORA_ARRIVO && (
        <ModalArrivo handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ORA_USCITA && (
        <ModalUscita handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ELIMINA_PRESTAZIONE_PIANOCURA && (
        <ModalDeletePrestazionePianoCura handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.IMPOSTA_DATA_APPUNTAMENTO && (
        <ModalDataAppuntamento handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.IMPOSTA_ORARIO_APPUNTAMENTO && (
        <ModalImpostaOrario handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.MODIFICA_OPERATORE && (
        <ModalCreateOperatore handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ELIMINA_OPERATORE && (
        <ModalEliminaOperatore handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ELIMINA_PRESTAZIONE && (
        <ModalDeletePrestazione handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ELIMINA_SEDE && (
        <ModalDeleteSede handleCloseModal={handleCloseModal} />
      )}
      {type === EModalType.ELIMINA_DOCUMENTO && (
        <ModalDeleteDocumento handleCloseModal={handleCloseModal} />
      )}
    </AlertDialog>
  );
};

export default Modal;
