<template>
    <div class="audioButton">
        <button v-if="!playFlag" @click="onPlay()">Play</button>
        <button v-else @click="onPause()">Pause</button>
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

.audioButton
    position: absolute
    top: 85%
    left: 50%
    transform: translate(-50%, -50%)

    button {
        width: 80px
        height: 80px
        display: flex
        justify-content: center
        align-items: center
        border-radius: 50px
        border: none
        background-color: rgba(255, 255, 255, 0.1)
        backdrop-filter: blur(10px)
        cursor: pointer
    }

</style>
