import create from "zustand";
import { FacetData } from "./facetStructure";

interface StructureState {
  structure: FacetData[];
  setStructure: (newStructure: FacetData[]) => void;
  addFacet: (newFacet: FacetData) => void;
  removeFacet: (index: number) => void;
  // paintFacet FUTURE DEV
}

export const useStructureStore = create<StructureState>()((set) => ({
  structure: new Array<FacetData>(),
  setStructure: (newStructure: FacetData[]) => {
    set(() => ({ structure: newStructure }));
  },

  addFacet: (newFacet: FacetData) => {
    set((state) => ({ structure: [...state.structure, newFacet] }));
  },
  removeFacet: (index: number) => {
    set((state) => ({
      structure: [
        ...state.structure.slice(0, index),
        ...state.structure.slice(index + 1),
      ],
    }));
  },
}));
