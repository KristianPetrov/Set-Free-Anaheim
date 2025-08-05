import { google } from 'googleapis';

const CALENDAR_ID = 'chiefsthemagichouse@gmail.com';
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

export interface GoogleCalendarEvent
{
    id: string;
    summary: string;
    description?: string;
    start: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    end: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    location?: string;
    htmlLink?: string;
    creator?: {
        email?: string;
        displayName?: string;
    };
}

export interface ProcessedEvent
{
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    location?: string;
    isAllDay: boolean;
    url?: string;
    creator?: string;
}

export class GoogleCalendarService
{
    private calendar;

    constructor()
    {
        this.calendar = google.calendar({
            version: 'v3',
            auth: API_KEY
        });
    }

    async getEvents (
        timeMin?: Date,
        timeMax?: Date,
        maxResults: number = 50
    ): Promise<ProcessedEvent[]>
    {
        try {
            const response = await this.calendar.events.list({
                calendarId: CALENDAR_ID,
                timeMin: timeMin?.toISOString() || new Date().toISOString(),
                timeMax: timeMax?.toISOString(),
                maxResults,
                singleEvents: true,
                orderBy: 'startTime',
            });

            const events = response.data.items || [];
            return events.map(this.processEvent).filter(Boolean) as ProcessedEvent[];
        } catch (error) {
            console.error('Error fetching Google Calendar events:', error);
            return [];
        }
    }

    async getEventsForWeek (startDate: Date): Promise<ProcessedEvent[]>
    {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        return this.getEvents(startDate, endDate);
    }

    async getEventsForMonth (year: number, month: number): Promise<ProcessedEvent[]>
    {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        endDate.setHours(23, 59, 59, 999);

        return this.getEvents(startDate, endDate);
    }

    private processEvent (event: GoogleCalendarEvent): ProcessedEvent | null
    {
        if (!event.start || !event.end) return null;

        const startDate = event.start.dateTime
            ? new Date(event.start.dateTime)
            : new Date(event.start.date + 'T00:00:00');

        const endDate = event.end.dateTime
            ? new Date(event.end.dateTime)
            : new Date(event.end.date + 'T23:59:59');

        const isAllDay = !event.start.dateTime;

        return {
            id: event.id,
            title: event.summary || 'Untitled Event',
            description: event.description,
            start: startDate,
            end: endDate,
            location: event.location,
            isAllDay,
            url: event.htmlLink,
            creator: event.creator?.displayName || event.creator?.email
        };
    }
}

export const googleCalendarService = new GoogleCalendarService();
