class Drivetrain {
    constructor() {
        this.currentGear = 1;
        this.maxGears = 6;
    }

    shiftUp() {
        if (this.currentGear < this.maxGears) {
            this.currentGear++;
        }
    }

    shiftDown() {
        if (this.currentGear > 1) {
            this.currentGear--;
        }
    }
}
