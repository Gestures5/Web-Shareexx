document.getElementById('spamForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const total = document.getElementById('total').value;
    const submitButton = document.querySelector('button');
    
    // Change button text and show loading icon
    submitButton.innerHTML = 'Submitting, please wait... 🚀';
    submitButton.disabled = true;  // Disable the button to prevent multiple clicks

    try {
        const response = await fetch(`https://apis-markdevs69v2.onrender.com/api/other/nglspam?username=${username}&message=${encodeURIComponent(message)}&total=${total}`);
        const result = await response.json();
        
        if (response.ok) {
            document.getElementById('response').textContent = `Success: ${result.message || 'Messages sent!'}`;
        } else {
            document.getElementById('response').textContent = `Error: ${result.message || 'Something went wrong.'}`;
        }
    } catch (error) {
        document.getElementById('response').textContent = `Error: ${error.message}`;
    }

    // Reset button text after submission
    submitButton.innerHTML = '🚀 Submit';
    submitButton.disabled = false;  // Re-enable the button
});

// Update current time every second
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('time').textContent = `DATE/TIME: ${timeString}`;
}
setInterval(updateTime, 1000);

// Show battery percentage
function updateBattery() {
    navigator.getBattery().then(function(battery) {
        const batteryPercentage = Math.round(battery.level * 100);
        document.getElementById('battery').textContent = ` BATTERY: ${batteryPercentage}%`;
    });
}
setInterval(updateBattery, 10000); // Update every 10 seconds

// Ping a website and show the ping result
function pingWebsite() {
    const startTime = new Date().getTime();
    fetch('https://www.google.com', { method: 'HEAD', cache: 'no-cache' })
        .then(() => {
            const endTime = new Date().getTime();
            const ping = endTime - startTime;
            document.getElementById('ping').textContent = `Ping : ${ping}ms`;
        })
        .catch(() => {
            document.getElementById('ping').textContent = 'PING: LOADING...';
        });
}
setInterval(pingWebsite, 10000); // Update every 10 seconds
