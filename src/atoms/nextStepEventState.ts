import { atom } from "recoil";

export const nextStepEventState = atom<number>({
    key: 'nextStepEventState',
    default: 0,
});
