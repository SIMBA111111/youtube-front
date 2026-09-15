import { TTraslates } from "@/shared/types/translates";

export interface ITagEntity {
  id: string;
  name: TTraslates;
  createdDate: string;
  updatedDate: string;
}

export interface IVideoTag {
    id: string
    name: TTraslates
    setActiveTag: (tagId: string) => void
    activeTag: string
}