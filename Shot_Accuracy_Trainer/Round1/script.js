
document.getElementById('start-session').addEventListener('click', function() {
    const sport = document.getElementById('sport').value;
    const distance = document.getElementById('distance').value;
    const targetSize = document.getElementById('target-size').value;

    document.getElementById('selected-sport').innerText = `Sport: ${sport}`;
    document.getElementById('shot-settings').innerText = `Distance: ${distance} meters, Target Size: ${targetSize} meters`;

    // Simulate real-time feedback and shot tracking
    simulateTrainingSession();
});

function simulateTrainingSession() {
    const feedbackPanel = document.getElementById('feedback');
    const shotHistoryTable = document.getElementById('shot-history').getElementsByTagName('tbody')[0];

    let shotNumber = 1;

    const interval = setInterval(() => {
        const accuracy = Math.random().toFixed(2);
        const feedback = accuracy > 0.5 ? 'Good shot!' : 'Try to improve your aim.';
        const timestamp = new Date().toLocaleTimeString();

        feedbackPanel.innerText = `Shot ${shotNumber}: ${feedback} (Accuracy: ${accuracy})`;

        const row = shotHistoryTable.insertRow();
        row.insertCell(0).innerText = shotNumber;
        row.insertCell(1).innerText = accuracy;
        row.insertCell(2).innerText = feedback;
        row.insertCell(3).innerText = timestamp;

        shotNumber++;

        if (shotNumber > 10) {
            clearInterval(interval);
        }
    }, 1000);
}

document.getElementById('generate-report').addEventListener('click', function() {
    const reportSummary = document.getElementById('report-summary');
    reportSummary.innerText = 'Summary of shot accuracy and feedback will be displayed here.';

    // Simulate generating a downloadable PDF report
    document.getElementById('download-report').addEventListener('click', function() {
        alert('PDF report downloaded!');
    });
});
