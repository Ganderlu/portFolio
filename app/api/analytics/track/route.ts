import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    
    // In a real app, this would be a database transaction
    // For this demo, we'll read, update, and write
    const data = await getData('analytics');
    
    // Update total views
    data.totalViews = (data.totalViews || 0) + 1;
    data.pageViews = (data.pageViews || 0) + 1;

    // Simulate Returning vs New visitors (Simple random logic for demo)
    if (!data.visitorsBreakdown) {
      data.visitorsBreakdown = { returning: 35, new: 65 };
    }
    // Occasionally fluctuate percentages slightly
    if (Math.random() > 0.8) {
      const isNew = Math.random() > 0.4;
      if (isNew) {
        data.visitorsBreakdown.new = Math.min(data.visitorsBreakdown.new + 1, 90);
        data.visitorsBreakdown.returning = 100 - data.visitorsBreakdown.new;
      } else {
        data.visitorsBreakdown.returning = Math.min(data.visitorsBreakdown.returning + 1, 90);
        data.visitorsBreakdown.new = 100 - data.visitorsBreakdown.returning;
      }
    }
    
    // Update page specific views
    const pageIndex = data.topPages.findIndex((p: any) => p.path === path);
    if (pageIndex >= 0) {
      data.topPages[pageIndex].views += 1;
    } else {
      // Add new page if not exists (limit to top 10 for file size)
      if (data.topPages.length < 10) {
        data.topPages.push({ path, views: 1 });
      }
    }
    
    // Sort pages by views
    data.topPages.sort((a: any, b: any) => b.views - a.views);

    // Update daily traffic (Views Over Time)
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Find today's entry
    const todayIndex = data.viewsOverTime.findIndex((day: any) => day.date === todayStr);
    if (todayIndex >= 0) {
      data.viewsOverTime[todayIndex].views += 1;
      // Simulate unique visitors (randomly increment every few views)
      if (Math.random() > 0.3) {
        data.viewsOverTime[todayIndex].visitors += 1;
      }
    } else {
      // Add new day
      data.viewsOverTime.push({
        date: todayStr,
        views: 1,
        visitors: 1
      });
      
      // Sort by date
      data.viewsOverTime.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Keep only last 60 days
      if (data.viewsOverTime.length > 60) {
        data.viewsOverTime.shift();
      }
    }

    // Simulate location tracking (Randomly increment a country)
    if (data.locations && data.locations.length > 0) {
      const randomLocIndex = Math.floor(Math.random() * data.locations.length);
      data.locations[randomLocIndex].visitors += 1;
      
      // Recalculate percentages
      const totalLocationVisitors = data.locations.reduce((acc: number, loc: any) => acc + loc.visitors, 0);
      data.locations.forEach((loc: any) => {
        loc.percentage = Math.round((loc.visitors / totalLocationVisitors) * 100);
      });
      
      // Sort locations
      data.locations.sort((a: any, b: any) => b.visitors - a.visitors);
    }
    
    await saveData('analytics', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}