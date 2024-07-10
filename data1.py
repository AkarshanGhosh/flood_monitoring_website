import requests
import time

THINGSPEAK_CHANNEL_ID = '2396670'
THINGSPEAK_API_KEY = '8WE32S1WQB7QL80C'  
THINGSPEAK_URL = f'https://api.thingspeak.com/channels/{THINGSPEAK_CHANNEL_ID}/feeds.json?api_key={THINGSPEAK_API_KEY}'

def fetch_data():
    try:
        response = requests.get(THINGSPEAK_URL)
        data = response.json()
        if 'feeds' in data:
            return data['feeds']
        else:
            print("Unexpected response structure:", data)
            return None
    except requests.RequestException as e:
        print(f"Request to ThingSpeak failed: {e}")
        return None
    except ValueError as e:
        print(f"Failed to parse response as JSON: {e}")
        return None

def format_data(data):
    formatted_data = []
    for entry in data:
        formatted_entry = {
            'date': entry.get('created_at', ''),
            'entry_id': entry.get('entry_id', ''),
            'field1': entry.get('field1', '')
        }
        formatted_data.append(formatted_entry)
    return formatted_data

# Main loop to continuously fetch and print data
while True:
    data = fetch_data()
    if data:
        formatted_data = format_data(data)
        # Print data in reverse order (new data at the top)
        for entry in reversed(formatted_data):
            print(entry)
    else:
        print("No data retrieved")

    # Delay between consecutive fetches 
    time.sleep(30)  
