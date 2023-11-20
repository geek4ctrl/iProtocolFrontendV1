"use client";

import { useStore } from "@/src/store";
import { useRef } from "react";

interface StoreInitializerProps {
    name: string;
    place: any[];
    event: any[];
    reservation: any[];
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