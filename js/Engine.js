class Engine {
    constructor() {
        this.idleRPM = 1000;
        this.maxRPM = 8800;
        this.rpm = this.idleRPM;
        this.throttle = 0;
    }

    updateThrottle(value) {
        this.throttle = value / 100;
        this.rpm = this.idleRPM + (this.maxRPM - this.idleRPM) * this.throttle;
    }

    getRPM() {
        return this.rpm;
    }
}
