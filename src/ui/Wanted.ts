import {Action, GameState} from "../actions.js";

export function Wanted(state: GameState) {
    return `
        <div style="
            position: absolute;
            top: 10%;
            width: 100%;
            color: #222;
            text-align: center;
            font-size: 15vh;
        ">
            WANTED
        </div>
        <div style="
            position: absolute;
            top: 30%;
            width: 100%;
            color: #222;
            text-align: center;
            font-size: 10vh;
        ">
            REWARD $${state.ChallengeLevel},000
        </div>
        <div style="
            position: absolute;
            bottom: 15%;
            width: 100%;
            text-align: center;
            font-size: 10vh;
        ">
            <button onclick="$(${Action.GoToTown});">
                ACCEPT BOUNTY
            </button>
        </div>
    `;
}
