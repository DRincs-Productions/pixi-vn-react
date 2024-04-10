import { atom } from "recoil";

export const openSettingsState = atom<boolean>({
    key: 'openSettingsState',
    default: false,
});
