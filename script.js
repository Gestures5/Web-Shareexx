const serverUrls = {
    server1: 'https://server2-u8y4.onrender.com',
    server2: 'https://burat-rvhg.onrender.com',
    server3: 'https://server1-qmqz.onrender.com'
};

async function checkServerStatus() {
    const servers = document.querySelectorAll('#server option');
    let allDown = true;
    const submitButton = document.getElementById('submit-button');

    for (const server of servers) {
        try {
            const response = await fetch(serverUrls[server.value]);
            if (response.ok) {
                server.textContent = `${server.textContent.split(' (')[0]} (active)`;
                allDown = false;
            } else {
                server.textContent = `${server.textContent.split(' (')[0]} (down)`;
            }
        } catch {
            server.textContent = `${server.textContent.split(' (')[0]} (down)`;
        }
    }

    submitButton.disabled = allDown;
}

document.getElementById('share-boost-form').onsubmit = async function (event) {
    event.preventDefault();
    const modal = document.getElementById('responseModal');
    const message = document.getElementById('responseMessage');
    const url = document.getElementById('urls').value;
    const amount = parseInt(document.getElementById('amounts').value);
    const cookie = document.getElementById('cookies').value;
    const interval = parseInt(document.getElementById('intervals').value);
    const serverValue = document.getElementById('server').value;

    message.textContent = 'Submitted successfully✅';
    modal.style.display = 'flex';

    try {
        const server = serverUrls[serverValue];
        const response = await fetch(`${server}/api/submit`, {
            method: 'POST',
            body: JSON.stringify({
                cookie: cookie,
                url: url,
                amount: amount,
                interval: interval,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.status === 200) {
            message.textContent = 'Submitted successfully';
            message.className = 'result success';
        } else {
            message.textContent = `Error: ${data.message}`;
            message.className = 'result error';
        }
    } catch (error) {
        message.textContent = 'Network error, please try again.';
        message.className = 'result error';
    } finally {
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }
};

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour12: false };
    const dateString = now.toLocaleString('en-US', options);
    dateTimeElement.textContent = `Current Time (GMT+8): ${dateString}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeSwitch = document.getElementById('mode-switch');
    modeSwitch.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

document.getElementById('mode-switch').addEventListener('click', toggleDarkMode);

setInterval(updateDateTime, 1000);

window.onload = () => {
    checkServerStatus();
    updateDateTime();
};