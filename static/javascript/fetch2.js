<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
    const THINGSPEAK_CHANNEL_ID_AREA3 = '2592685';
    const THINGSPEAK_API_KEY_AREA3 = '414K1ZDNEA58ZF0M';

    const THINGSPEAK_URL_AREA3 = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID_AREA3}/feeds.json?api_key=${THINGSPEAK_API_KEY_AREA3}`;

    const tableArea3 = document.getElementById('area3-table');

    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.feeds; // Directly return feeds array
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                return [];
            });
    }

    function formatData(data) {
        return data.map(entry => ({
            date: entry.created_at || '',
            entry_id: entry.entry_id || '',
            field1: entry.field1 || '',
        }));
    }

    function populateTable(data) {
        const tbody = tableArea3.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        // Loop through data to display newest entries first
        for (let i = data.length - 1; i >= 0; i--) {
            const entry = data[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-800 px-4 py-2">${entry.date}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.entry_id}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.field1}</td>
            `;
            tbody.appendChild(row);

            // Add a class to every 10th row for styling purposes
            if ((data.length - i) % 10 === 0 && i !== 0) {
                row.classList.add('border-b-2', 'border-gray-300'); // Add bottom border after every 10 rows
            }
        }
    }

    function fetchDataAndPopulateTable() {
        fetchData(THINGSPEAK_URL_AREA3)
            .then(data => {
                const formattedData = formatData(data);
                populateTable(formattedData);
            });
    }

    // Fetch and populate Area 3 table on page load
    fetchDataAndPopulateTable();

    // Fetch and populate Area 3 table every 30 seconds
    setInterval(() => {
        fetchDataAndPopulateTable();
    }, 30000);
});
=======
document.addEventListener("DOMContentLoaded", function() {
    const THINGSPEAK_CHANNEL_ID_AREA3 = '2592685';
    const THINGSPEAK_API_KEY_AREA3 = '414K1ZDNEA58ZF0M';

    const THINGSPEAK_URL_AREA3 = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID_AREA3}/feeds.json?api_key=${THINGSPEAK_API_KEY_AREA3}`;

    const tableArea3 = document.getElementById('area3-table');

    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.feeds; // Directly return feeds array
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                return [];
            });
    }

    function formatData(data) {
        return data.map(entry => ({
            date: entry.created_at || '',
            entry_id: entry.entry_id || '',
            field1: entry.field1 || '',
        }));
    }

    function populateTable(data) {
        const tbody = tableArea3.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        // Loop through data to display newest entries first
        for (let i = data.length - 1; i >= 0; i--) {
            const entry = data[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-800 px-4 py-2">${entry.date}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.entry_id}</td>
                <td class="border border-gray-800 px-4 py-2">${entry.field1}</td>
            `;
            tbody.appendChild(row);

            // Add a class to every 10th row for styling purposes
            if ((data.length - i) % 10 === 0 && i !== 0) {
                row.classList.add('border-b-2', 'border-gray-300'); // Add bottom border after every 10 rows
            }
        }
    }

    function fetchDataAndPopulateTable() {
        fetchData(THINGSPEAK_URL_AREA3)
            .then(data => {
                const formattedData = formatData(data);
                populateTable(formattedData);
            });
    }

    // Fetch and populate Area 3 table on page load
    fetchDataAndPopulateTable();

    // Fetch and populate Area 3 table every 30 seconds
    setInterval(() => {
        fetchDataAndPopulateTable();
    }, 30000);
});
>>>>>>> 507083a299e1f7a3789c26a220c6054cb3341aaa
