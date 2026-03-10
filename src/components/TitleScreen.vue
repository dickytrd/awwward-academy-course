<template>
    <div class="titleScreen">
        <div class="topCenter">
            <h1>SOUNDRENALINE</h1>
            <p>Visual thinking, translated into code. Experiments in WebGL and Three.js.</p>
        </div>

        <div class="btmLeft">
             <p>Built with clarity and a hint of foolishness.</p>
        </div>
        <button v-if="!playFlag" @click="onPlay()">Music On</button>
        <button v-else @click="onPause()">Music Off</button>
    </div>
</template>

<script>
import SoundReactor from "../classes/SoundReactor";

export default {
    name: "AudioButton",
    data() {
        return {
            initFlag: false,
            playFlag: false,
        };
    },
    methods: {
        onPlay() {
            if (!this.initFlag) {
                this.initFlag = true;
                SoundReactor.init();
            }
            SoundReactor.play();
            this.playFlag = true;
        },
        onPause() {
            SoundReactor.pause();
            this.playFlag = false;
        },
    },
};
</script>

<style scoped lang="stylus">
.titleScreen {
    .topCenter {
        position: absolute;
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        top: 0;
        left: 0;
        color: white;
        padding: 32px;
    }

    .btmLeft {
        position: absolute;
        bottom: 32px;
        left: 50px;
        color: white;
        padding: 32px;
    }

    h1 {
        font-size: 12.5rem;
        line-height: 90%;
        letter-spacing: -7%;
        mix-blend-mode: difference;
    }

    p {
        opacity: 0.7;
    }

    button {
        color: white;
        background: transparent;
        border-radius: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: auto;
        height: 50px;
        position: absolute;
        bottom: 50px;
        right: 100px;
        border: 0.5px solid white;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            background: gray;
            ease:ease-in-out;
        }
    }
}
</style>