import {Entity, Game} from "../game.js";
import {Quat, Vec3} from "../math/index.js";
import {Get} from "./com_index.js";

export interface Animate {
    /** Animation states store the state of clips' playback. */
    readonly States: {
        /** The idle animation is required. */
        [Anim.Idle]: AnimationState;
        [k: number]: AnimationState;
    };
    /** The clip played currently. Defaults to Anim.Idle. */
    Current: AnimationState;
    /** The name of the clip to play next. */
    Trigger?: Anim;
}

export function animate(clips: {[Anim.Idle]: AnimationClip; [k: number]: AnimationClip}) {
    return (game: Game, entity: Entity) => {
        let States: Record<string, AnimationState> = {};
        for (let name in clips) {
            let {Keyframes, Flags = AnimationFlag.Default} = clips[name];
            let Duration = Keyframes[Keyframes.length - 1].Timestamp;
            States[name] = <AnimationState>{
                // One-level-deep copy of the clip's keyframes. When
                // AnimationFlag.Alternate is set, sys_animate recalculates
                // keyframes' timestamps after each alternation. We want to
                // modify copies of the timestamps defined in the clip. It's OK
                // to copy other keyframe properties by reference.
                Keyframes: Keyframes.map(keyframe => <AnimationKeyframe>{...keyframe}),
                Flags,
                Duration,
                Time: 0,
            };
        }
        game.World[entity] |= 1 << Get.Animate;
        game[Get.Animate][entity] = <Animate>{
            States,
            Current: States[Anim.Idle],
        };
    };
}

export interface AnimationKeyframe {
    readonly Translation?: Vec3;
    readonly Rotation?: Quat;
    Timestamp: number;
    /** Easing function used to transition to this keyframe. */
    readonly Ease?: (t: number) => number;
}

export const enum AnimationFlag {
    /** Run the clip forward once, without early exits. */
    None = 0,
    /** Allow early exits from this clip. */
    EarlyExit = 1 << 0,
    /** Loop the clip from the start. */
    Loop = 1 << 1,
    /** When restarting, alternate the clip's direction. */
    Alternate = 1 << 2,
    /** The default setting used when flags is not defined on the clip. */
    Default = EarlyExit | Loop | Alternate,
}

export interface AnimationClip {
    /** Keyframe definitions. */
    readonly Keyframes: Array<Readonly<AnimationKeyframe>>;
    /** Setting flags. Default is EarlyExit | Loop | Alternate. */
    readonly Flags?: AnimationFlag;
}

export interface AnimationState {
    /** A one-level-deep copy of clip's keyframe definitions. */
    Keyframes: Array<AnimationKeyframe>;
    /** Setting flags. */
    Flags: AnimationFlag;
    /** Total duration of the clip, calculated from the last keyframe. */
    Duration: number;
    /** Current playback timestamp. */
    Time: number;
}

export const enum Anim {
    Idle = 1,
    Move,
    Shoot,
    Hit,
    Die,
    Select,
}
