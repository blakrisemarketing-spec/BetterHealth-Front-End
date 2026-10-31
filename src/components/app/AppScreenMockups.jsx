// Coded stand-ins for the BetterHealth app's screens, drawn in the app's own
// palette (cream background, deep green, coloured rings) for PhoneFrame.
// The figures are illustrative, not anyone's data. APP_SCREENS in
// screens.jsx is what the pages use.
import { Home, HeartPulse, Trophy, BookOpen, Plus, Camera, MessageSquareText, ScanBarcode, Check, Bell } from "lucide-react";

const C = {
  bg: "#F4F0E8",
  card: "#FFFFFF",
  chip: "#EAE4D8",
  green: "#1F5C4A",
  ink: "#1E2A26",
  muted: "#6F6A62",
  food: "#2E8B67",
  water: "#3B82C4",
  move: "#7B5CC8",
  orange: "#E07A2E",
  amber: "#B7791F",
};

function Screen({ children }) {
  return (
    <div
      className="absolute inset-0 flex flex-col font-heading"
      style={{ background: C.bg, color: C.ink, fontSize: 11, lineHeight: 1.35 }}
    >
      <div className="flex justify-between items-center px-6 pt-4 pb-1 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="w-4 h-2 rounded-sm" style={{ background: C.ink }} />
      </div>
      <div className="flex-1 overflow-hidden px-4 pt-6">{children}</div>
      <TabBar />
    </div>
  );
}

function TabBar() {
  const tabs = [
    { Icon: Home, label: "Home" },
    { Icon: HeartPulse, label: "My Health" },
    { Icon: Trophy, label: "Challenges" },
    { Icon: BookOpen, label: "Learn" },
  ];
  return (
    <div className="flex items-center gap-2 px-3 pb-5 pt-2">
      <div className="flex-1 flex justify-around rounded-full py-1.5" style={{ background: C.card }}>
        {tabs.map((tab) => (
          <div key={tab.label} className="flex flex-col items-center gap-0.5" style={{ color: C.muted, fontSize: 8 }}>
            <tab.Icon size={13} strokeWidth={2.4} />
            {tab.label}
          </div>
        ))}
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: C.green }}>
        <Plus size={18} strokeWidth={2.6} />
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[20px] p-3 ${className}`} style={{ background: C.card }}>
      {children}
    </div>
  );
}

function Ring({ r, value, color }) {
  const c = 2 * Math.PI * r;
  return (
    <>
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="9" />
      <circle
        cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${c * value} ${c}`} transform="rotate(-90 50 50)"
      />
    </>
  );
}

export function HomeScreen() {
  const tiles = [
    { label: "Move", sub: "22 of 30 min", color: C.move, done: false },
    { label: "Meals", sub: "2 of 2", color: C.orange, done: true },
    { label: "Water", sub: "1 L of 1.6 L", color: C.water, done: false },
  ];
  return (
    <Screen>
      <p style={{ color: C.muted }}>Friday 30 October</p>
      <p className="text-[22px] font-bold leading-tight mb-3">Good morning,<br />Ama</p>
      <Card className="flex items-center gap-3 mb-3">
        <svg viewBox="0 0 100 100" className="w-[92px] h-[92px] shrink-0">
          <Ring r={44} value={0.69} color={C.food} />
          <Ring r={32} value={0.62} color={C.water} />
          <Ring r={20} value={0.73} color={C.move} />
        </svg>
        <div className="flex flex-col gap-1">
          <div><p className="font-semibold">Food</p><p className="text-[15px] font-bold" style={{ color: C.food }}>1,240<span className="text-[9px] font-semibold"> / 1,800 kcal</span></p></div>
          <div><p className="font-semibold">Water</p><p className="text-[15px] font-bold" style={{ color: C.water }}>1,000<span className="text-[9px] font-semibold"> / 1,600 ml</span></p></div>
          <div><p className="font-semibold">Exercise</p><p className="text-[15px] font-bold" style={{ color: C.move }}>22<span className="text-[9px] font-semibold"> / 30 min</span></p></div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between font-semibold mb-2"><span>Today&apos;s healthy day</span><span style={{ color: C.muted }}>1 of 3</span></div>
        <div className="grid grid-cols-3 gap-1.5">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-[14px] py-2 flex flex-col items-center gap-1" style={{ background: C.bg }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: t.color }}>
                {t.done ? <Check size={13} strokeWidth={3} /> : null}
              </span>
              <span className="font-semibold">{t.label}</span>
              <span style={{ color: C.muted, fontSize: 8.5 }}>{t.sub}</span>
            </div>
          ))}
        </div>
      </Card>
    </Screen>
  );
}

