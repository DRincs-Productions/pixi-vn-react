import { Container } from "pixi.js";
import { ICanvasContainerMemory } from "../../interface/canvas/ICanvasContainerMemory";
import { CanvasBase } from "./CanvasBase";

export interface ICanvasContainer {
    x: number,
    y: number,
    rotation: number,
    pivot: { x: number, y: number },
}

export abstract class CanvasContainerBase<T1 extends Container, T2 extends ICanvasContainerMemory> extends CanvasBase<T1, T2> {
    listChildren: CanvasBase<any, any>[] = []
    constructor(container: T1) {
        super(container)
    }

    get x() {
        return this.pixiElement.x
    }
    set x(value: number) {
        this.pixiElement.x = value
    }
    get y() {
        return this.pixiElement.y
    }
    set y(value: number) {
        this.pixiElement.y = value
    }
    get rotation() {
        return this.pixiElement.rotation
    }
    set rotation(value: number) {
        this.pixiElement.rotation = value
    }
    get pivot() {
        return this.pixiElement.pivot
    }
    set pivot(value: { x: number, y: number }) {
        this.pixiElement.pivot = value
    }
    addChild<U extends CanvasBase<any, any>[]>(...children: U): U[0] {
        children.forEach(child => {
            this.pixiElement.addChild(child.pixiElement)
            this.listChildren.push(child)
        })
        return children[0]
    }
}

/**
 * This class is responsible for storing a PIXI Container.
 * And allow to save your memory in a game save.
 */
export class CanvasContainer extends CanvasContainerBase<Container, ICanvasContainerMemory> {
    get memory(): ICanvasContainerMemory {
        return {
            className: this.constructor.name,
            elements: [],
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            pivot: { x: this.pivot.x, y: this.pivot.y },
        }
    }
    set memory(value: ICanvasContainerMemory) {
        this.x = value.x
        this.y = value.y
        this.rotation = value.rotation
        this.pivot = value.pivot
    }
    constructor() {
        super(new Container())
    }
}