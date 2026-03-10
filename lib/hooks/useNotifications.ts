"use client";

import { useState, useEffect, useCallback } from "react";

interface Notification {
  id: string;
  message: string;
  type: string;
  timestamp: any; // Firestore Timestamp
  read: boolean;
  metadata?: any;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Notification[] = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    } catch (err: any) {
      setError(err.message);
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (ids: string[]) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      // Optimistically update UI
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => prev - ids.length);
    } catch (err: any) {
      console.error("Failed to mark notifications as read:", err);
      // Re-fetch to ensure state consistency if optimistic update fails
      fetchNotifications();
    }
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return { notifications, unreadCount, loading, error, markAsRead, fetchNotifications };
};
