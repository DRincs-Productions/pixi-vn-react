import { GameStepManager } from "@drincs/pixi-vn";
import { atom } from "recoil";

export const canGoBackState = atom<boolean>({
    key: 'canGoBackState',
    default: GameStepManager.canGoBack,
});
