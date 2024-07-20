document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to fetch data from ThingSpeak
    async function fetchData() {
        const THINGSPEAK_CHANNEL_ID = '2396670';
        const THINGSPEAK_API_KEY = '8WE32S1WQB7QL80C';
        const THINGSPEAK_URL = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}`;

        try {
            const response = await fetch(THINGSPEAK_URL);
            const data = await response.json();
            if ('feeds' in data) {
                return data.feeds;
            } else {
                console.error("Unexpected response structure:", data);
                return [];
            }
        } catch (error) {
            console.error("Request to ThingSpeak failed:", error);
            return [];
        }
    }

    // Function to format data
    function formatData(data) {
        return data.map(entry => ({
            date: entry.created_at || '',
            entry_id: entry.entry_id || '',
            field1: entry.field1 || ''
        }));
    }

    // Function to populate the table with data
    function populateTable(data) {
        const tableBody = document.querySelector('#area1-table tbody');
        tableBody.innerHTML = ''; // Clear existing data

        data.reverse().forEach(entry => {  // Reverse the data order
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date;
            row.appendChild(dateCell);

            const entryIdCell = document.createElement('td');
            entryIdCell.textContent = entry.entry_id;
            row.appendChild(entryIdCell);

            const field1Cell = document.createElement('td');
            field1Cell.textContent = entry.field1;
            row.appendChild(field1Cell);

            tableBody.appendChild(row);
        });
    }

    // Function to initialize data fetching and updating
    async function init() {
        const rawData = await fetchData();
        const formattedData = formatData(rawData);
        populateTable(formattedData);
    }

    // Initial data load
    init();

    // Update table data every 30 seconds
    setInterval(init, 30000);
});
