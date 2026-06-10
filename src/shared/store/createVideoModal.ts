import { create } from 'zustand'
import { IOption } from '../ui/Selector'
import { VideoAccessId } from '../constants/radioButtons'

interface IFragment {
    index: number
    start: number
    end: number
    title: string
}

interface ICreateVideoModal {
    isOpened: boolean,
    storedFile: File | null,
    videoData: {
        videoName: string,
        videoDescription: string,
        videoPreview: File | null,
        iconPreview: string,
        videoAccess: VideoAccessId,
        playlistIds: IOption[],
        fragments: IFragment[],
    }
    // openedCreateModal: () => void,
    toggleCreateModal: () => void;
    openCreateModal: () => void;
    addStoredFile: (file: File | null) => void
    addVideoData: (newVideoData: any) => void
}

export const useCreateVideoModal = create<ICreateVideoModal>((set) => ({
    isOpened: false,
    storedFile: null,
    videoData : {
        videoName: '',
        videoDescription: '',
        videoPreview: null,
        iconPreview: '',
        videoAccess: 'public',
        playlistIds: [],
        fragments: []
    },
    // openedCreateModal: () => set({isOpened: true}),
    toggleCreateModal: () => set((state) => ({ isOpened: !state.isOpened })),
    openCreateModal: () => set((state) => ({ isOpened: true })),
    addStoredFile: (file: File | null) => set(() => ({ storedFile: file })),
    addVideoData: (newVideoData: any) => set(() => ({ videoData: newVideoData })),
}))