"use server"

import { TDocument } from "@/app/(dashboard)/clinica/documenti/columns";
import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import { db } from "@/lib/db"
import { EStatusPrestazione } from "@/types";
import { format } from "date-fns";
import { create } from "domain";
import { revalidatePath, revalidateTag } from "next/cache";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from 'uuid';

export async function getPazienti () {
    return db.cliente.findMany()
}

export async function getPrestazioniAgenda() {
    return db.prestazione.findMany({
        include: {
            pianoCura: {
                include: {
                    cliente: {
                        select: {
                            nome: true,
                            cognome: true
                        }
                    }
                }
            }
        }
      });
}

export async function createPianoCura (titolo: string, clienteId: string) {
    await db.pianoCura.create({
        data: {
            titolo,
            id: uuidv4(),
            clienteId: clienteId
        }
    })

    // revalidatePath("/clinica/pianoCura")
    revalidateTag("/clinica/pianoCura")
}

export async function getPrestazioniList () {
    return await db.prestazioniLista.findMany();
}

export async function addPrestazionePianoCura (array: string[], idPiano: string, idDente: string, sede: string, operatoreId: string) {

    const prestazioni: TPrestazioneLista[] = await db.prestazioniLista.findMany({
        where: {
            id: {
                in: [...array]
            }
        }
    })

    console.log("prestazioni where id equals to arrayId => ", prestazioni)

    const prestazioniAdd = prestazioni.map( (item) => {
        return {
            id: uuidv4(),
            nome: item.nome,
            categoria: item.categoria,
            status: EStatusPrestazione.Prescritto,
            createdAt: "",
            costoGentile: Number(item.costoGentile),
            costoDefault: Number(item.costoDefault),
            pianoCuraId: idPiano,
            operatoreId: operatoreId,
            denteId: idDente,
            sedeId: sede ?? ""
        }
    })

    await db.prestazione.createMany({
        data: [...prestazioniAdd],
      });

    revalidatePath("/clinica/pianoCura")
}

export async function createPrestazioneList (titolo: string, categoria: string, forWho: string, costoDefault: number, costoGentile: number) {
    await db.prestazioniLista.create({
        data: {
            id: uuidv4(),
            nome: titolo,
            categoria,
            forWho,
            costoGentile,
            costoDefault,
        }
    })

    revalidatePath("/prestazioniLista")
}


export async function createOperatore (nome: string, cognome: string, colore: string, sede: string[]) {

    const idOperatore = uuidv4();

    await db.operatore.create({
        data: {
            id: idOperatore,
            nome,
            cognome,
            colorAgenda: colore,
        }
    })

    const temp = sede.map( (item) => {
        return {
            operatoreId: idOperatore,
            sedeId: item,
        }
    })

   

    await db.operatoreOnSede.createMany({
        data: [...temp],
      });

    revalidatePath("/operatoriLista")
}

export async function getSede () {
    return await db.sede.findMany({
        select: {
            id: true,
            nome: true
        }
    })

}

export async function createSede (nome: string) {
    await db.sede.create({
        data: {
            id: nome,
            nome
        }
    })

    revalidatePath("/sediLista")
}

export async function createPagamento (data: string, importo: number, note: string, idPiano: string) {
    await db.pagamenti.create({
        data: {
            id: uuidv4(),
            createdAt: data,
            importo: importo,
            note,
            pianoCuraId: idPiano
        }
    })

    revalidatePath("/clinica/preventivo")
}

export async function createPaziente (nome: string, cognome: string, dataNascita: string, sesso: string, cf: string, straniero: boolean, luogoNascita: string, indirizzo: string, cap: string, citta: string, telefono: string, email: string, cellulare: string, motivo: string, listino: string, richiamo: string, professione: string) {
    await db.cliente.create({
        data: {
            id: uuidv4(),
            CAP: cap,
            cellulare,
            citta,
            codice_fiscale: cf,
            cognome,
            data_nascita: dataNascita,
            data_richiamo: richiamo,
            email,
            indirizzo,
            Listino: listino,
            luogo_nascita: luogoNascita,
            Motivo: motivo,
            nome,
            Professione: professione,
            Richiamo: richiamo,
            sesso,
            straniero: straniero,
            Telefono: telefono,
        }
    })

    revalidatePath("/clinica", "layout")

}

