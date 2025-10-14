import { useState, useMemo, useEffect } from "react";
import { IndexVM } from "../ViewModels/IndexVM";
import { Persona } from "../Models/Entities/PersonaModel";

/**
 * Este hook sirve SOLO para sincronizar un IndexVM (que no usa React)
 * con el estado de React Native, sin modificar el VM original.
 */
export function useReactIndexVMAdapter(vm: IndexVM) {
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(
    vm.personaSeleccionada
  );

  // 👇 Monkey patch temporal al setter original
  useEffect(() => {
    const originalSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(vm),
      "personaSeleccionada"
    )?.set;

    if (!originalSetter) return;

    Object.defineProperty(vm, "personaSeleccionada", {
      set(value: Persona | null) {
        originalSetter.call(vm, value);
        setPersonaSeleccionada(value);
      },
      get() {
        return vm["_personaSeleccionada"];
      },
      configurable: true,
    });

    return () => {
      // Limpia cuando el componente se desmonta
      delete (vm as any).personaSeleccionada;
      (vm as any)._personaSeleccionada = null;
    };
  }, [vm]);

  return { personaSeleccionada };
}
