import { create } from 'zustand'

interface ICreateVideoModal {
    isOpened: boolean,
    // openedCreateModal: () => void,
    toggleCreateModal: () => void;
}

export const useCreateVideoModal = create<ICreateVideoModal>((set) => ({
    isOpened: false,
    // openedCreateModal: () => set({isOpened: true}),
    toggleCreateModal: () => set((state) => ({ isOpened: !state.isOpened })),
}))