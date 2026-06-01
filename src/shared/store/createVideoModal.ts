import { create } from 'zustand'

interface ICreateVideoModal {
    isOpened: boolean,
    storedFile: File | null,
    videoData: {
        videoName: string,
        videoDescription: string,
        videoPreview: string,
        playlistId: string,
    }
    // openedCreateModal: () => void,
    toggleCreateModal: () => void;
    addStoredFile: (file: File) => void
    addVideoData: (newVideoData: any) => void
}

export const useCreateVideoModal = create<ICreateVideoModal>((set) => ({
    isOpened: false,
    storedFile: null,
    videoData : {
        videoName: '',
        videoDescription: '',
        videoPreview: '',
        playlistId: '',
    },
    // openedCreateModal: () => set({isOpened: true}),
    toggleCreateModal: () => set((state) => ({ isOpened: !state.isOpened })),
    addStoredFile: (file: File) => set(() => ({ storedFile: file })),
    addVideoData: (newVideoData: any) => set(() => ({ videoData: newVideoData })),
}))