export function FoodScreen() {
  const meals = [
    { meal: "Breakfast", name: "Hausa koko and koose", kcal: 310 },
    { meal: "Lunch", name: "Waakye, boiled egg and wele", kcal: 640 },
    { meal: "Snack", name: "Roasted groundnuts", kcal: 160 },
    { meal: "Dinner", name: "Kontomire stew with yam", kcal: 130, draft: true },
  ];
  return (
    <Screen>
      <p className="text-[20px] font-bold mb-3">Food</p>
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[{ Icon: Camera, label: "Photo" }, { Icon: MessageSquareText, label: "Describe" }, { Icon: ScanBarcode, label: "Barcode" }].map((b) => (
          <div key={b.label} className="rounded-[14px] py-2.5 flex flex-col items-center gap-1 font-semibold" style={{ background: C.card }}>
            <b.Icon size={16} style={{ color: C.green }} />
            {b.label}
          </div>
        ))}
      </div>
      <Card className="mb-3">
        <div className="flex justify-between items-baseline">
          <span className="font-semibold">Today</span>
          <span className="text-[15px] font-bold" style={{ color: C.food }}>1,240 <span className="text-[9px]">of 1,800 kcal</span></span>
        </div>
        <div className="h-1.5 rounded-full mt-2" style={{ background: "#E3EFE9" }}>
          <div className="h-1.5 rounded-full" style={{ width: "69%", background: C.food }} />
        </div>
      </Card>
      <div className="flex flex-col gap-1.5">
        {meals.map((m) => (
          <Card key={m.meal} className="flex justify-between items-center !py-2.5">
            <div>
              <p style={{ color: C.muted, fontSize: 9 }}>{m.meal}</p>
              <p className="font-semibold">{m.name}</p>
            </div>
            <span className="font-bold" style={{ color: m.draft ? C.muted : C.ink }}>{m.draft ? "Add" : `${m.kcal}`}</span>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

export function ReadingsScreen() {
  const sys = [138, 134, 131, 133, 128, 126, 124];
  const dia = [88, 86, 85, 86, 83, 82, 80];
  const y = (v) => 100 - ((v - 70) / 80) * 100;
  const path = (vals) => vals.map((v, i) => `${i ? "L" : "M"}${i * 40 + 10},${y(v)}`).join(" ");
  return (
    <Screen>
      <p className="text-[20px] font-bold mb-3">Blood pressure</p>
      <div className="flex gap-1 mb-3 p-1 rounded-full" style={{ background: C.chip }}>
        {["Day", "Week", "Month"].map((t) => (
          <span key={t} className="flex-1 text-center rounded-full py-1 font-semibold" style={t === "Week" ? { background: C.card } : { color: C.muted }}>{t}</span>
        ))}
      </div>
      <Card className="mb-3">
        <p style={{ color: C.muted }}>Latest, today 7:40 am</p>
        <p className="text-[24px] font-bold">124/80 <span className="text-[10px] font-semibold" style={{ color: C.muted }}>mmHg</span></p>
        <svg viewBox="0 0 260 110" className="w-full h-[96px] mt-1">
          <path d={path(sys)} fill="none" stroke={C.green} strokeWidth="2.5" />
          <path d={path(dia)} fill="none" stroke={C.water} strokeWidth="2.5" />
          {sys.map((v, i) => <circle key={`s${i}`} cx={i * 40 + 10} cy={y(v)} r="3" fill={C.green} />)}
          {dia.map((v, i) => <circle key={`d${i}`} cx={i * 40 + 10} cy={y(v)} r="3" fill={C.water} />)}
        </svg>
        <div className="flex justify-between" style={{ color: C.muted, fontSize: 8.5 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
      </Card>
      <Card className="flex items-center gap-2">
        <Bell size={14} style={{ color: C.green }} />
        <span className="font-semibold">Reminder: 7:30 am and 8:00 pm</span>
      </Card>
    </Screen>
  );
}

export function ResultsScreen() {
  const rows = [
    { name: "HbA1c", val: "6.1 %", range: "Below 5.7 %", status: "A little high", color: C.amber },
    { name: "Fasting blood sugar", val: "5.4 mmol/L", range: "3.9 to 5.5", status: "In range", color: C.food },
    { name: "Creatinine", val: "82 µmol/L", range: "62 to 106", status: "In range", color: C.food },
    { name: "LDL cholesterol", val: "2.9 mmol/L", range: "Below 3.0", status: "In range", color: C.food },
  ];
  return (
    <Screen>
      <p className="text-[20px] font-bold mb-1">My Health</p>
      <p className="mb-3 flex items-center gap-1 font-semibold" style={{ color: C.green }}>
        <Check size={12} strokeWidth={3} /> Read by a clinician
      </p>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <Card key={r.name} className="!py-2.5">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold">{r.name}</span>
              <span className="font-bold">{r.val}</span>
            </div>
            <div className="flex justify-between mt-0.5" style={{ fontSize: 9 }}>
              <span style={{ color: C.muted }}>Range: {r.range}</span>
              <span className="font-semibold" style={{ color: r.color }}>{r.status}</span>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-3" style={{ color: C.muted, fontSize: 9.5 }}>
        What HbA1c measures, what helps, and how it moved since your last test.
      </p>
    </Screen>
  );
}

export function MedicinesScreen() {
  const doses = [
    { time: "8:00 am", name: "Metformin 500 mg", state: "Taken" },
    { time: "8:00 am", name: "Amlodipine 5 mg", state: "Taken" },
    { time: "8:00 pm", name: "Metformin 500 mg", state: "Due" },
  ];
  return (
    <Screen>
      <p className="text-[20px] font-bold mb-3">Medicines</p>
      <p className="font-semibold mb-1.5">Today</p>
      <div className="flex flex-col gap-1.5">
        {doses.map((d, i) => (
          <Card key={i} className="flex justify-between items-center">
            <div>
              <p style={{ color: C.muted, fontSize: 9 }}>{d.time}</p>
              <p className="font-semibold">{d.name}</p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 font-semibold"
              style={d.state === "Taken" ? { background: "#E3EFE9", color: C.green } : { background: C.green, color: "#fff" }}
            >
              {d.state === "Taken" ? "Taken" : "Take now"}
            </span>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

