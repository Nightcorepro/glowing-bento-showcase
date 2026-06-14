import { useEffect, useState } from "react";

export interface LanyardActivity {
  id: string;
  name: string;
  type: number; // 0 game, 2 listening, 4 custom
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  sync_id?: string;
}

export interface LanyardSpotify {
  track_id: string;
  timestamps: { start: number; end: number };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string | null;
    global_name?: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let closed = false;

    const connect = () => {
      ws = new WebSocket("wss://api.lanyard.rest/socket");
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) {
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
          heartbeat = setInterval(() => {
            ws?.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        } else if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
          const d = msg.t === "INIT_STATE" ? msg.d[userId] ?? msg.d : msg.d;
          if (d) setData(d as LanyardData);
        }
      };
      ws.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!closed) setTimeout(connect, 2000);
      };
    };
    connect();

    return () => {
      closed = true;
      if (heartbeat) clearInterval(heartbeat);
      ws?.close();
    };
  }, [userId]);

  return data;
}
