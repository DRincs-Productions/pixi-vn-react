import { atom } from "recoil";

export const autoEnabledState = atom<boolean>({
    key: 'autoEnabledState',
    default: false,
});
