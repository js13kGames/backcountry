import {Entity, Game} from "../game.js";
import {Vec3} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Collide {
    readonly entity: Entity;
    new: boolean;
    /**
     * Dynamic colliders collide with all colliders. Static colliders collide
     * only with dynamic colliders.
     */
    dynamic: boolean;
    /** The size of the collider in self units. */
    size: [number, number, number];
    min: Vec3;
    max: Vec3;
    /** Collisions detected with this collider during this tick. */
    collisions: Array<Collide>;
}

export function collide(dynamic: boolean = true, size: [number, number, number] = [1, 1, 1]) {
    return (game: Game) => (entity: Entity) => {
        game.world[entity] |= 1 << Get.Collide;
        game[Get.Collide][entity] = <Collide>{
            entity,
            new: true,
            dynamic,
            size,
            min: [0, 0, 0],
            max: [0, 0, 0],
            collisions: [],
        };
    };
}
