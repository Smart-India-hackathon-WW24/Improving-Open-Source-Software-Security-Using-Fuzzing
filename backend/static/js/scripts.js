// Enhanced scripts.js for real-time updates

document.addEventListener("DOMContentLoaded", function() {
    const crashTable = document.getElementById("crash-table").getElementsByTagName('tbody')[0];
    const totalCrashes = document.getElementById("total-crashes");
    const codeCoverage = document.getElementById("code-coverage");
    
    // Fetch and display crash log data
    fetch("/api/crashes")
        .then(response => response.json())
        .then(data => {
            totalCrashes.innerText = data.length;
            data.forEach(crash => {
                const row = crashTable.insertRow();
                row.insertCell(0).textContent = crash.timestamp;
                row.insertCell(1).textContent = crash.severity;
                row.insertCell(2).textContent = crash.error;
            });
        });

    // Fetch and display code coverage data
    fetch("/api/coverage")
        .then(response => response.json())
        .then(data => {
            const coveragePercent = calculateCoverage(data);
            codeCoverage.innerText = `${coveragePercent}%`;

            // Coverage chart
            const ctxCoverage = document.getElementById("coverage-chart").getContext("2d");
            new Chart(ctxCoverage, {
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

    // Fetch and display severity distribution chart
    fetch("/api/severity-distribution")
        .then(response => response.json())
        .then(data => {
            const ctxSeverity = document.getElementById("severity-chart").getContext("2d");
            new Chart(ctxSeverity, {
                type: 'pie',
                data: {
                    labels: ["High", "Medium", "Low"],
                    datasets: [{
                        data: [data.high, data.medium, data.low],
                        backgroundColor: ['#e74a3b', '#f6c23e', '#1cc88a'],
                    }]
                }
            });
        });

    function calculateCoverage(data) {
        let totalCoverage = 0;
        let totalFunctions = Object.keys(data).length;
        Object.values(data).forEach(coverage => totalCoverage += coverage);
        return ((totalCoverage / totalFunctions) * 100).toFixed(2);
    }
});
