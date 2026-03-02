import { useState, useEffect, useCallback, useRef } from "react";
import {
  Syringe, CalendarDays, Star, Brain, Home, Activity, Settings, Baby,
  ChevronDown, ChevronUp, CheckCircle2, Circle, Clock, BookOpen,
  Heart, Eye, Ear, Hand, RotateCcw, Armchair, Footprints, Sparkles,
  Gamepad2, Lightbulb, Search, Trash2, Smartphone, Info, TrendingUp,
  Shield, Moon, Utensils, Briefcase, AlertTriangle, ChevronRight,
  Car, Bath, Milk, BedDouble, Users, Dumbbell, Apple, Smile
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart,
  Pie, Cell, RadialBarChart, RadialBar
} from "recharts";

import { VACCINATIONS } from "../data/vaccinations";
import { PHYSICAL_DEV } from "../data/physicalDev";
import { MENTAL_DEV } from "../data/mentalDev";
import { GUIDE_CATEGORIES } from "../data/guideCategories";
import { createDashboard, getDashboard, updateDashboard, deleteDashboard } from "../api";

function RiseLogo({ height = 32, className = "" }) {
  return (
    <svg viewBox="0 0 280 72" height={height} className={className} style={{ height, width: "auto" }}>
      <g fill="#1e3a5f">
        <path d="M0 8h30c12 0 20 6 20 18s-6 16-14 18l16 20h-16L22 44H14v20H0V8zm14 12v14h14c5 0 8-3 8-7s-3-7-8-7H14z"/>
        <rect x="62" y="8" width="14" height="56"/>
        <path d="M92 52c4 4 12 8 22 8 8 0 12-3 12-7 0-5-6-6-16-8-14-3-24-7-24-20 0-12 10-20 26-20 12 0 20 4 26 9l-10 10c-4-4-10-7-17-7-7 0-11 3-11 7 0 4 5 6 14 8 14 3 26 6 26 20 0 13-10 21-28 21-14 0-24-5-30-12l10-9z"/>
        <path d="M150 8h48v12h-34v10h30v12h-30v10h34v12h-48V8z"/>
      </g>
    </svg>
  );
}

const AGE_RANGES = ["0-3", "3-6", "6-9", "9-12"];
const AGE_COLORS = {
  "0-3": { bg: "bg-amber-100", text: "text-amber-700" },
  "3-6": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "6-9": { bg: "bg-blue-100", text: "text-blue-700" },
  "9-12": { bg: "bg-purple-100", text: "text-purple-700" }
};

function getCatIcon(iconName, size = 18) {
  const props = { size, strokeWidth: 2.2 };
  const map = {
    brain: <Brain {...props} />, rotate: <RotateCcw {...props} />, armchair: <Armchair {...props} />,
    footprints: <Footprints {...props} />, hand: <Hand {...props} />, eye: <Eye {...props} />,
    ear: <Ear {...props} />, heart: <Heart {...props} />, baby: <Baby {...props} />,
    search: <Search {...props} />, gamepad: <Gamepad2 {...props} />, lightbulb: <Lightbulb {...props} />
  };
  return map[iconName] || <Star {...props} />;
}

function getAgeBandStatus(totalMonths) {
  if (totalMonths == null) return { current: null, overdue: [] };
  const bands = ["0-3", "3-6", "6-9", "9-12"];
  const limits = [3, 6, 9, 12];
  let current = null;
  const overdue = [];
  for (let i = 0; i < bands.length; i++) {
    const lo = i === 0 ? 0 : limits[i - 1];
    const hi = limits[i];
    if (totalMonths >= lo && totalMonths < hi) current = bands[i];
    else if (totalMonths >= hi) overdue.push(bands[i]);
  }
  return { current, overdue };
}

const EMPTY_STATE = { babyName: "", babyDob: "", isPregnant: false, vaccCompleted: {}, milestonesDone: {} };

