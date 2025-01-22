let esp32IP = "http://192.168.4.1";
let audioManager = new AudioManager();
let engine = new Engine();
let drivetrain = new Drivetrain();

async function startEngine() {
    await audioManager.init({
        lowRPM: "https://yourusername.github.io/esp32-car-control/sounds/BAC_Mono_offlow.wav",
        midRPM: "https://yourusername.github.io/esp32-car-control/sounds/BAC_Mono_onmid.wav",
        highRPM: "https://yourusername.github.io/esp32-car-control/sounds/BAC_Mono_offhigh.wav",
        revving: "https://yourusername.github.io/esp32-car-control/sounds/REV.wav",
        limiter: "https://yourusername.github.io/esp32-car-control/sounds/limiter.wav"
    });
    audioManager.play("lowRPM");
}

function updateThrottle(value) {
    document.getElementById("throttleValue").innerText = value;
    engine.updateThrottle(value);

    if (value > 80) {
        audioManager.play("highRPM");
    } else if (value > 30) {
        audioManager.play("midRPM");
    } else {
        audioManager.play("lowRPM");
    }

    fetch(esp32IP + "/throttle?value=" + value);
}

function updateSteering(value) {
    document.getElementById("steeringValue").innerText = value;
    fetch(esp32IP + "/steer?value=" + value);
}

// 🎮 Xbox Controller Support
window.addEventListener("gamepadconnected", () => {
    document.getElementById("xboxStatus").innerText = "🎮 Xbox Controller: Connected!";
    requestAnimationFrame(gameLoop);
});

function gameLoop() {
    let gamepad = navigator.getGamepads()[0];
    if (gamepad) {
        let throttleValue = Math.round((gamepad.buttons[7].value) * 100);
        updateThrottle(throttleValue);
    }
    requestAnimationFrame(gameLoop);
}

// 📊 Engine Stats GUI
let gui = new dat.GUI();
let engineStats = {
    rpm: engine.getRPM(),
    gear: drivetrain.currentGear,
    throttle: 0
};

gui.add(engineStats, 'rpm').listen();
gui.add(engineStats, 'gear').listen();
gui.add(engineStats, 'throttle').listen();
