import { atom } from "recoil";

export const skipEnabledState = atom<boolean>({
    key: 'skipEnabledState',
    default: false,
});
