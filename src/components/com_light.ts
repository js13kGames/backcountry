import {Entity, Game} from "../game.js";
import {Vec3} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Light {
    entity: Entity;
    color: Vec3;
    intensity: number;
}

/**
 *
 * @param color The color of the light. It will tint the shaded objects taking
 * into account the angle and the distance from the light source. Grayscale can
 * be used to control how dim the light is.
 * @param range The distance at which the light has the same intensity as the
 * default light has at 1 unit away. If range is 0, then the light is a
 * directional light and its position relative to the world origin will be used
 * to compute the light normal.
 */
export function light(color: Vec3 = [1, 1, 1], range: number = 1) {
    return (game: Game) => (entity: Entity) => {
        game.world[entity] |= 1 << Get.Light;
        game[Get.Light][entity] = <Light>{
            entity,
            color,
            intensity: range ** 2,
        };
    };
}
