
import requests

THINGSPEAK_URL = 'https://api.thingspeak.com/channels/2399528/fields/1.json?api_key=UTP787AIXRG4RZUJ&results=2'

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
        print("Request to ThingSpeak failed:", e)
        return None

# Fetch the data
data = fetch_data()
if data:
    for entry in data:
        print(entry['field1'])  # Assuming 'field1' corresponds to the field in the response
else:
    print("No data retrieved")