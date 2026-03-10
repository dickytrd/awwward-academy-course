<template>
    <div class="heroSection">
        <div class="headingContent">
            <h1>SOUNDRENALINE</h1>
            <p>A designer, new to coding, learns WebGL and Three.js.</p>
        </div>
        <div class="buttonWrap">
                    <button v-if="!playFlag" @click="onPlay()">Play</button>
        <button v-else @click="onPause()">Pause</button>
        </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.heroSection {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100vw;
    height: 100vh;


    .headingContent {
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        Gap: 16px;
        top: 0;
        left: 0;
        color: white;
        padding: 32px;
    }

    h1 {
        font-size: 10rem;
        Letter-spacing: -7%;
        font-family: "Arial Black", Arial, Helvetica, sans-serif;
        line-height: 90%;
        mix-blend-mode: difference;

    }

    .buttonWrap {
        width:100%;
        height: 100%
        display: flex;
        justify-content: center;
        align-items: center;

    button {
        color: white;
        background: transparent;
        border-radius: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 100px;
        height: 50px;
        position: absolute;
        bottom: 100px;
        right: 100px;
        border: solid purple;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            background: purple;
        }
    }
}
}

</style>
