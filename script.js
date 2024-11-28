// Display Current Time
function updateTime() {
    const timeElement = document.getElementById("current-time");
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    timeElement.textContent = now.toLocaleString(undefined, options);
}
setInterval(updateTime, 1000);

// Popup Functions
function showPopup() {
    document.getElementById("popup").style.display = "block";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Initialize
window.onload = () => {
    showPopup();
};
