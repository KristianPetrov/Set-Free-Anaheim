import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/google-calendar';

export async function GET (request: NextRequest)
{
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const view = searchParams.get('view') || 'week';
        const dateParam = searchParams.get('date');

        let startDate = new Date();
        if (dateParam) {
            startDate = new Date(dateParam);
        }

        let events;

        if (view === 'week') {
            // Get start of week (Sunday)
            const startOfWeek = new Date(startDate);
            startOfWeek.setDate(startDate.getDate() - startDate.getDay());
            events = await googleCalendarService.getEventsForWeek(startOfWeek);
        } else if (view === 'month') {
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            events = await googleCalendarService.getEventsForMonth(year, month);
        } else {
            // Default to next 30 days
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30);
            events = await googleCalendarService.getEvents(startDate, endDate);
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