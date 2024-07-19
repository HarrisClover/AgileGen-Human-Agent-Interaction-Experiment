function chargeShot() {
    document.getElementById('shoot-button').innerText = 'Charging Swing...';
    document.getElementById('ball').style.display = 'block'; // Show the ball
    this.startTime = new Date().getTime(); // Record the time when charging starts
}

function releaseShot() {
    document.getElementById('shoot-button').innerText = 'Swing Bat';
    let endTime = new Date().getTime(); // Record the time when released
    let chargeDuration = endTime - this.startTime; // Calculate charge duration
    let power = Math.min(chargeDuration / 1000, 1); // Normalize power between 0 and 1
    let accuracy = Math.random() * 100;
    document.getElementById('real-time-feedback').innerText = `Real-Time Feedback: Batting Accuracy ${accuracy.toFixed(2)}%`;
    document.getElementById('performance-metrics').innerText = `Performance Metrics: Last Batting Accuracy ${accuracy.toFixed(2)}%`;
    animateBall(power); // Function to animate the ball based on power
}

function animateBall(power) {
    let ball = document.getElementById('ball');
    let position = 0;
    let interval = setInterval(function() {
        if (position >= 300) {
            clearInterval(interval);
            ball.style.display = 'none'; // Hide the ball after reaching the end
        } else {
            position += 5 * power; // Increase position based on power
            ball.style.bottom = `${position}px`; // Move the ball
        }
    }, 20);
}

document.getElementById('start-button').addEventListener('click', () => {
    let sport = document.getElementById('sport-dropdown').value;
    let distance = document.getElementById('distance-input').value;
    let targetSize = document.getElementById('target-size-input').value;
    alert(`Batting practice started for ${sport} at ${distance} meters with a ${targetSize} target.`);
});

document.getElementById('generate-report-button').addEventListener('click', () => {
    alert('Report Generated.');
});
