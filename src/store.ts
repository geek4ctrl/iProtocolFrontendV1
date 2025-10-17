import { create } from "zustand";
import type { Place, Event, Reservation } from "@/types";

type State = {
    name: string;
    place: Place[];
    event: Event[];
    reservation: Reservation[];
    chosenPlace: string;
    chosenReservationType: string;
}

type Action = {
    setName: (name: string) => void;
    setPlace: (place: Place[]) => void;
    setEvent: (event: Event[]) => void;
    setReservation: (reservation: Reservation[]) => void;
    setChosenPlace: (chosenPlace: string) => void;
    setReservationType: (reservationType: string) => void;
}

export const useStore = create<State & Action>((set) => ({
    name: "",
    place: [],
    event: [],
    reservation: [],
    chosenPlace: "",
    chosenReservationType: "",
    setName: (name) => set({ name }),
    setPlace: (place) => set({ place }),
    setEvent: (event) => set({ event }),
    setReservation: (reservation) => set({ reservation }),
    setChosenPlace: (chosenPlace) => set({ chosenPlace }),
    setReservationType: (chosenReservationType) => set({ chosenReservationType }),
}));
