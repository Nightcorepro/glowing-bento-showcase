import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Github,
  Youtube,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Search,
  Cloud,
  Droplets,
  Wind,
  Play,
  SkipBack,
  SkipForward,
  MessageCircle,
} from "lucide-react";
import { useLanyard } from "@/lib/lanyard";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const DISCORD_ID = "1113463634409041951";
const BANNER_URL = "https://cdn.pfps.gg/banners/8401-white-tree.gif";

const TABS = ["Home", "Projects", "Contact", "About"] as const;
type Tab = (typeof TABS)[number];

function Portfolio() {
  const [tab, setTab] = useState<Tab>("Home");
  const lanyard = useLanyard(DISCORD_ID);

  const avatarUrl = lanyard?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.${lanyard.discord_user.avatar.startsWith("a_") ? "gif" : "png"}?size=256`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="relative mx-auto w-full max-w-xl px-4 py-6 sm:py-10">
        <div className="card-soft overflow-hidden">
          <Hero avatarUrl={avatarUrl} />
          <div className="px-5 sm:px-7 pb-8">
            <Tabs tab={tab} setTab={setTab} />
            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {tab === "Home" && <HomeTab lanyard={lanyard} />}
                  {tab === "Projects" && <ProjectsTab />}
                  {tab === "Contact" && <ContactTab />}
                  {tab === "About" && <AboutTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Nightcorepro
        </p>
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero({ avatarUrl }: { avatarUrl: string }) {
  const name = "Nightcorepro";
  return (
    <div className="relative">
      <div className="relative aspect-[5/2] w-full overflow-hidden rounded-t-[inherit]">
        <img
          src={BANNER_URL}
          alt="Profile banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/70" />
      </div>

      <div className="flex justify-center -mt-14 sm:-mt-16">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full neon-ring opacity-90 blur-[2px]" />
          <div className="relative rounded-full p-[3px] bg-card">
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center px-5 mt-4">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-wide">
          <AnimatedText text={name} />
        </h1>
        <p className="mt-2 text-muted-foreground text-sm sm:text-base">
          Game Developer, UI Designer and Software Engineer.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          97 Subscribers <span className="mx-2 opacity-50">•</span> 9 projects{" "}
          <span className="mx-2 opacity-50">•</span> 5k members
        </p>

        <div className="mt-6 space-y-3">
          <PillButton href="https://discord.gg/" label="Join Discord" />
          <PillButton href="https://github.com/" label="GitHub" />
        </div>

        <div className="mt-5 flex items-center justify-center gap-6 text-muted-foreground">
          <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
          <a href={`https://discord.com/users/${DISCORD_ID}`} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            <DiscordIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

function AnimatedText({ text }: { text: string }) {
  const letters = useMemo(() => text.split(""), [text]);
  return (
    <span className="inline-block">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.45, ease: "easeOut" }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

function PillButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block w-full rounded-2xl border border-border bg-muted/40 px-6 py-3.5 text-center font-semibold hover:bg-muted/70 hover:border-white/20 hover:shadow-[0_0_24px_-8px_rgba(255,255,255,0.25)] transition-colors"
    >
      {label}
    </motion.a>
  );
}

/* ---------- TABS ---------- */
function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <LayoutGroup id="tabs">
      <div className="relative flex items-center justify-between border-b border-border">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 py-3 text-sm sm:text-base font-medium transition-colors ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {t}
              {active && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-1px] h-[2px] w-8 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

