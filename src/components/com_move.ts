import {Entity, Game} from "../game.js";
import {Quat, Vec3} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Move {
    /** Units per second. */
    readonly MoveSpeed: number;
    /** Radians per second. */
    readonly RotateSpeed: number;
    Direction?: Vec3;
    Yaw?: Quat;
}

export function move(MoveSpeed: number = 3.5, RotateSpeed: number = 0.5) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= 1 << Get.Move;
        game[Get.Move][entity] = <Move>{
            MoveSpeed,
            RotateSpeed,
        };
    };
}
