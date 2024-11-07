class Logger {
    constructor() {
        this.logCount = parseInt(localStorage.getItem('logCount')) || 0;
        this.updateLogDisplay();

        this.logEvent = this.logEvent.bind(this);
        this.clearLogs = this.clearLogs.bind(this);

        document.getElementById("logButton").addEventListener("click", this.logEvent);
        document.getElementById("clearButton").addEventListener("click", this.clearLogs);
    }

    updateLogDisplay() {
        document.getElementById("logCount").textContent = "Total Logs: " + this.logCount;
        localStorage.setItem('logCount', this.logCount);
    }

    logEvent() {
        this.logCount++;
        this.updateLogDisplay();

        const cardContainer = document.getElementById("cardContainer");
        const logEntry = document.createElement("div");
        logEntry.className = "card mb-2";
        logEntry.innerHTML = `<div class="card-body">Log Entry ${this.logCount}</div>`;
        cardContainer.appendChild(logEntry);
    }

    clearLogs() {
        this.logCount = 0;
        this.updateLogDisplay();
        document.getElementById("cardContainer").innerHTML = '';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Logger();
}); 