function GuideArticle({ article }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  return (
    <div className={`rounded-2xl border-2 transition-all overflow-hidden ${open ? "border-amber-200 shadow-md" : "border-transparent bg-white shadow-sm hover:shadow-md hover:border-amber-100"}`}>
      <button onClick={() => setOpen(p => !p)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${article.badgeColor}`}>{article.badge}</span>
          <h4 className="text-sm font-bold text-blue-900 mt-1">{article.title}</h4>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{article.summary}</p>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${open ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-400"}`}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-2 border-t border-amber-50 pt-3">
          {article.content.map((s, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden border border-gray-100">
              <button onClick={() => setExpanded(p => ({ ...p, [idx]: !p[idx] }))} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-amber-50 transition-colors text-left gap-3">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-black flex-shrink-0">{idx + 1}</span>
                  {s.heading}
                </span>
                <ChevronRight size={14} className={`text-gray-300 flex-shrink-0 transition-transform ${expanded[idx] ? "rotate-90" : ""}`} />
              </button>
              {expanded[idx] && <div className="px-4 py-3 bg-white"><p className="text-xs text-gray-600 leading-relaxed">{s.text}</p></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ParentGuideTab({ isPregnant = false }) {
  const [activeCat, setActiveCat] = useState(isPregnant ? "pregnancy" : GUIDE_CATEGORIES[0].id);
  const cat = GUIDE_CATEGORIES.find(c => c.id === activeCat);
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 rounded-2xl p-6 shadow-sm border border-amber-100 relative overflow-hidden">
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none">&#x1F4D6;</span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-black text-blue-900">Parent Guide</h2>
              <p className="text-xs text-gray-400 font-medium">Evidence-based articles for your baby's first year</p>
            </div>
          </div>
          <RiseLogo height={22} className="opacity-20 hidden sm:block" />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {GUIDE_CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)}
            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl text-center transition-all min-w-[80px] ${activeCat === c.id ? `bg-gradient-to-br ${c.gradient} text-white shadow-lg -translate-y-0.5` : "bg-white text-gray-500 hover:bg-gray-50 shadow-sm"}`}>
            <span className="text-xl">{c.emoji}</span>
            <span className="text-[10px] font-bold leading-tight">{c.label}</span>
          </button>
        ))}
      </div>
      {cat && (
        <div className="space-y-4">
          <div className={`rounded-2xl p-5 bg-gradient-to-br ${cat.gradient} shadow-lg relative overflow-hidden`}>
            <span className="absolute right-4 bottom-0 text-6xl opacity-20 select-none">{cat.emoji}</span>
            <h3 className="text-lg font-black text-white">{cat.label}</h3>
            <p className="text-xs text-white/80 font-medium mt-0.5">{cat.tagline}</p>
          </div>
          <div className="space-y-3">{cat.articles.map(a => <GuideArticle key={a.id} article={a} />)}</div>
          <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-600 font-medium">Content adapted from Singapore's Health Promotion Board. Always consult your doctor for personalised medical advice.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MilestoneTab({ categories, milestonesDone, toggleMilestone, filter, setFilter, openCats, toggleCat, prefix, babyAge }) {
  const { current: currentBand, overdue: overdueBands } = babyAge ? getAgeBandStatus(babyAge.totalMonths) : { current: null, overdue: [] };
  const allDueCount = categories.flatMap(c => c.milestones).filter(m => !milestonesDone[m.id] && (m.age === currentBand || overdueBands.includes(m.age))).length;

  return (
    <div className="space-y-4">
      {babyAge && currentBand && (
        <div className="flex items-start gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-5 py-4">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0"><Star size={16} className="text-white" /></div>
          <div>
            <p className="text-xs font-black text-amber-800">Your baby is in the <span className="bg-amber-200 px-1.5 py-0.5 rounded">{currentBand} months</span> window</p>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">
              {allDueCount > 0 ? `${allDueCount} milestone${allDueCount > 1 ? "s" : ""} are highlighted as due or overdue below.` : "All milestones for your baby's current and past age windows are completed!"}
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Filter:</span>
        {[{ val: "all", label: "All" }, ...AGE_RANGES.map(a => ({ val: a, label: `${a} Months` }))].map(f => {
          const isCurrent = f.val === currentBand;
          const isOverdue = overdueBands.includes(f.val);
          return (
            <button key={f.val} onClick={() => setFilter(f.val)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5
                ${filter === f.val ? "bg-amber-400 text-blue-900 shadow-sm" : isCurrent ? "bg-amber-100 text-amber-700 border border-amber-300" : isOverdue ? "bg-red-50 text-red-500 border border-red-200" : "bg-white text-gray-400 hover:bg-amber-50"}`}>
              {f.label}
              {isCurrent && filter !== f.val && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
              {isOverdue && filter !== f.val && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
            </button>
          );
        })}
        {babyAge && (currentBand || overdueBands.length > 0) && (
          <div className="ml-auto flex items-center gap-3">
            {currentBand && <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600"><span className="w-2.5 h-2.5 rounded bg-amber-400 animate-pulse" />Due Now</span>}
            {overdueBands.length > 0 && <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-500"><span className="w-2.5 h-2.5 rounded bg-red-400" />Overdue</span>}
          </div>
        )}
      </div>
      {categories.map(cat => {
        const key = prefix + cat.category;
        const isOpen = openCats[key];
        const filtered = filter === "all" ? cat.milestones : cat.milestones.filter(m => m.age === filter);
        const catDone = cat.milestones.filter(m => milestonesDone[m.id]).length;
        const catDueCount = cat.milestones.filter(m => !milestonesDone[m.id] && (m.age === currentBand || overdueBands.includes(m.age))).length;
        return (
          <div key={cat.category} className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 transition-colors ${catDueCount > 0 ? "border-amber-200" : "border-transparent hover:border-amber-100"}`}>
            <button onClick={() => toggleCat(key)} className="w-full flex items-center justify-between px-5 py-4 text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` }}>
              <span className="flex items-center gap-2.5">{getCatIcon(cat.icon, 18)}{cat.category}</span>
              <span className="flex items-center gap-3">
                {catDueCount > 0 && <span className="text-[10px] font-black bg-white text-red-500 px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={10} />{catDueCount} due</span>}
                <span className="text-[11px] bg-white/20 px-3 py-0.5 rounded-full">{catDone}/{cat.milestones.length}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            {isOpen && (
              <div className="p-4">
                <div className="hidden sm:grid grid-cols-4 gap-px mb-2">
                  {AGE_RANGES.map(a => {
                    const isCur = a === currentBand, isOvd = overdueBands.includes(a);
                    return (
                      <div key={a} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-t-lg flex items-center gap-1.5 ${isCur ? "bg-amber-50 text-amber-600 border-b-2 border-amber-400" : isOvd ? "bg-red-50 text-red-500 border-b-2 border-red-300" : "text-gray-300"}`}>
                        {a} months
                        {isCur && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                        {isOvd && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-px">
                  {AGE_RANGES.map(age => {
                    const items = filtered.filter(m => m.age === age);
                    const isCurCol = age === currentBand, isOvdCol = overdueBands.includes(age);
                    if (filter !== "all" && filter !== age) return <div key={age} className="hidden sm:block" />;
                    return (
                      <div key={age} className={`space-y-1 rounded-xl ${isCurCol ? "bg-amber-50/50" : isOvdCol ? "bg-red-50/40" : ""}`}>
                        <div className={`sm:hidden text-[10px] font-bold uppercase tracking-wider px-1 pt-2 flex items-center gap-1.5 ${isCurCol ? "text-amber-600" : isOvdCol ? "text-red-500" : AGE_COLORS[age].text}`}>
                          {age} months
                          {isCurCol && <span className="text-[9px] bg-amber-400 text-white px-1.5 py-0.5 rounded-full font-black">Current</span>}
                          {isOvdCol && <span className="text-[9px] bg-red-400 text-white px-1.5 py-0.5 rounded-full font-black">Overdue</span>}
                        </div>
                        {items.map(m => {
                          const done = milestonesDone[m.id];
                          const isDueMilestone = !done && (m.age === currentBand || overdueBands.includes(m.age));
                          const isOverdueMilestone = !done && overdueBands.includes(m.age);
                          return (
                            <div key={m.id} onClick={() => toggleMilestone(m.id)}
                              className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                                ${done ? "bg-emerald-50 hover:bg-emerald-100" : isOverdueMilestone ? "bg-red-50 hover:bg-red-100 border border-red-100" : isDueMilestone ? "bg-amber-50 hover:bg-amber-100 border border-amber-200" : "hover:bg-gray-50"}`}>
                              {done ? <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                : isOverdueMilestone ? <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                                : isDueMilestone ? <Clock size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                : <Circle size={18} className="text-gray-200 flex-shrink-0 mt-0.5" />}
                              <span className={`text-xs font-medium leading-snug ${done ? "text-emerald-600 line-through" : isOverdueMilestone ? "text-red-600 font-semibold" : isDueMilestone ? "text-amber-700 font-semibold" : "text-gray-500"}`}>{m.text}</span>
                            </div>
                          );
                        })}
                        {items.length === 0 && <div className="px-3 py-4 text-xs text-gray-200 italic">No milestones</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BabyDashboard() {
  const [state, setState] = useState(EMPTY_STATE);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [openCats, setOpenCats] = useState({});
  const [physFilter, setPhysFilter] = useState("all");
  const [mentFilter, setMentFilter] = useState("all");
  const [nameInput, setNameInput] = useState("");
  const [dobInput, setDobInput] = useState("");
  const [hoveredVacc, setHoveredVacc] = useState(null);
  const [dashboardId, setDashboardId] = useState(null);
  const saveTimeout = useRef(null);

  const toDisplay = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return y && m && d ? `${d}/${m}/${y}` : "";
  };
  const toISO = (display) => {
    const digits = display.replace(/[^0-9]/g, "");
    if (digits.length < 8) return "";
    const d = digits.slice(0, 2), m = digits.slice(2, 4), y = digits.slice(4, 8);
    const date = new Date(`${y}-${m}-${d}`);
    if (isNaN(date)) return "";
    return `${y}-${m}-${d}`;
  };

  // Load from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const savedId = localStorage.getItem("dashboardId");
        if (savedId) {
          const data = await getDashboard(savedId);
          const vaccCompleted = data.vaccCompleted instanceof Map
            ? Object.fromEntries(data.vaccCompleted)
            : (data.vaccCompleted || {});
          const milestonesDone = data.milestonesDone instanceof Map
            ? Object.fromEntries(data.milestonesDone)
            : (data.milestonesDone || {});
          const loaded = {
            babyName: data.babyName || "",
            babyDob: data.babyDob || "",
            isPregnant: data.isPregnant || false,
            vaccCompleted,
            milestonesDone,
          };
          setState(loaded);
          setNameInput(loaded.babyName);
          setDobInput(toDisplay(loaded.babyDob));
          setDashboardId(savedId);
        } else {
          const data = await createDashboard(EMPTY_STATE);
          setDashboardId(data._id);
          localStorage.setItem("dashboardId", data._id);
        }
      } catch (e) {
        console.error("Failed to load dashboard:", e);
      }
      setLoaded(true);
    }
    loadData();
  }, []);

  // Save to API on state change (debounced)
  useEffect(() => {
    if (!loaded || !dashboardId) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateDashboard(dashboardId, state).catch((e) =>
        console.error("Failed to save:", e)
      );
    }, 600);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [state, loaded, dashboardId]);

  const toggleVacc = useCallback((id) => {
    setState(prev => ({ ...prev, vaccCompleted: { ...prev.vaccCompleted, [id]: !prev.vaccCompleted[id] } }));
  }, []);

  const toggleMilestone = useCallback((id) => {
    setState(prev => ({ ...prev, milestonesDone: { ...prev.milestonesDone, [id]: !prev.milestonesDone[id] } }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isoDate = toISO(dobInput);
      setState(prev => {
        if (prev.babyName !== nameInput || prev.babyDob !== isoDate) {
          return { ...prev, babyName: nameInput, babyDob: isoDate };
        }
        return prev;
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [nameInput, dobInput]);

  const resetAll = async () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      try {
        if (dashboardId) await deleteDashboard(dashboardId);
        const data = await createDashboard(EMPTY_STATE);
        setDashboardId(data._id);
        localStorage.setItem("dashboardId", data._id);
      } catch (e) {
        console.error("Reset failed:", e);
      }
      setState(EMPTY_STATE);
      setNameInput(""); setDobInput("");
    }
  };

  const togglePregnant = () => {
    setState(prev => ({ ...prev, isPregnant: !prev.isPregnant, babyDob: "", babyName: "" }));
    setNameInput(""); setDobInput("");
  };

  const vaccDone = VACCINATIONS.filter(v => state.vaccCompleted[v.id]).length;
  const vaccTotal = VACCINATIONS.length;
  const allPhys = PHYSICAL_DEV.flatMap(c => c.milestones);
  const allMent = MENTAL_DEV.flatMap(c => c.milestones);
  const physDone = allPhys.filter(m => state.milestonesDone[m.id]).length;
  const mentDone = allMent.filter(m => state.milestonesDone[m.id]).length;

  const babyAge = (() => {
    if (state.isPregnant || !state.babyDob) return null;
    const dob = new Date(state.babyDob);
    const now = new Date();
    if (now < dob) return null;
    const totalDays = Math.floor((now - dob) / 86400000);
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalMonths = years * 12 + months;
    const weeks = Math.floor(days / 7);
    const remDays = days % 7;
    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
    if (weeks > 0) parts.push(`${weeks} wk${weeks > 1 ? "s" : ""}`);
    if (remDays > 0 || parts.length === 0) parts.push(`${remDays} day${remDays !== 1 ? "s" : ""}`);
    return { years, months, days, totalMonths, totalDays, weeks, remDays, text: parts.join(", "), short: totalMonths > 0 ? `${totalMonths}m ${days}d` : `${days}d` };
  })();

  const pregnancyInfo = (() => {
    if (!state.isPregnant || !state.babyDob) return null;
    const edd = new Date(state.babyDob);
    const now = new Date();
    const msRemaining = edd - now;
    const weeksRemaining = Math.max(0, Math.ceil(msRemaining / 604800000));
    const weeksPregnant = Math.min(40, Math.max(0, 40 - weeksRemaining));
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / 86400000));
    return { weeksPregnant, weeksRemaining, daysRemaining, isPast: msRemaining < 0 };
  })();

  const eligibleDate = (ageDays) => {
    if (!state.babyDob) return null;
    const d = new Date(state.babyDob);
    d.setDate(d.getDate() + ageDays);
    return d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
  };

  const nextVacc = VACCINATIONS.find(v => !state.vaccCompleted[v.id]);
  const vaccDueCount = babyAge ? VACCINATIONS.filter(v => !state.vaccCompleted[v.id] && babyAge.totalDays >= v.ageDays).length : 0;
  const { current: currentBand, overdue: overdueBands } = babyAge ? getAgeBandStatus(babyAge.totalMonths) : { current: null, overdue: [] };
  const physDueCount = allPhys.filter(m => !state.milestonesDone[m.id] && (m.age === currentBand || overdueBands.includes(m.age))).length;
  const mentDueCount = allMent.filter(m => !state.milestonesDone[m.id] && (m.age === currentBand || overdueBands.includes(m.age))).length;

  const vaccPieData = [{ name: "Completed", value: vaccDone, fill: "#7BC89C" }, { name: "Remaining", value: vaccTotal - vaccDone, fill: "#E8E8E8" }];
  const catChartData = [...PHYSICAL_DEV, ...MENTAL_DEV].map(c => {
    const done = c.milestones.filter(m => state.milestonesDone[m.id]).length;
    return { name: c.category.length > 12 ? c.category.slice(0, 12) + "\u2026" : c.category, done, total: c.milestones.length, fill: c.color, pct: c.milestones.length > 0 ? Math.round((done / c.milestones.length) * 100) : 0 };
  });
  const upcomingMilestones = [...PHYSICAL_DEV.flatMap(c => c.milestones.map(m => ({ ...m, type: "Physical" }))), ...MENTAL_DEV.flatMap(c => c.milestones.map(m => ({ ...m, type: "Mental" })))].filter(m => !state.milestonesDone[m.id]).slice(0, 8);

  const tabs = [
    { id: "overview", label: "Overview", icon: <Home size={16} /> },
    { id: "vaccination", label: "Vaccination", icon: <Syringe size={16} />, badge: vaccDueCount },
    { id: "physical", label: "Physical", icon: <Activity size={16} />, badge: physDueCount },
    { id: "mental", label: "Mental", icon: <Brain size={16} />, badge: mentDueCount },
    { id: "guide", label: "Guide", icon: <BookOpen size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> }
  ];

  const toggleCat = (key) => setOpenCats(prev => ({ ...prev, [key]: !prev[key] }));
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const d = payload[0].payload;
      return <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100"><p className="font-bold text-sm text-gray-700">{d.name}</p><p className="text-xs text-gray-500">{d.done}/{d.total} ({d.pct}%)</p></div>;
    }
    return null;
  };

  const dobChangeHandler = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    let formatted = digits.slice(0, 2);
    if (digits.length >= 3) formatted += "/" + digits.slice(2, 4);
    if (digits.length >= 5) formatted += "/" + digits.slice(4, 8);
    setDobInput(formatted);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {["\u2B50","\u{1F388}","\u{1F680}","\u{1F984}","\u{1F338}","\u{1F380}","\u{1F9F8}","\u{1F319}"].map((e,i) => (
          <span key={i} className="absolute opacity-10 text-3xl" style={{ top:`${8+i*12}%`, left:i%2===0?`${2+i*3}%`:"auto", right:i%2!==0?`${3+i*2}%`:"auto", animation:`float ${6+i}s ease-in-out infinite ${i*0.5}s` }}>{e}</span>
        ))}
      </div>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(4deg)}}
        @keyframes tooltipIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <header className="relative z-10 bg-gradient-to-r from-orange-50 via-amber-50 to-blue-50 border-b-2 border-amber-100 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RiseLogo height={36} />
            <div className="h-8 w-px bg-amber-200 hidden sm:block" />
            <p className="text-xs text-gray-400 font-semibold leading-tight max-w-[200px]">Home Baby Vaccination & Development Tracker by Salus Medical</p>
          </div>
          <div className="flex items-center gap-5 bg-white px-5 py-3 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center"><Baby size={20} className="text-blue-800" /></div>
            <div><p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Baby</p><p className="text-sm font-bold text-gray-800">{state.babyName || "My Baby"}</p></div>
            <div className="hidden sm:block"><p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{state.isPregnant ? "EDD" : "DOB"}</p><p className="text-sm font-bold text-gray-800">{state.babyDob ? toDisplay(state.babyDob) : "\u2014"}</p></div>
            <div className="hidden sm:block"><p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{state.isPregnant ? "Pregnancy" : "Age"}</p><p className="text-sm font-bold text-gray-800">{state.isPregnant ? (pregnancyInfo ? (pregnancyInfo.isPast ? "Due!" : `${pregnancyInfo.weeksPregnant}w`) : "\u2014") : (babyAge ? babyAge.short : "\u2014")}</p></div>
          </div>
        </div>
      </header>

      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`relative flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all ${activeTab === t.id ? "bg-amber-400 text-blue-900 shadow-lg shadow-amber-200/50 -translate-y-0.5" : "bg-white text-gray-400 hover:bg-amber-50 hover:text-gray-600 shadow-sm"}`}>
              {t.icon}<span className="hidden sm:inline">{t.label}</span>
              {t.badge > 0 && <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-black flex items-center justify-center px-1 text-white ${activeTab === t.id ? "bg-red-500" : "bg-red-400"}`}>{t.badge}</span>}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-16 pt-4">

        {activeTab === "overview" && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 rounded-2xl p-6 shadow-sm border border-amber-100 relative overflow-hidden">
              <span className="absolute -right-4 -bottom-4 text-8xl opacity-5 select-none rotate-12">{state.isPregnant ? "\u{1F930}" : "\u{1F476}"}</span>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${state.isPregnant ? "bg-gradient-to-br from-pink-200 to-purple-200" : "bg-gradient-to-br from-pink-200 to-blue-200"}`}><Baby size={32} className="text-blue-800" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{state.isPregnant ? "Pregnancy Information" : "Baby Information"}</p>
                    <p className="text-xs text-gray-400 font-medium">{state.isPregnant ? "Tracking your pregnancy journey" : "Fill in your baby's details to get started"}</p>
                  </div>
                </div>
                <button onClick={togglePregnant} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all flex-shrink-0 ${state.isPregnant ? "bg-pink-100 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-400 hover:border-pink-200 hover:text-pink-500 hover:bg-pink-50"}`}>
                  <span className="text-base">{"\u{1F930}"}</span>
                  <span className="hidden sm:inline">{state.isPregnant ? "Currently Pregnant \u2713" : "Currently Pregnant"}</span>
                  <span className="sm:hidden">{state.isPregnant ? "Pregnant \u2713" : "Pregnant?"}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {!state.isPregnant && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">Baby's Name</label>
                    <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Enter baby's name" className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-100 bg-white text-sm font-semibold text-gray-800 outline-none focus:border-amber-300 placeholder-gray-300" />
                  </div>
                )}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">{state.isPregnant ? "Expected Due Date" : "Date of Birth"}</label>
                  <input type="text" value={dobInput} onChange={dobChangeHandler} maxLength={10} placeholder="DD/MM/YYYY"
                    className={`w-full px-4 py-2.5 rounded-xl border-2 bg-white text-sm font-semibold text-gray-800 outline-none transition-colors placeholder-gray-300 ${state.isPregnant ? "border-pink-100 focus:border-pink-300" : "border-amber-100 focus:border-amber-300"}`} />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">{state.isPregnant ? "Pregnancy" : "Current Age"}</label>
                  {state.isPregnant ? (
                    pregnancyInfo ? (
                      <div className={`rounded-xl px-4 py-2.5 shadow-md ${pregnancyInfo.isPast ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-pink-400 to-purple-400"}`}>
                        <p className="text-sm font-black text-white">{pregnancyInfo.isPast ? "Baby is due!" : `${pregnancyInfo.weeksPregnant} week${pregnancyInfo.weeksPregnant !== 1 ? "s" : ""} pregnant`}</p>
                      </div>
                    ) : <div className="bg-gray-100 rounded-xl px-4 py-2.5"><p className="text-sm font-semibold text-gray-300">Enter due date to calculate</p></div>
                  ) : babyAge ? (
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl px-4 py-2.5 shadow-md shadow-amber-200/40"><p className="text-sm font-black text-white">{babyAge.text}</p></div>
                  ) : <div className="bg-gray-100 rounded-xl px-4 py-2.5"><p className="text-sm font-semibold text-gray-300">Enter DOB to calculate</p></div>}
                </div>
              </div>
              {state.isPregnant && pregnancyInfo && !pregnancyInfo.isPast && (
                <div className="mt-4 pt-4 border-t border-pink-100/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Weeks Pregnant", value: pregnancyInfo.weeksPregnant, icon: <Heart size={14} className="text-pink-400" />, bg: "bg-pink-50" },
                    { label: "Weeks Remaining", value: pregnancyInfo.weeksRemaining, icon: <Clock size={14} className="text-purple-400" />, bg: "bg-purple-50" },
                    { label: "Days Remaining", value: pregnancyInfo.daysRemaining, icon: <CalendarDays size={14} className="text-blue-400" />, bg: "bg-blue-50" },
                    { label: "Trimester", value: pregnancyInfo.weeksPregnant <= 13 ? "1st" : pregnancyInfo.weeksPregnant <= 26 ? "2nd" : "3rd", icon: <Star size={14} className="text-amber-400" />, bg: "bg-amber-50" }
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl px-3 py-2 flex items-center gap-2.5`}>
                      {item.icon}<div><p className="text-lg font-black text-blue-900 leading-tight">{item.value}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</p></div>
                    </div>
                  ))}
                </div>
              )}
              {!state.isPregnant && babyAge && (
                <div className="mt-4 pt-4 border-t border-amber-100/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Years", value: babyAge.years, icon: <CalendarDays size={14} className="text-amber-500" />, bg: "bg-amber-50" },
                    { label: "Months", value: babyAge.months, icon: <Clock size={14} className="text-blue-500" />, bg: "bg-blue-50" },
                    { label: "Weeks", value: babyAge.weeks, icon: <TrendingUp size={14} className="text-emerald-500" />, bg: "bg-emerald-50" },
                    { label: "Days", value: babyAge.remDays, icon: <Star size={14} className="text-pink-400" />, bg: "bg-pink-50" }
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} rounded-xl px-3 py-2 flex items-center gap-2.5`}>
                      {item.icon}<div><p className="text-lg font-black text-blue-900 leading-tight">{item.value}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <Syringe size={28} className="text-amber-500" />, value: vaccDone, label: "Vaccinations Done", accent: "#F5C842" },
                { icon: <CalendarDays size={28} className="text-blue-500" />, value: vaccTotal, label: "Total Visits", accent: "#5B9BD5" },
                { icon: <Star size={28} className="text-emerald-500" />, value: `${physDone}/${allPhys.length}`, label: "Physical Milestones", accent: "#7BC89C" },
                { icon: <Brain size={28} className="text-pink-400" />, value: `${mentDone}/${allMent.length}`, label: "Mental Milestones", accent: "#F5A0C8" }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10" style={{ background: s.accent }} />
                  <div className="mb-2">{s.icon}</div>
                  <p className="text-2xl sm:text-3xl font-black text-blue-900">{s.value}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-amber-50 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <span className="absolute right-4 bottom-2 text-6xl opacity-10 select-none">{"\u{1F9F8}"}</span>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-blue-800 font-bold flex items-center gap-1.5"><Clock size={12} /> Next Appointment</p>
                  <RiseLogo height={18} className="opacity-30" />
                </div>
                <h3 className="text-xl font-black text-blue-900">{nextVacc ? nextVacc.name : "All done!"}</h3>
                <p className="text-sm text-gray-500 font-medium mt-1">{nextVacc ? (state.babyDob && !state.isPregnant ? `Eligible from ${eligibleDate(nextVacc.ageDays)}` : "Set DOB to see eligible dates") : "All scheduled vaccinations completed"}</p>
                <button onClick={() => alert("Scan the QR code on your Salus Medical flyer to book!")} className="mt-4 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-800 transition-all hover:-translate-y-0.5 shadow-md">
                  <Smartphone size={14} /> Book Now
                </button>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2"><TrendingUp size={16} /> Vaccination Progress</p>
                <div className="flex justify-center">
                  <RadialBarChart width={180} height={180} cx={90} cy={90} innerRadius={55} outerRadius={80} barSize={16} data={[{ value: vaccTotal > 0 ? Math.round((vaccDone / vaccTotal) * 100) : 0, fill: "#7BC89C" }]} startAngle={90} endAngle={-270}>
                    <RadialBar background={{ fill: "#f0f0f0" }} dataKey="value" cornerRadius={10} />
                    <text x={90} y={85} textAnchor="middle" style={{ fontSize: 28, fontWeight: 900, fill: "#1e3a5f" }}>{vaccTotal > 0 ? Math.round((vaccDone / vaccTotal) * 100) : 0}%</text>
                    <text x={90} y={105} textAnchor="middle" style={{ fontSize: 11, fill: "#999", fontWeight: 600 }}>complete</text>
                  </RadialBarChart>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-4"><Sparkles size={16} /> Milestone Progress by Category</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={catChartData} margin={{ top: 5, right: 5, bottom: 40, left: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#aaa", fontWeight: 600 }} angle={-45} textAnchor="end" interval={0} height={60} />
                    <YAxis tick={{ fontSize: 10, fill: "#ccc" }} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="pct" radius={[6, 6, 0, 0]} maxBarSize={28}>
                      {catChartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-4"><Clock size={16} /> Upcoming Milestones</p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {upcomingMilestones.length === 0 && <p className="text-center text-gray-300 font-semibold py-8">All milestones achieved!</p>}
                  {upcomingMilestones.map(m => (
                    <div key={m.id} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-gray-50">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${AGE_COLORS[m.age].bg} ${AGE_COLORS[m.age].text}`}>{m.age}m</span>
                      <span className="text-xs text-gray-500 font-medium flex-1">{m.text}</span>
                      <span className="text-[9px] font-bold text-gray-300 uppercase">{m.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ParentGuideTab isPregnant={state.isPregnant} />
          </div>
        )}

        {activeTab === "vaccination" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2"><Syringe size={16} /> Vaccination Timeline</p>
                <RiseLogo height={18} className="opacity-20" />
              </div>
              <p className="text-xs text-gray-400 font-medium mb-5">$0 for Singaporean &mdash; conducted by doctors & nurses with extensive paediatric experience</p>
              <div className="relative pl-10">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-blue-300 to-emerald-300 rounded-full" />
                <div className="space-y-4">
                  {VACCINATIONS.map((v, i) => {
                    const done = state.vaccCompleted[v.id];
                    const isDue = !done && babyAge && babyAge.totalDays >= v.ageDays;
                    const isNext = !done && !isDue && (!babyAge ? i === vaccDone : babyAge.totalDays < v.ageDays);
                    return (
                      <div key={v.id} className="relative" onMouseEnter={() => setHoveredVacc(v.id)} onMouseLeave={() => setHoveredVacc(null)}>
                        {isDue && <span className="absolute -left-[26px] top-5 w-4 h-4 rounded-full bg-red-400 opacity-40 animate-ping z-10" />}
                        <div className={`absolute -left-[26px] top-5 w-4 h-4 rounded-full border-2 border-white shadow z-10 ${done ? "bg-emerald-400" : isDue ? "bg-red-400" : isNext ? "bg-amber-400" : "bg-gray-300"}`} />
                        <div onClick={() => toggleVacc(v.id)} className={`rounded-xl p-4 pl-5 cursor-pointer transition-all hover:translate-x-1 ${done ? "bg-emerald-50 border border-emerald-100" : isDue ? "bg-red-50 border-2 border-red-300" : isNext ? "bg-amber-50 border border-amber-200" : "bg-gray-50 border border-gray-100"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {done ? <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" /> : isDue ? <AlertTriangle size={18} className="text-red-400 flex-shrink-0" /> : isNext ? <Clock size={18} className="text-amber-400 flex-shrink-0" /> : <Circle size={18} className="text-gray-300 flex-shrink-0" />}
                              <span className={`font-bold text-sm truncate ${isDue ? "text-red-700" : "text-blue-900"}`}>{v.name}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white flex-shrink-0 ml-2 ${done ? "bg-emerald-400" : isDue ? "bg-red-400" : isNext ? "bg-amber-400" : "bg-gray-300"}`}>Day {v.ageDays}</span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium ml-7">{v.detail}</p>
                          {state.babyDob && !state.isPregnant && <p className="text-xs text-gray-400 mt-1 italic ml-7">Eligible from: {eligibleDate(v.ageDays)}</p>}
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold mt-2 ml-7 px-2 py-0.5 rounded-lg ${done ? "bg-emerald-100 text-emerald-600" : isDue ? "bg-red-100 text-red-600" : isNext ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400"}`}>
                            {done ? "\u2713 Completed" : isDue ? "\u26A0 Due Now \u2014 Book Today!" : isNext ? "Up Next" : "Upcoming"}
                          </span>
                        </div>
                        {hoveredVacc === v.id && (
                          <div className="absolute z-30 left-4 right-4 sm:left-auto sm:w-80 top-full mt-2 bg-white rounded-xl shadow-xl border border-amber-100 p-4" style={{ animation: "tooltipIn 0.2s ease" }}>
                            <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-amber-100 rotate-45" />
                            <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-2 flex items-center gap-1.5"><Info size={11} /> Protects Against</p>
                            <div className="space-y-1.5">
                              {v.diseases.map((d, di) => (
                                <div key={di} className="flex items-start gap-2">
                                  <span className="mt-0.5 w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0"><Syringe size={10} className="text-blue-400" /></span>
                                  <div><span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded">{d.abbr}</span><p className="text-xs text-gray-500 mt-0.5">{d.name}</p></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-4"><TrendingUp size={16} /> Completion Status</p>
                <div className="flex justify-center">
                  <PieChart width={180} height={180}>
                    <Pie data={vaccPieData} cx={90} cy={90} innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {vaccPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <text x={90} y={85} textAnchor="middle" style={{ fontSize: 24, fontWeight: 900, fill: "#1e3a5f" }}>{vaccDone}/{vaccTotal}</text>
                    <text x={90} y={105} textAnchor="middle" style={{ fontSize: 11, fill: "#999", fontWeight: 600 }}>visits</text>
                  </PieChart>
                </div>
                <div className="flex justify-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-2 text-xs font-semibold text-gray-500"><span className="w-3 h-3 rounded bg-emerald-400" />Completed</span>
                  {babyAge && vaccDueCount > 0 && <span className="flex items-center gap-2 text-xs font-semibold text-red-500"><span className="w-3 h-3 rounded bg-red-400" />Due Now</span>}
                  <span className="flex items-center gap-2 text-xs font-semibold text-gray-500"><span className="w-3 h-3 rounded bg-gray-200" />Upcoming</span>
                </div>
                {babyAge && vaccDueCount > 0 && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
                    <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-red-600">{vaccDueCount} vaccination{vaccDueCount > 1 ? "s" : ""} due now!</p>
                      <p className="text-[11px] text-red-400 font-medium mt-0.5">Your baby has reached the eligible age. Please book an appointment.</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <RiseLogo height={22} />
                  <span className="text-[10px] text-gray-300 font-bold">&times;</span>
                  <p className="text-sm font-bold text-blue-900 flex items-center gap-2"><Info size={16} /> About Home Vaccination</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Salus Medical provides <strong>home baby vaccination</strong> at no cost for Singaporeans. A qualified doctor and nurse will visit your home to administer scheduled vaccinations, making it convenient and stress-free.</p>
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs font-semibold text-amber-700 flex items-start gap-2">
                  <Sparkles size={14} className="flex-shrink-0 mt-0.5" /> Reserve your child's next appointment early as slots fill fast!
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "physical" && <MilestoneTab categories={PHYSICAL_DEV} milestonesDone={state.milestonesDone} toggleMilestone={toggleMilestone} filter={physFilter} setFilter={setPhysFilter} openCats={openCats} toggleCat={toggleCat} prefix="phys" babyAge={babyAge} />}
        {activeTab === "mental" && <MilestoneTab categories={MENTAL_DEV} milestonesDone={state.milestonesDone} toggleMilestone={toggleMilestone} filter={mentFilter} setFilter={setMentFilter} openCats={openCats} toggleCat={toggleCat} prefix="ment" babyAge={babyAge} />}
        {activeTab === "guide" && <ParentGuideTab isPregnant={state.isPregnant} />}

        {activeTab === "settings" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3"><Settings size={16} /> Data Management</p>
              <p className="text-xs text-gray-400 font-medium leading-relaxed mb-2">Your data is saved automatically to the cloud. Baby information can be edited on the Overview tab.</p>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs font-semibold text-emerald-600 flex items-start gap-2 mb-5">
                <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" /> All changes are saved automatically as you type or click.
              </div>
              <button onClick={resetAll} className="bg-red-50 text-red-400 border border-red-100 px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-100 hover:text-red-500 transition-all w-full justify-center">
                <Trash2 size={16} /> Reset All Progress
              </button>
            </div>
            <div className="mt-5 flex flex-col items-center gap-2 py-4">
              <RiseLogo height={24} className="opacity-30" />
              <p className="text-[10px] text-gray-300 font-semibold">Home Baby Vaccination & Development Tracker by Salus Medical</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
