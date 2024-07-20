document.addEventListener("DOMContentLoaded", function() {
    const THINGSPEAK_CHANNEL_ID_AREA2 = '2399528';
    const THINGSPEAK_API_KEY_AREA2 = 'UTP787AIXRG4RZUJ';
    const THINGSPEAK_URL_AREA2 = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID_AREA2}/feeds.json?api_key=${THINGSPEAK_API_KEY_AREA2}`;

    const tableArea2 = document.getElementById('area2-table');
    const chartCtx = document.getElementById('area2-chart').getContext('2d');
    let area2Chart;

    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.feeds || [])
            .catch(error => {
                console.error('Error fetching data:', error);
                return [];
            });
    }

    function formatData(data) {
        return data.map(entry => ({
            date: entry.created_at || '',
            entry_id: entry.entry_id || '',
            field1: parseFloat(entry.field1) || 0,
        }));
    }

    function populateTable(data) {
        const tbody = tableArea2.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        for (let i = data.length - 1; i >= 0; i--) {
            const entry = data[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-800 px-4 py-2">${entry.date}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.entry_id}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.field1}</td>
            `;
            tbody.appendChild(row);

            if ((data.length - i) % 10 === 0 && i !== 0) {
                row.classList.add('border-b-2', 'border-gray-300');
            }
        }
    }

    function updateChart(data) {
        const labels = data.map(entry => entry.entry_id);
        const values = data.map(entry => entry.field1);

        if (area2Chart) {
            area2Chart.data.labels = labels;
            area2Chart.data.datasets[0].data = values;
            area2Chart.update(); // Update chart with new data
        } else {
            area2Chart = new Chart(chartCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Field (cm)',
                        data: values,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Entry ID'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 1500,
                            title: {
                                display: true,
                                text: 'Field (cm)'
                            }
                        }
                    }
                }
            });
        }
    }

    function fetchDataAndPopulateTableAndChart() {
        fetchData(THINGSPEAK_URL_AREA2)
            .then(data => {
                const formattedData = formatData(data);
                populateTable(formattedData);
                updateChart(formattedData);
            })
            .catch(error => {
                console.error('Error fetching and updating data:', error);
            });
    }

    fetchDataAndPopulateTableAndChart();

    setInterval(() => {
        fetchDataAndPopulateTableAndChart();
    }, 30000); // Refresh every 30 seconds
});
