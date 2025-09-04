import { google } from 'googleapis';
import { DateTime } from 'luxon';

const CALENDAR_ID = 'chiefsthemagichouse@gmail.com';
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

export interface GoogleCalendarEvent
{
    id?: string | null;
    summary?: string | null;
    description?: string | null;
    start?: {
        dateTime?: string | null;
        date?: string | null;
        timeZone?: string | null;
    } | null;
    end?: {
        dateTime?: string | null;
        date?: string | null;
        timeZone?: string | null;
    } | null;
    location?: string | null;
    htmlLink?: string | null;
    creator?: {
        email?: string | null;
        displayName?: string | null;
    } | null;
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
            return events.map((this.processEvent || [])).filter(Boolean) as ProcessedEvent[];
        } catch (error) {
            console.error('Error fetching Google Calendar events:', error);
            return [];
        }
    }

    async getEventsForWeek (startDate: Date): Promise<ProcessedEvent[]>
    {
        const start = DateTime.fromJSDate(startDate, { zone: 'America/Los_Angeles' }).startOf('day');
        const end = start.plus({ days: 7 }).endOf('day');

        return this.getEvents(start.toJSDate(), end.toJSDate());
    }

    async getEventsForMonth (year: number, month: number): Promise<ProcessedEvent[]>
    {
        const start = DateTime.fromObject({ year, month: month + 1, day: 1 }, { zone: 'America/Los_Angeles' }).startOf('day');
        const end = start.endOf('month');

        return this.getEvents(start.toJSDate(), end.toJSDate());
    }

    private processEvent (event: GoogleCalendarEvent): ProcessedEvent | null
    {
        if (!event.start || !event.end || !event.id) return null;

        // Determine the event's timezone if provided, else default to LA timezone
        const eventTimeZone = event.start?.timeZone || event.end?.timeZone || 'America/Los_Angeles';

        // Use Luxon for robust timezone-safe parsing
        // For all-day events, Google Calendar uses an exclusive end date. Adjust by -1 day.
        const startDateTime = event.start.dateTime
            ? DateTime.fromISO(event.start.dateTime, { setZone: true }).setZone('America/Los_Angeles')
            : DateTime.fromISO(event.start.date || '', { zone: eventTimeZone }).setZone('America/Los_Angeles').startOf('day');

        const endDateTime = event.end.dateTime
            ? DateTime.fromISO(event.end.dateTime, { setZone: true }).setZone('America/Los_Angeles')
            : DateTime.fromISO(event.end.date || '', { zone: eventTimeZone }).setZone('America/Los_Angeles').minus({ days: 1 }).endOf('day');

        const isAllDay = !event.start.dateTime;

        return {
            id: event.id,
            title: event.summary || 'Untitled Event',
            description: event.description || undefined,
            start: startDateTime.toJSDate(),
            end: endDateTime.toJSDate(),
            location: event.location || undefined,
            isAllDay,
            url: event.htmlLink || undefined,
            creator: event.creator?.displayName || event.creator?.email || undefined
        };
    }
}

export const googleCalendarService = new GoogleCalendarService();
