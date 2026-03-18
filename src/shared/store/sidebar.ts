import { create } from 'zustand'

interface IuseSidebarStore {
    isOpen: boolean,
    openSideBar: () => void,
    closeSideBar: () => void
    toggleSideBar: () => void;
}

export const useSidebarStore = create<IuseSidebarStore>((set) => ({
    isOpen: false,
    openSideBar: () => set({isOpen: true}),
    closeSideBar: () => set({isOpen: false}),
    toggleSideBar: () => set((state) => ({ isOpen: !state.isOpen })),
}))