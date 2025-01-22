class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.volume = this.ctx.createGain();
        this.volume.gain.value = 0.8;
        this.samples = {};
    }

    async loadSound(name, url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        const source = this.ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(this.volume);
        return { audio: source, gain: this.volume };
    }

    async init(sources) {
        for (const key in sources) {
            this.samples[key] = await this.loadSound(key, sources[key]);
        }
    }

    play(name) {
        if (this.samples[name]) {
            this.samples[name].audio.start(0);
        }
    }

    stop(name) {
        if (this.samples[name]) {
            this.samples[name].audio.stop();
        }
    }

    setPlaybackRate(name, rate) {
        if (this.samples[name]) {
            this.samples[name].audio.playbackRate.value = rate;
        }
    }
}