export async function createImage (array: string[], idPiano: string) {

    const obj = array.map( (item) => {
        return {
          id: uuidv4(),
          url: item,
          pianoCuraId: idPiano,
          note: ""
        }
      })

    console.log("id piano => ", idPiano)

    await db.image.createMany({
        data: [...obj]
    })
}


export async function createDocumento (idPiano: string, nome: string) {

    await db.documenti.create({
        data: {
            id: uuidv4(),
            nome,
            createdAt: format(new Date(), "dd-MM-yyyy"),
            url: "",
            pianoCuraId: idPiano
        }
    })
}


export async function getOperatore () {
    return await db.operatore.findMany({
        select: {
            id: true,
            cognome: true,
            nome: true,
            note: true,
            colorAgenda: true
        }
    })
}


export async function updateNote (formData: FormData) {
    console.log(formData)
}

export async function getDocument (idPiano: string) {
    return await db.documenti.findMany({
        where: {
          pianoCuraId: idPiano,
        },
      });

     
}


export async function getPrestazioniByIdPiano (idPiano: string) {
    return  await db.prestazione.findMany({
        where: {
          pianoCuraId: idPiano,
        },
        select: {
          id: true,
          nome: true,
          categoria: true,
          denteId: true,
          costoDefault: true,
          costoGentile: true,
        },
      });
}

export async function getPagamentiByIdPiano (idPiano: string) {
    return await db.pagamenti.findMany({
        where: {
          pianoCuraId: idPiano,
        },
        select: {
          id: true,
          createdAt: true,
          note: true,
          importo: true,
        },
      });
}

export async function getPrestazioneAgendaById (idPrestazione: string) {
    return await db.prestazione.findFirst({
        where: {
            id: idPrestazione
        },
        select: {
            categoria: true,
            nome: true,
            operatore: {
                select: {
                    nome: true,
                    cognome: true,
                    id: true
                }
            },
            pianoCura: {
                select: {
                    cliente: {
                        select: {
                            nome: true,
                            cognome: true
                        }
                    }
                }
            },
            ora_arrivo: true,
            ora_saluta: true
        }
    })
}


export async function setOrarioArrivo (orario: string, idPrestazione: string) {
    await db.prestazione.update({
        where: {
            id: idPrestazione,
        },
        data: {
            ora_arrivo: orario
        }
    })
}

export async function setOrarioUscita (orario: string, idPrestazione: string) {
    await db.prestazione.update({
        where: {
            id: idPrestazione,
        },
        data: {
            ora_saluta: orario
        }
    })
}


export async function deletePrestazionePianoCuraById (idPrestazione: string) {
    await db.prestazione.delete({
        where: {
            id: idPrestazione
        },
        
    })
    revalidatePath("/clinica/pianoCura")
}

export async function addDataAppuntamento (idPerstazione: string, date: string) {
    await db.prestazione.update({
        where: {
            id: idPerstazione
        },
        data: {
            data_appuntamento: date
        }
    })
}

export async function addOrarioAppuntamento (idPerstazione: string, start: string, end: string) {
    await db.prestazione.update({
        where: {
            id: idPerstazione
        },
        data: {
            start,
            end
        }
    })
}
export async function getDataAppuntamentoPrestazioneById (idPrestazione: string) {
    return await db.prestazione.findFirst({
        where: {
            id: idPrestazione
        },
        select: {
            data_appuntamento: true
        }
    })
}

export async function deleteOperatoreById (idOperatore: string) {
    await db.operatore.delete({
        where: {
            id: idOperatore
        }
    })
}

export async function getOperatoreById (idOperatore: string) {
    // return await db.operatore.findFirst({
    //     where: {
    //         id: idOperatore
    //     }
    // })

    return await db.operatoreOnSede.findFirst({
        where: {
            operatoreId: idOperatore,
        },
        select: {
            operatore: {
                select: {
                    cognome: true,
                    colorAgenda: true,
                    id: true,
                    nome: true,
                    note: true,
                }
            },
            sede: {
                select: {
                    nome: true
                }
            }
        }
    })
}


export async function deletePrestazioneById (idPrestazione: string) {

    await db.prestazione.delete({
        where: {
            id: idPrestazione
        }
    })
}

export async function deleteSedeById (idSede: string) {
    await db.sede.delete({
        where: {
            id: idSede
        }
    })
}


export async function deleteDocumentoById (idDocumento: string) {
    await db.documenti.delete({
        where: {
            id: idDocumento
        }
    })
}

