import { atom } from "recoil";

export const openHistoryState = atom<boolean>({
    key: 'openHistoryState',
    default: false,
});
