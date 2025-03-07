import {Entity, Game} from "../game.js";
import {Get} from "./com_index.js";

export interface Lifespan {
    Max: number;
    Age: number;
}

export function lifespan(Max = Infinity) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= 1 << Get.Lifespan;
        game[Get.Lifespan][entity] = <Lifespan>{
            Max,
            Age: 0,
        };
    };
}
