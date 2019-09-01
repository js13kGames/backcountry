import {Anim, Animate} from "../components/com_animate.js";
import {Get} from "../components/com_index.js";
import {components_of_type} from "../components/com_transform.js";
import {Entity, Game} from "../game.js";
import {multiply} from "../math/quat.js";
import {add, scale} from "../math/vec3.js";

const QUERY = (1 << Get.Transform) | (1 << Get.Move);

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.world.length; i++) {
        if ((game.world[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game[Get.Transform][entity];
    let move = game[Get.Move][entity];
    for (let animate of components_of_type<Animate>(game, transform, Get.Animate)) {
        if (!animate.Trigger) {
            animate.Trigger = move.Direction ? Anim.Move : Anim.Idle;
        }
    }

    if (move.Direction) {
        scale(move.Direction, move.Direction, move.MoveSpeed * delta);
        add(transform.translation, transform.translation, move.Direction);
        transform.dirty = true;
        move.Direction = undefined;
    }

    if (move.Yaw) {
        // Yaw is applied relative to the world space.
        multiply(transform.rotation, move.Yaw, transform.rotation);
        transform.dirty = true;
        move.Yaw = undefined;
    }
}
