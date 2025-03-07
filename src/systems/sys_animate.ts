import {Anim, AnimationFlag, AnimationKeyframe} from "../components/com_animate.js";
import {Get} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {slerp} from "../math/quat.js";
import {lerp} from "../math/vec3.js";

const QUERY = (1 << Get.Transform) | (1 << Get.Animate);

export function sys_animate(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game[Get.Transform][entity];
    let animate = game[Get.Animate][entity];

    // 1. Switch to the trigger this frame if early exits are allowed.

    let next = animate.Trigger && animate.States[animate.Trigger];
    if (next && animate.Current.Flags & AnimationFlag.EarlyExit) {
        // We don't reset the current state's timer because the trigger may be
        // the same state as the current. If the states are different, this may
        // result in clips not starting from the first keyframe, which should
        // be generally OK for animations with EarlyExit.
        animate.Current = next;
        animate.Trigger = undefined;
    }

    // 2. Advance the timer.

    animate.Current.Time += delta;
    if (animate.Current.Time > animate.Current.Duration) {
        // The animation will complete this frame. The last keyframe still needs
        // to finish, however.
        animate.Current.Time = animate.Current.Duration;
    }

    // 3. Find the current and the next keyframe.

    let current_keyframe: AnimationKeyframe | null = null;
    let next_keyframe: AnimationKeyframe | null = null;
    for (let keyframe of animate.Current.Keyframes) {
        if (animate.Current.Time <= keyframe.Timestamp) {
            next_keyframe = keyframe;
            break;
        } else {
            current_keyframe = keyframe;
        }
    }

    // 4. Interpolate transform properties between keyframes.

    if (current_keyframe && next_keyframe) {
        let keyframe_duration = next_keyframe.Timestamp - current_keyframe.Timestamp;
        let current_keyframe_time = animate.Current.Time - current_keyframe.Timestamp;
        let interpolant = current_keyframe_time / keyframe_duration;
        if (next_keyframe.Ease) {
            interpolant = next_keyframe.Ease(interpolant);
        }

        if (current_keyframe.Translation && next_keyframe.Translation) {
            lerp(
                transform.Translation,
                current_keyframe.Translation,
                next_keyframe.Translation,
                interpolant
            );
            transform.Dirty = true;
        }

        if (current_keyframe.Rotation && next_keyframe.Rotation) {
            slerp(
                transform.Rotation,
                current_keyframe.Rotation,
                next_keyframe.Rotation,
                interpolant
            );
            transform.Dirty = true;
        }
    }

    // 5. The animation has completed. Determine what to do next.

    if (animate.Current.Time == animate.Current.Duration) {
        animate.Current.Time = 0;

        if (animate.Current.Flags & AnimationFlag.Alternate) {
            // Reverse the keyframes of the clip and recalculate their timestamps.
            for (let keyframe of animate.Current.Keyframes.reverse()) {
                keyframe.Timestamp = animate.Current.Duration - keyframe.Timestamp;
            }
        }

        if (next) {
            // Switch to the trigger. All clips can be exited from when they
            // finish, regardless of the lack of the EarlyExit flag. The trigger
            // may be the same state as the current.
            animate.Current = next;
            animate.Trigger = undefined;
        } else if (!(animate.Current.Flags & AnimationFlag.Loop)) {
            animate.Current = animate.States[Anim.Idle];
        }
    }
}
