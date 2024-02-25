import { UseFormReturn } from "react-hook-form";

export enum EBreakpoints {
    XXS = 375,
    XS = 576,
    SM = 768,
    MD = 992,
    LG = 1200,
    XL = 1400,
    XXL = 1600,
  }

  export enum ESliderSection {
    HOME_SERVICE,
    TESTIMONIALS,
    SERVICE_PAGE,
    HOME,
    TESTIMONIALS_SERVICE_PAGE,
    HOME_SERVICE_DOCTOR,
  }

  export type TSliderProps = {
    image: string;
    text: string;
    nome?: string;
    cognome?: string;
  };

  export type ServiziProps = {
    icon: string;
    text: string;
  };

  export type DoctorCardProps = {
    image: string;
    name: string;
    surname: string;
    profession: string;
    mailto: string;
  }

  export enum EModalType {
    CREATE_PAZIENTE = "CREATE_PAZIENTE",
    CREATE_PIANO_CURA = "CREATE_PIANO_CURA" ,
    CREATE_DOCUMENTO = "CREATE_DOCUMENTO",
    CREATE_OPERATORE = "CREATE_OPERATORE",
    CREATE_PRESTAZIONE = "CREATE_PRESTAZIONE",
    CREATE_PAGAMENTO = "CREATE_PAGAMENTO",
    ADD_PRESTAZIONE_PIANOCURA = "ADD_PRESTAZIONE_PIANOCURA",
    CREATE_SEDE = "CREATE_SEDE",
    DETTAGLIO_EVENTO = "DETTAGLIO_EVENTO",
    ORA_ARRIVO = "ORA_ARRIVO",
    ORA_USCITA = "ORA_USCITA",
    ELIMINA_PRESTAZIONE_PIANOCURA = "ELIMINA_PRESTAZIONE_PIANOCURA",
    IMPOSTA_DATA_APPUNTAMENTO = "IMPOSTA_DATA_APPUNTAMENTO",
    IMPOSTA_ORARIO_APPUNTAMENTO = "IMPOSTA_ORARIO_APPUNTAMENTO",
    ELIMINA_OPERATORE = "ELIMINA_OPERATORE",
    MODIFICA_OPERATORE = "MODIFICA_OPERATORE",
    ELIMINA_PRESTAZIONE = "ELIMINA_PRESTAZIONE",
    MODIFICA_PRESTAZIONE = "MODIFICA_PRESTAZIONE",
    ELIMINA_SEDE = "ELIMINA_SEDE",
    MODIFICA_SEDE = "MODIFICA_SEDE",
    ELIMINA_DOCUMENTO = "ELIMINA_DOCUMENTO",
  }


  export enum ECalendarView {
    MONTH_VIEW,
    DAY_VIEW,
    WEEK_VIEW
  }

  export enum ESesso {
    MASCHIO = "MASCHIO",
    FEMMINA = "FEMMINA"
  }

  export enum EStatusStepper {
    COMPLETE = "COMPLETE",
    CURRENT = "CURRENT",
    UPCOMING = "UPCOMING",
  }

  export enum ERichiamo {
    NonRichiamare = "NonRichiamare",
    DopoUnMese = "DopoUnMese",
    Dopo2mesi = "Dopo2mesi",
    Dopo3mesi = "Dopo3mesi",
    Dopo4mesi = "Dopo4mesi",
    Dopo6mesi = "Dopo6mesi",
    Dopo8mesi = "Dopo8mesi",
    Dopo1anno = "Dopo1anno",
  }

  export type TUseFormReturnCreatePaziente = UseFormReturn<
  {
    email: string;
    nome: string;
    cognome: string;
    sesso: string;
    dataNascita: Date;
    straniero: boolean;
    luogoNascita: string;
    cf: string;
    indirizzo: string;
    cap: string;
    citta: string;
    cellulare: string;
    telefono: string;
    professione: string;
    richiamo: string;
    motivo: string;
    listino: string;
  },
  any,
  undefined
>

export enum EDOcumenti {
  "Consenso chirurgia" = "Consenso Chirurgia",
  "Consenso allineatori" = "Consenso Allineatori",
  "Consesno CBCT" = "Consesno CBCT",
  "Consenso endodenzia" = "Consenso Endodenzia",
  "Consenso protesi fissa" = "Consenso Protesi Fissa",
  "Consenso terzo molare" = "Consenso Terzo Molare",
  "Consenso protesi rimovibile" = "Consenso protesi rimovibile",
  "Istruzioni post chirurgia" = "Istruzioni post chirurgia",
  "Consenso ortodonzia fissa normale" = "Consenso ortodonzia fissa normale",
  "Trattamento dati personali" = "Trattamento dati personali",
}

export enum EDocumentiSMartTagSection {
  Diagnosi = "Diagnosi",
  Benefici = "Benefici",
  Rischi = "Rischi",
}

export type SmartTAGPropsDocument = {
  Diagnosi: string;
  Benefici: string;
  Rischi: string;
};

export enum EListino {
  GENTILE = "GENTILE",
  DEFAULT = "DEFAULT"
}