/* ---------- HOME ---------- */
function HomeTab({ lanyard }: { lanyard: ReturnType<typeof useLanyard> }) {
  return (
    <div>
      <h2 className="text-center text-2xl sm:text-3xl font-bold">Welcome!</h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Check out my projects, or get in touch via the Contact tab.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <WeatherCard />
        <MusicCard lanyard={lanyard} />
        <DiscordActivityCard lanyard={lanyard} />
        <StatsCard />
      </div>
    </div>
  );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-2xl border border-border bg-muted/30 p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function WeatherCard() {
  return (
    <BentoCard>
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">Lahore</span>
        <Cloud className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="mt-3 text-4xl font-bold">29°C</div>
      <div className="text-sm text-muted-foreground">Clear</div>
      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Droplets className="h-3.5 w-3.5" /> 52%
        </span>
        <span className="inline-flex items-center gap-1">
          <Wind className="h-3.5 w-3.5" /> 12 km/h
        </span>
      </div>
    </BentoCard>
  );
}

function StatsCard() {
  return (
    <BentoCard>
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground">
        <DiscordIcon className="h-4 w-4" /> DISCORD
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">No Activity</div>
    </BentoCard>
  );
}

function DiscordActivityCard({ lanyard }: { lanyard: ReturnType<typeof useLanyard> }) {
  const activity = lanyard?.activities?.find((a) => a.type !== 4 && a.name !== "Spotify");
  return (
    <BentoCard className="col-span-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground">
          <DiscordIcon className="h-4 w-4" /> DISCORD STATUS
        </div>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            lanyard?.discord_status === "online"
              ? "bg-emerald-500"
              : lanyard?.discord_status === "idle"
                ? "bg-amber-400"
                : lanyard?.discord_status === "dnd"
                  ? "bg-red-500"
                  : "bg-zinc-500"
          }`}
        />
      </div>
      <div className="mt-3">
        {activity ? (
          <div>
            <div className="text-sm font-semibold">{activity.name}</div>
            {activity.details && <div className="text-xs text-muted-foreground">{activity.details}</div>}
            {activity.state && <div className="text-xs text-muted-foreground">{activity.state}</div>}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No Activity</div>
        )}
      </div>
    </BentoCard>
  );
}

function MusicCard({ lanyard }: { lanyard: ReturnType<typeof useLanyard> }) {
  const spotify = lanyard?.spotify;
  const listening = !!(lanyard?.listening_to_spotify && spotify);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = listening ? spotify!.timestamps.end - spotify!.timestamps.start : 156000;
  const elapsed = listening
    ? Math.min(Math.max(now - spotify!.timestamps.start, 0), total)
    : 0;
  const pct = (elapsed / total) * 100;
  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <BentoCard className="col-span-2">
      <div className="flex gap-4">
        <img
          src={
            listening
              ? spotify!.album_art_url
              : "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&q=80"
          }
          alt="Album art"
          className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold truncate">
            {listening ? spotify!.song : "Heartburn"}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {listening ? spotify!.artist : "Tenseoh"}
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear", duration: 1 }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>{fmt(elapsed)}</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-6 text-muted-foreground">
        <button className="hover:text-foreground transition-colors"><SkipBack className="h-5 w-5" /></button>
        <button className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center">
          <Play className="h-5 w-5 ml-0.5" />
        </button>
        <button className="hover:text-foreground transition-colors"><SkipForward className="h-5 w-5" /></button>
      </div>
    </BentoCard>
  );
}

/* ---------- PROJECTS ---------- */
const WEB_PROJECTS = [
  { name: "Evadex", url: "https://evadexnight.vercel.app" },
  { name: "Inamusic", url: "https://inamusic.in/" },
  { name: "Strelix v2", url: "https://strelixv2.vercel.app/" },
  { name: "Nightcorepro.dev", url: "https://nightcorepro.dev/" },
];

const DESIGN_PROJECTS = [
  {
    name: "CV2 Music Nothing Bot",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  },
  {
    name: "Halix Cloud",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
];

function ProjectsTab() {
  const [sub, setSub] = useState<"Web" | "Designs">("Web");
  const [q, setQ] = useState("");

  const web = WEB_PROJECTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const designs = DESIGN_PROJECTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h2 className="text-center text-2xl sm:text-3xl font-bold">Projects</h2>

      <div className="mt-5 flex items-center gap-3">
        <LayoutGroup id="proj-tabs">
          <div className="relative inline-flex rounded-full border border-border bg-muted/40 p-1">
            {(["Web", "Designs"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSub(s)}
                className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  sub === s ? "text-background" : "text-foreground"
                }`}
              >
                {sub === s && (
                  <motion.span
                    layoutId="sub-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{s}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <AnimatePresence mode="wait">
          {sub === "Web" ? (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {web.map((p) => (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 px-4 py-3.5 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.url}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-3" />
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="designs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {designs.map((p) => (
                <motion.div
                  key={p.name}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-border bg-muted/30 overflow-hidden"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-4 py-3 font-semibold">{p.name}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
function ContactTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <div className="text-center">
      <div className="mx-auto h-12 w-12 rounded-full border border-border bg-muted/30 flex items-center justify-center">
        <Mail className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-2xl font-bold">Get in Touch</h2>

      <div className="mt-6 space-y-3 text-left">
        <ContactRow
          icon={<DiscordIcon className="h-6 w-6" />}
          label="Discord"
          value="nightcorepro"
          onCopy={() => copy("d", "nightcorepro")}
          copied={copied === "d"}
        />
        <ContactRow
          icon={<Mail className="h-6 w-6" />}
          label="Email"
          value="Nightcoreproyt@gmail.com"
          onCopy={() => copy("e", "Nightcoreproyt@gmail.com")}
          copied={copied === "e"}
        />
      </div>

      <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        href={`https://discord.com/users/${DISCORD_ID}`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-muted/40 px-6 py-3.5 font-semibold hover:bg-muted/70 transition-colors"
      >
        <DiscordIcon className="h-5 w-5" /> Contact on Discord
      </motion.a>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  onCopy,
  copied,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold truncate">{value}</div>
      </div>
      <button
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ---------- ABOUT ---------- */
const SKILLS = [
  "TypeScript", "Rust", "Java", "Python",
  "Node.js", "AI Engineering", "Telegram Bots",
  "Minecraft Plugins", "VS Code", "Linux",
];

function AboutTab() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">About Me</h2>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        I'm Nightcorepro — a game developer, UI designer and software engineer. I build games,
        clean interfaces, Discord bots and tinker with AI on the side.
      </p>

      <h3 className="mt-8 text-lg font-bold">Skills & Tools</h3>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SKILLS.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -2 }}
            className="rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ---------- ICONS ---------- */
function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a14.7 14.7 0 0 0-.69 1.41 18.27 18.27 0 0 0-5.736 0A14.5 14.5 0 0 0 9.44 3a19.74 19.74 0 0 0-3.76 1.37C2.07 9.78 1.09 15.05 1.58 20.25a19.9 19.9 0 0 0 6.02 3.04c.49-.66.92-1.36 1.29-2.1a12.9 12.9 0 0 1-2.04-.97c.17-.13.34-.26.5-.4 3.93 1.81 8.18 1.81 12.06 0 .17.14.33.27.5.4-.65.39-1.33.71-2.04.97.37.74.8 1.44 1.29 2.1a19.85 19.85 0 0 0 6.03-3.04c.58-6.02-1-11.25-3.87-15.88ZM8.52 16.5c-1.18 0-2.16-1.08-2.16-2.41 0-1.33.95-2.42 2.16-2.42 1.2 0 2.18 1.09 2.16 2.42 0 1.33-.96 2.41-2.16 2.41Zm6.96 0c-1.18 0-2.16-1.08-2.16-2.41 0-1.33.95-2.42 2.16-2.42 1.2 0 2.18 1.09 2.16 2.42 0 1.33-.95 2.41-2.16 2.41Z" />
    </svg>
  );
}
