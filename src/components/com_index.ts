import {Animate} from "./com_animate";
import {AudioSource} from "./com_audio_source";
import {Camera} from "./com_camera";
import {Collide} from "./com_collide";
import {PlayerControl} from "./com_control_player";
import {Cull} from "./com_cull";
import {Draw} from "./com_draw";
import {EmitParticles} from "./com_emit_particles";
import {Health} from "./com_health";
import {Lifespan} from "./com_lifespan";
import {Light} from "./com_light";
import {Mimic} from "./com_mimic";
import {Move} from "./com_move";
import {Navigable} from "./com_navigable";
import {NPC} from "./com_npc.js";
import {Projectile} from "./com_projectile";
import {Render} from "./com_render";
import {Select} from "./com_select";
import {Shake} from "./com_shake";
import {Shoot} from "./com_shoot";
import {Transform} from "./com_transform";
import {Trigger} from "./com_trigger";
import {Walking} from "./com_walking";

export const enum Get {
    Transform = 1,
    Render,
    Draw,
    Camera,
    Light,
    AudioSource,
    Animate,
    Move,
    Collide,
    Trigger,
    Navigable,
    Select,
    Shoot,
    PlayerControl,
    Health,
    Mimic,
    EmitParticles,
    Cull,
    Walking,
    NPC,
    Projectile,
    Shake,
    Lifespan,
}

export interface ComponentData {
    [Get.Transform]: Array<Transform>;
    [Get.Render]: Array<Render>;
    [Get.Draw]: Array<Draw>;
    [Get.Camera]: Array<Camera>;
    [Get.Light]: Array<Light>;
    [Get.AudioSource]: Array<AudioSource>;
    [Get.Animate]: Array<Animate>;
    [Get.Move]: Array<Move>;
    [Get.Collide]: Array<Collide>;
    [Get.Trigger]: Array<Trigger>;
    [Get.Navigable]: Array<Navigable>;
    [Get.Select]: Array<Select>;
    [Get.Shoot]: Array<Shoot>;
    [Get.PlayerControl]: Array<PlayerControl>;
    [Get.Health]: Array<Health>;
    [Get.Mimic]: Array<Mimic>;
    [Get.EmitParticles]: Array<EmitParticles>;
    [Get.Cull]: Array<Cull>;
    [Get.Walking]: Array<Walking>;
    [Get.NPC]: Array<NPC>;
    [Get.Projectile]: Array<Projectile>;
    [Get.Shake]: Array<Shake>;
    [Get.Lifespan]: Array<Lifespan>;
}
