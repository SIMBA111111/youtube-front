import { IFragment } from "@webitch/player/dist/widget/video-tag/model/video-tag.interface";
import { IFragmentEntity } from "../types/fragmentEntity";

export const mapVideoFragments = (videoFragments: IFragmentEntity[]): IFragment[] => {
    return videoFragments.map((fragment: IFragmentEntity) => ({
        start: fragment.startTime,
        end: fragment.endTime,
        title: fragment.name,
    }))
}