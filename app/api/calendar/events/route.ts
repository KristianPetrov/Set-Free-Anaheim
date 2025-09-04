import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/google-calendar';
import { DateTime } from 'luxon';

export async function GET (request: NextRequest)
{
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const view = searchParams.get('view') || 'week';
        const dateParam = searchParams.get('date');

        const base = dateParam
            ? DateTime.fromISO(dateParam, { setZone: true }).setZone('America/Los_Angeles')
            : DateTime.now().setZone('America/Los_Angeles');

        let events;

        if (view === 'week') {
            // Start of week anchored to Sunday in America/Los_Angeles
            const weekday = base.weekday; // 1 (Mon) .. 7 (Sun)
            const daysFromSunday = weekday % 7; // Sun -> 0, Mon -> 1, ...
            const startOfWeek = base.startOf('day').minus({ days: daysFromSunday });
            events = await googleCalendarService.getEventsForWeek(startOfWeek.toJSDate());
        } else if (view === 'month') {
            const year = base.year;
            const monthIndex = base.month - 1; // service expects JS-like month index
            events = await googleCalendarService.getEventsForMonth(year, monthIndex);
        } else {
            // Default to next 30 days, LA-anchored day boundaries
            const start = base.startOf('day');
            const end = start.plus({ days: 30 }).endOf('day');
            events = await googleCalendarService.getEvents(start.toJSDate(), end.toJSDate());
        }
        console.log(JSON.stringify(events))
        return NextResponse.json({
            success: true,
            events,
            count: events.length
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch calendar events',
            events: []
        }, { status: 500 });
    }
}

export async function OPTIONS ()
{
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}