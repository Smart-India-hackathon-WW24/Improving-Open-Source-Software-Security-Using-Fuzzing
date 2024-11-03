// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch crash log data
    fetch("/api/crashes")
        .then(response => response.json())
        .then(data => {
            const crashLog = document.getElementById("crash-log");
            data.forEach(crash => {
                const listItem = document.createElement("li");
                listItem.textContent = `Severity: ${crash.severity} - Error: ${crash.error}`;
                crashLog.appendChild(listItem);
            });
        });

    // Fetch coverage data
    fetch("/api/coverage")
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById("coverage-chart").getContext("2d");
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Code Coverage',
                        data: Object.values(data),
                        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    }]
                }
            });
        });
});
