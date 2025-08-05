# Google Calendar API Setup

To enable the Google Calendar integration, you need to set up a Google Calendar API key.

## Steps to Get Your API Key:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select an existing one)
3. **Enable the Google Calendar API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"
4. **Create credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key that's generated
5. **Restrict the API key** (recommended):
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Calendar API" from the list

## Environment Setup:

Create a `.env.local` file in your project root and add:

```
GOOGLE_CALENDAR_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you got from Google Cloud Console.

## Public Calendar Access:

The current setup is configured to access the public calendar: `chiefsthemagichouse@gmail.com`

If you need to change this, edit the `CALENDAR_ID` in `lib/google-calendar.ts`.

## Features Enabled:

✅ **Real-time event fetching** from your Google Calendar
✅ **Week and Month views** with Google Calendar integration
✅ **Combined display** of recurring events (with images) + Google Calendar events
✅ **Event details** including time, location, and description
✅ **Direct links** to Google Calendar for full event management

## Color Coding:

- **Red events**: Your recurring weekly events (with images)
- **Blue events**: Google Calendar events
- **Live view**: Full Google Calendar embed

Restart your development server after adding the environment variable!