import { atom } from "recoil";

export const afterLoadEventState = atom<number>({
    key: 'afterLoadEventState',
    default: 0,
});
