/** Non-animated product mockups. All data is fictional demo data. */
import {
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ConciergeBell,
  CreditCard,
  Flower2,
  Inbox,
  MessageSquareText,
  Mountain,
  ShoppingBag,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { AppShell, Avatar, Bubble, KeyValue, Panel, Pill, RoomTag } from "../kit";

/* ---------------- Overview ---------------- */
export function OverviewMock() {
  const kpis = [
    { label: "Conversations today", value: "184" },
    { label: "Open requests", value: "23" },
    { label: "Handled by Sarai", value: "71%" },
    { label: "Arrivals today", value: "46" },
  ];
  const activity = [
    { who: "Maya Chen · 412", what: "Late checkout confirmed", tone: "success" as const, tag: "Front Desk" },
    { who: "Tom Walsh · 207", what: "Extra towels requested", tone: "warning" as const, tag: "Housekeeping" },
    { who: "Ines Duarte · 318", what: "Asked about spa hours", tone: "ai" as const, tag: "Answered" },
    { who: "Kenji Mori · 105", what: "Airport transfer requested", tone: "warning" as const, tag: "Concierge" },
    { who: "Lena Fischer · 509", what: "Handed to team", tone: "human" as const, tag: "Front Desk" },
  ];
  const depts = [
    { name: "Housekeeping", v: 82 },
    { name: "Front Desk", v: 64 },
    { name: "Concierge", v: 41 },
    { name: "Restaurant", v: 28 },
    { name: "Spa", v: 17 },
  ];
  return (
    <AppShell active="overview" title="Good morning, Front Desk">
      <div className="grid h-full grid-rows-[auto_1fr] gap-4 p-5">
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Panel key={k.label}>
              <p className="text-stone">{k.label}</p>
              <p className="mt-1 text-[28px] font-bold tracking-tight">{k.value}</p>
            </Panel>
          ))}
        </div>
        <div className="grid min-h-0 grid-cols-[1.4fr_1fr] gap-4">
          <Panel title="Live activity">
            <ul className="divide-y divide-line">
              {activity.map((a) => (
                <li key={a.who} className="flex items-center gap-3 py-2.5">
                  <Avatar name={a.who} tone="stone" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{a.what}</p>
                    <p className="text-[11px] text-stone">{a.who}</p>
                  </div>
                  <Pill tone={a.tone}>{a.tag}</Pill>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Requests by team">
            <ul className="space-y-3.5">
              {depts.map((d) => (
                <li key={d.name}>
                  <div className="mb-1 flex justify-between">
                    <span>{d.name}</span>
                    <span className="font-semibold">{d.v}</span>
                  </div>
                  <div className="h-2 rounded-full bg-linen-2">
                    <div className="h-2 rounded-full bg-ink" style={{ width: `${d.v}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------------- Conversations ---------------- */
const convos = [
  {
    name: "Maya Chen",
    room: "412",
    msg: "Late checkout tomorrow?",
    status: "Resolved",
    team: "Front Desk",
    owner: "ai",
  },
  {
    name: "Tom Walsh",
    room: "207",
    msg: "Extra towels please",
    status: "In progress",
    team: "Housekeeping",
    owner: "ai",
  },
  {
    name: "Lena Fischer",
    room: "509",
    msg: "Question about my invoice",
    status: "Waiting",
    team: "Front Desk",
    owner: "human",
  },
  {
    name: "Kenji Mori",
    room: "105",
    msg: "Airport transfer Friday",
    status: "In progress",
    team: "Concierge",
    owner: "ai",
  },
  { name: "Ines Duarte", room: "318", msg: "Spa hours on Sunday", status: "Resolved", team: "—", owner: "ai" },
  { name: "Sam Okoro", room: "221", msg: "Crib for our room?", status: "New", team: "Housekeeping", owner: "ai" },
];
const statusTone = { Resolved: "success", "In progress": "warning", Waiting: "human", New: "ai" } as const;

export function ConversationsMock() {
  return (
    <AppShell
      active="inbox"
      title="Conversations"
      actions={
        <Pill tone="neutral">
          <Inbox className="size-3" /> All channels
        </Pill>
      }
    >
      <div className="grid h-full grid-cols-[1.5fr_1fr]">
        <div className="p-5">
          <div className="grid grid-cols-[1.4fr_0.6fr_1.6fr_0.9fr_1fr_0.8fr] gap-3 border-b border-line px-2 pb-2 text-[11px] font-semibold tracking-wide text-stone uppercase">
            <span>Guest</span>
            <span>Room</span>
            <span>Conversation</span>
            <span>Status</span>
            <span>Team</span>
            <span>Owner</span>
          </div>
          <ul>
            {convos.map((c, i) => (
              <li
                key={c.name}
                className={`grid grid-cols-[1.4fr_0.6fr_1.6fr_0.9fr_1fr_0.8fr] items-center gap-3 rounded-lg px-2 py-3 ${i === 2 ? "bg-white shadow-[0_0_0_1px_var(--line)]" : ""}`}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Avatar name={c.name} size={24} /> {c.name}
                </span>
                <span>{c.room}</span>
                <span className="truncate text-stone">{c.msg}</span>
                <Pill tone={statusTone[c.status as keyof typeof statusTone]}>{c.status}</Pill>
                <span className="text-stone">{c.team}</span>
                <Pill tone={c.owner === "ai" ? "ai" : "human"}>{c.owner === "ai" ? "Sarai" : "Human"}</Pill>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-l border-line bg-[#f7f6f2] p-5">
          <div className="flex items-center gap-2">
            <Avatar name="Lena Fischer" />
            <div>
              <p className="font-semibold">Lena Fischer</p>
              <p className="text-[11px] text-stone">Room 509 · Handed to team</p>
            </div>
          </div>
          <Bubble from="guest">I have a question about a charge on my invoice.</Bubble>
          <Bubble from="sarai">
            I&apos;ll connect you with our front desk team — they can review your invoice with you.
          </Bubble>
          <Bubble from="staff">Hi Lena, happy to help. Which charge would you like us to look at?</Bubble>
          <div className="mt-auto rounded-lg border border-line bg-white px-3 py-2.5 text-stone">
            Reply as Front Desk…
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------------- Guest profile ---------------- */
export function ProfileMock() {
  return (
    <AppShell active="guests" title="Guest profile">
      <div className="grid h-full grid-cols-[1fr_1.3fr_1fr] gap-4 p-5">
        <div className="space-y-4">
          <Panel>
            <div className="flex items-center gap-3">
              <Avatar name="Maya Chen" size={48} />
              <div>
                <p className="text-[16px] font-bold">Maya Chen</p>
                <p className="text-stone">Returning guest · 3rd stay</p>
              </div>
            </div>
          </Panel>
          <Panel title="Stay">
            <KeyValue k="Room" v={<RoomTag room="412" />} />
            <KeyValue k="Arrival" v="Mon, 14 Sep" />
            <KeyValue k="Departure" v="Thu, 17 Sep" />
            <KeyValue k="Guests" v="2 adults" />
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Previous interactions">
            <ul className="space-y-3">
              {[
                ["Today", "Late checkout confirmed until 2:00 PM"],
                ["Yesterday", "Dinner reservation request for two"],
                ["Mon", "Asked for Wi-Fi and breakfast times"],
                ["Last stay", "Requested extra pillows"],
              ].map(([when, what]) => (
                <li key={what} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-iris" />
                  <div>
                    <p className="font-semibold">{what}</p>
                    <p className="text-[11px] text-stone">{when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Current requests">
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold">Late checkout · 2:00 PM</span>
              <Pill tone="success">
                <Check className="size-3" /> Confirmed
              </Pill>
            </div>
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Preferences">
            <div className="flex flex-wrap gap-1.5">
              {["High floor", "Extra pillows", "Quiet room", "Oat milk", "Late riser"].map((p) => (
                <Pill key={p} tone="neutral">
                  {p}
                </Pill>
              ))}
            </div>
          </Panel>
          <Panel title="Team notes">
            <p className="leading-relaxed text-stone">
              Celebrating an anniversary on this stay. Prefers messages over calls.
            </p>
            <p className="mt-2 text-[11px] text-stone">— Front Desk</p>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------------- Analytics ---------------- */
const hours = [12, 18, 26, 40, 58, 64, 52, 44, 48, 60, 72, 66, 54, 38, 24, 16];
export function AnalyticsMock() {
  const max = Math.max(...hours);
  return (
    <AppShell active="analytics" title="Analytics · Last 7 days">
      <div className="grid h-full grid-cols-[1.6fr_1fr] gap-4 p-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              ["Guest conversations", "1,240"],
              ["Requests created", "312"],
              ["Guest engagement", "64%"],
            ].map(([k, v]) => (
              <Panel key={k}>
                <p className="text-stone">{k}</p>
                <p className="mt-1 text-[26px] font-bold tracking-tight">{v}</p>
              </Panel>
            ))}
          </div>
          <Panel title="Conversations by hour" className="flex-1">
            <div className="flex h-[260px] items-end gap-2">
              {hours.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="w-full rounded-t-md bg-iris/80" style={{ height: `${(h / max) * 220}px` }} />
                  <span className="text-[10px] text-stone">{i + 7}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <div className="flex flex-col gap-4">
          <Panel title="Popular questions">
            <ul className="space-y-2.5">
              {[
                ["Breakfast times", 88],
                ["Wi-Fi details", 74],
                ["Late checkout", 61],
                ["Parking", 43],
                ["Spa availability", 30],
              ].map(([q, v]) => (
                <li key={q as string}>
                  <div className="mb-1 flex justify-between">
                    <span>{q}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-linen-2">
                    <div className="h-1.5 rounded-full bg-brass" style={{ width: `${v}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Resolution">
            <div className="flex items-center gap-5">
              <svg viewBox="0 0 36 36" className="size-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--linen-2)" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="var(--iris)"
                  strokeWidth="4"
                  strokeDasharray="71 100"
                />
              </svg>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-iris" /> Resolved by Sarai
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-linen-2 ring-1 ring-line" /> Handed to team
                </li>
              </ul>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------------- Integrations ---------------- */
const integrationTiles = [
  { name: "PMS", icon: Building2, status: "Integration" },
  { name: "CRM", icon: Users, status: "Integration" },
  { name: "Booking Engine", icon: CalendarDays, status: "Integration" },
  { name: "POS", icon: ShoppingBag, status: "Coming soon" },
  { name: "Housekeeping", icon: BedDouble, status: "Integration" },
  { name: "Messaging", icon: MessageSquareText, status: "Integration" },
  { name: "Payments", icon: CreditCard, status: "Coming soon" },
  { name: "Spa", icon: Flower2, status: "Coming soon" },
  { name: "Activities", icon: Mountain, status: "Coming soon" },
];
export function IntegrationsMock() {
  return (
    <AppShell active="integrations" title="Integrations">
      <div className="p-5">
        <p className="mb-4 text-stone">
          Connect SaraiOS to the systems your property runs on. Availability is confirmed during onboarding.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {integrationTiles.map(({ name, icon: Icon, status }) => (
            <Panel key={name}>
              <div className="flex items-start justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-linen-2">
                  <Icon className="size-5" />
                </span>
                <Pill tone={status === "Integration" ? "ai" : "neutral"}>{status}</Pill>
              </div>
              <p className="mt-3 text-[15px] font-bold">{name}</p>
              <p className="text-stone">{status === "Integration" ? "Configure connection" : "On the roadmap"}</p>
            </Panel>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

/* ---------------- Settings ---------------- */
function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`inline-flex h-5 w-9 items-center rounded-full p-0.5 ${on ? "bg-ink" : "bg-linen-2"}`}>
      <span className={`size-4 rounded-full bg-white shadow ${on ? "translate-x-4" : ""}`} />
    </span>
  );
}
export function SettingsMock() {
  return (
    <AppShell active="settings" title="Property settings">
      <div className="grid h-full grid-cols-2 gap-4 p-5">
        <div className="space-y-4">
          <Panel title="Tone of voice">
            <div className="flex flex-wrap gap-1.5">
              {["Warm", "Polished", "Concise"].map((t) => (
                <Pill key={t} tone="ai">
                  {t}
                </Pill>
              ))}
            </div>
            <p className="mt-3 leading-relaxed text-stone">“Welcome back. How can we make your stay easier today?”</p>
          </Panel>
          <Panel title="Knowledge">
            {["Hotel information", "Dining & menus", "Spa & wellness", "Local recommendations"].map((k) => (
              <KeyValue
                key={k}
                k={k}
                v={
                  <Pill tone="success">
                    <Check className="size-3" /> Approved
                  </Pill>
                }
              />
            ))}
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Handoff rules">
            {[
              ["Billing questions → Front Desk", true],
              ["Complaints → Duty Manager", true],
              ["VIP guests → Concierge", true],
              ["After-hours escalation", false],
            ].map(([k, on]) => (
              <div key={k as string} className="flex items-center justify-between py-2">
                <span>{k}</span>
                <Toggle on={on as boolean} />
              </div>
            ))}
          </Panel>
          <Panel title="Routing">
            <KeyValue
              k="Amenity requests"
              v={
                <span className="flex items-center gap-1">
                  <ConciergeBell className="size-3.5" /> Housekeeping
                </span>
              }
            />
            <KeyValue
              k="Dining"
              v={
                <span className="flex items-center gap-1">
                  <UtensilsCrossed className="size-3.5" /> Restaurant
                </span>
              }
            />
            <KeyValue
              k="Experiences"
              v={
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3.5" /> Concierge
                </span>
              }
            />
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
