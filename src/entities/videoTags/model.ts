export interface ITagEntity {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string;
}


export interface IVideoTag {
    id: string
    name: string
    setActiveTag: (tagId: string) => void
    activeTag: string
}