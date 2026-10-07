import { create } from 'zustand'
import { IOption } from '../ui/Selector'
import { VIDEO_ACCESS, VideoAccessId } from '../constants/radioButtons'
import { getChannelData } from '../utils/getChannelData'
import { getChannelDataClient } from '../hooks/getChannelDataClient'

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
        videoAccess: string,
        playlistIds: IOption[],
        fragments: IFragment[],
        tags: IOption[]
        hashTags: any[]
        isShort: boolean
    }
    // openedCreateModal: () => void,
    closeCreateModal: () => void;
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
        fragments: [],
        tags: [],
        hashTags: [],
        isShort: false
    },
    closeCreateModal: () => set(() => {
        const search = new URLSearchParams(window.location.search);
        search.set('createVideo', 'false');

        const newUrl = `${window.location.pathname}?${search.toString()}`;
        window.history.replaceState(null, '', newUrl);

        return { isOpened: false };
    }),

    openCreateModal: async() => set(() => {
        const search = new URLSearchParams(window.location.search);
        search.set('createVideo', 'true');

        const userData = getChannelDataClient();
        const newUrl = `/creator/${userData?.id}/videos?${search.toString()}`;

        window.location.replace(newUrl);

        return { isOpened: true };
    }),
    addStoredFile: (file: File | null) => set(() => ({ storedFile: file })),
    addVideoData: (newVideoData: any) => set(() => ({ videoData: newVideoData })),
}))