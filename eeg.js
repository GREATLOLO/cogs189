const ws = new WebSocket("ws://localhost:8080"); // Connect to the Python WebSocket

let defaultSpeed = 0.5;
let boostSpeed = 2.0;
let currentSpeed = defaultSpeed;

ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data)
    let activityDetected = data.blink; // Blink detection from Python WebSocket

    // If detected, update ball speed
    currentSpeed = activityDetected ? boostSpeed : defaultSpeed;
    setBallSpeed(currentSpeed);

    console.log(`🔵 Blink Detected: ${activityDetected ? "BOOST MODE 🚀" : "NORMAL SPEED 🏁"}`);
};

// Handle WebSocket errors
ws.onerror = (error) => console.error("WebSocket Error:", error);
ws.onclose = () => console.warn("WebSocket Disconnected");
