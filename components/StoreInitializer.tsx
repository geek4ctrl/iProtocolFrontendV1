"use client";

import type { Place, Event, Reservation } from "@/types";
import { useStore } from "@/src/store";
import { useRef } from "react";

interface StoreInitializerProps {
    name: string;
    place: Place[];
    event: Event[];
    reservation: Reservation[];
}

function StoreInitializer({ name, place, event, reservation }: StoreInitializerProps) {

    const iniitialized = useRef(false);
    if (!iniitialized.current) {
        useStore.setState({ name, place, event, reservation });
        iniitialized.current = true;
    }

    return null;
}

export default StoreInitializer;