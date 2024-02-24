import { create } from 'zustand'

interface StateSchema {
  idPiano: string,
  idCliente: string,
  idPrestazioneAgenda: string,
  idPrestazione: string,
  idOperatore: string,
  idSede: string,
  idDocumento: string,
  setIdPiano: (id: string) => void
  setIdCliente: (id: string) => void
  setIdPrestazioneAgenda: (id: string) => void
  setIdPrestazione: (id: string) => void
  setIdOperatore: (id: string) => void,
  setIdSede: (id: string) => void,
  setIdDocumento: (id: string) => void,
}

export const useStore = create<StateSchema>()((set) => ({
  idCliente: "",
  idPiano: "",
  idPrestazioneAgenda: "",
  idPrestazione: "",
  idOperatore: "",
  idSede: "",
  idDocumento: "",
  setIdPiano: (id) => set((state) => ({ idPiano: id, })),
  setIdCliente: (id) => set((state) => ({ idCliente: id, idPiano: "" })),
  setIdPrestazioneAgenda: (id) => set((state) => ({idPrestazioneAgenda: id})),
  setIdPrestazione: (id) => set((state) => ({idPrestazione: id})),
  setIdOperatore: (id) => set((state) => ({idOperatore: id})),
  setIdSede: (id) => set((state) => ({idSede: id})),
  setIdDocumento: (id) => set((state) => ({idDocumento: id})),
}))

