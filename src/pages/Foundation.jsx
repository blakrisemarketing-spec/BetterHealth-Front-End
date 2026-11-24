import { useState } from "react";
import Seo from "../components/Seo";
import {
  ArrowRight,
  HandHeart,
  MapPin,
  Stethoscope,
  Sparkles,
  Building2,
  Users,
  Smartphone,
  Truck,
  BookOpen,
  FlaskConical,
} from "lucide-react";
import FoundationNav from "../components/foundation/FoundationNav";
import FoundationFooter from "../components/foundation/FoundationFooter";
import { Reveal, CountUp, Modal } from "../components/foundation/primitives";
import Gallery from "../components/foundation/Gallery";
import {
  VolunteerForm,
  PartnerForm,
  NewsletterForm,
  SupportContent,
  ScreeningRequestForm,
  ScreeningPartnerForm,
} from "../components/foundation/forms";
import heroScreening from "../assets/foundation/hero-screening.webp";
import whatWeDoPhoto from "../assets/foundation/what-we-do.webp";
import getInvolvedPhoto from "../assets/foundation/get-involved.webp";
import proofScreening from "../assets/foundation/proof-screening.webp";


// What the foundation brings to a partner's screening. The partner covers the lab tests.
const PILLARS = [
  {
    icon: Truck,
    title: "Setup and logistics.",
    body: "Equipment, sample collection and the running of the day, planned with you from start to finish.",
  },
  {
    icon: Stethoscope,
    title: "Doctors and nurses.",
    body: "Our clinical team runs the checks and talks each person through what was tested.",
  },
  {
    icon: Smartphone,
    title: "The BetterHealth platform.",
    body: "Each person gets their results on the platform, explained in plain language, with a clear next step.",
  },
  {
    icon: BookOpen,
    title: "Health education.",
    body: "Short talks on the conditions we screen for, so people know what their numbers mean and what to change.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Users,
    title: "Tell us who you want to reach.",
    body: "Your staff, members or community. Together we agree the tests, the numbers and a date, and you cover the lab costs.",
  },
  {
    num: "02",
    icon: MapPin,
    title: "We set up and run the day.",
    body: "We bring the equipment, the doctors and nurses, and a health talk for everyone who attends.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Everyone gets results and a next step.",
    body: "Results arrive on the BetterHealth platform in plain language, with guidance on what to do next.",
  },
];

export default function FoundationPage() {
  const [modal, setModal] = useState(null); // null | 'support' | 'volunteer' | 'partner' | 'screening' | 'screening-partner'
  const openSupport = () => setModal("support");
  const openVolunteer = () => setModal("volunteer");
  const openPartner = () => setModal("partner");
  const openScreening = () => setModal("screening");
  const openScreeningPartner = () => setModal("screening-partner");
  const closeModal = () => setModal(null);

  return (
    <div id="top" className="bg-base min-h-screen overflow-x-hidden font-inter text-text-primary">
      <Seo route="foundation" />
      <FoundationNav onSupport={openSupport} />

      <main>
        {/* ── Hero ── */}
        <section className="pt-[112px] md:pt-[128px] pb-16 md:pb-24 px-6">
          <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-accent-bg border border-accent/30 text-accent-ink text-[12px] font-bold font-heading tracking-wider uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  A BetterHealth Africa Foundation
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-[2.4rem] sm:text-[2.9rem] lg:text-[3.3rem] font-bold font-heading leading-[1.08] text-text-primary mb-6">
                  We're working to give every African{" "}
                  <span className="text-accent-ink">100 healthy years.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-[17px] md:text-[19px] leading-relaxed text-text-secondary max-w-[560px] mb-8 font-inter">
                  We help organisations offer free health screening to the people they care about.
                  You cover the lab tests. We bring the doctors, the logistics, the platform and the
                  health education, so the conditions that quietly steal good years get caught early.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={openScreening}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-7 py-4 text-[16px] font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Host a screening <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={openSupport}
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-btn px-7 py-4 text-[16px] font-bold font-heading transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Support the mission
                  </button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <div className="rounded-card overflow-hidden border border-border shadow-card" style={{ aspectRatio: "4 / 3" }}>
                <img
                  src={heroScreening}
                  alt="A volunteer screens a smiling community member at a BetterHealth Africa Foundation health screening in Ghana."
                  width={1280}
                  height={960}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section id="problem" className="py-20 lg:py-[110px] px-6 bg-section-alt scroll-mt-[80px]">
          <div className="max-w-[760px] mx-auto">
            <Reveal>
              <div className="w-12 h-1 rounded-full bg-accent mb-7" />
              <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight leading-[1.12] mb-8">
                The years that get stolen
              </h2>
            </Reveal>
            <div className="flex flex-col gap-5 text-[17px] md:text-[18px] leading-relaxed text-text-secondary font-inter">
              <Reveal delay={60}>
                <p>
                  In too many families, the story is the same. Someone spends their whole life
                  working, providing, holding everyone together. Then somewhere around 45, their
                  health starts to slip. Not from anything sudden. From something that was building
                  quietly for years, unnoticed, because no one was checking.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p>
                  By the time it shows up, it is already advanced. The savings go to hospital bills.
                  The earning stops. And the years that should have been their most productive become
                  their hardest.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-text-primary font-semibold">
                  Most of this is preventable. The conditions that do the most damage are slow,
                  silent, and easy to catch early if someone is looking. The real problem is that for
                  millions of people, no one ever looks.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── What We Do ── */}
        <section id="what-we-do" className="py-20 lg:py-[110px] px-6 bg-base scroll-mt-[80px]">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
              <div>
                <Reveal>
                  <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight leading-[1.12] mb-6">
                    We look early, so families don't pay later
                  </h2>
                </Reveal>
                <Reveal delay={80}>
                  <p className="text-[17px] md:text-[18px] leading-relaxed text-text-secondary font-inter">
                    The 100 Healthy Years Foundation runs health screenings with organisations that
                    want to look after their people: companies, churches, schools, associations and
                    community groups. The organisation pays for the lab tests and its people are
                    screened free of charge. We handle everything else, and when a result needs
                    attention, we help the person understand their next step before it becomes a crisis.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <div className="rounded-card overflow-hidden border border-border shadow-card" style={{ aspectRatio: "3 / 2" }}>
                  <img
                    src={whatWeDoPhoto}
                    alt="A BetterHealth Africa Foundation volunteer runs a finger-prick screening for an older woman at a community event."
                    width={1120}
                    height={747}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <Reveal>
              <p className="text-[13px] text-accent-ink uppercase tracking-[0.14em] font-semibold mb-5 font-heading">What we bring</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={i * 90}>
                    <div className="bg-white border border-border rounded-card p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-accent/30">
                      <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                        <Icon size={24} className="text-accent-ink" />
                      </div>
                      <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">{p.title}</h3>
                      <p className="text-[15px] text-text-secondary leading-relaxed font-inter">{p.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={120}>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-card bg-accent-bg border border-accent/30 p-6 lg:p-7">
                <div className="w-12 h-12 rounded-card bg-white border border-accent/25 flex items-center justify-center shrink-0">
                  <FlaskConical size={24} className="text-accent-ink" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-text-primary font-heading mb-1">What you bring: the lab tests.</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter">
                    You choose the tests with us, cover the lab costs and invite your people. They pay nothing.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Proof / Traction ── */}
        <section className="py-20 lg:py-[110px] px-6 bg-text-primary">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className="lg:order-1">
              <div className="rounded-card overflow-hidden ring-1 ring-white/15 shadow-card" style={{ aspectRatio: "4 / 5" }}>
                <img
                  src={proofScreening}
                  alt="A BetterHealth Africa Foundation volunteer performs a finger-prick blood test during a community screening."
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <div className="lg:order-2">
              <Reveal>
                <p className="text-[13px] text-accent-light uppercase tracking-[0.14em] font-semibold mb-3 font-heading">Already underway</p>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white font-heading tracking-tight mb-8 leading-[1.12]">
                  Proof, not promises
                </h2>
              </Reveal>
              <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-8">
                <Reveal>
                  <CountUp end={2000} suffix="+" className="block text-[2.4rem] lg:text-[2.8rem] font-bold text-accent-light font-heading leading-none mb-2" />
                  <p className="text-[14px] text-white/70 font-inter">people screened so far</p>
                </Reveal>
                <Reveal delay={90}>
                  <CountUp end={0} className="block text-[2.4rem] lg:text-[2.8rem] font-bold text-accent-light font-heading leading-none mb-2" />
                  <p className="text-[14px] text-white/70 font-inter">cost to the people screened</p>
                </Reveal>
                <Reveal delay={180}>
                  <span className="block text-[2.4rem] lg:text-[2.8rem] font-bold text-accent-light font-heading leading-none mb-2">Doctors</span>
                  <p className="text-[14px] text-white/70 font-inter">and nurses at every screening</p>
                </Reveal>
                <Reveal delay={270}>
                  <CountUp end={1} className="block text-[2.4rem] lg:text-[2.8rem] font-bold text-accent-light font-heading leading-none mb-2" />
                  <p className="text-[14px] text-white/70 font-inter">thing partners pay for: the lab tests</p>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <p className="text-[17px] md:text-[18px] text-white/80 leading-relaxed font-inter">
                  We paid for our first 2,000+ screenings ourselves, with a team willing to show up and
                  a belief that prevention should not be a luxury. Now we run screenings with
                  organisations that want the same for their people. They cover the lab tests and we
                  bring the rest.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The Vision ── */}
        <section id="vision" className="py-20 lg:py-[120px] px-6 bg-accent scroll-mt-[80px] relative overflow-hidden">
          <div className="max-w-[820px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[13px] text-text-primary uppercase tracking-[0.14em] font-semibold mb-4 font-heading">Why 100 healthy years</p>
              <p className="text-[1.7rem] md:text-[2.3rem] font-bold text-text-primary font-heading leading-[1.25] tracking-tight">
                Living longer is not the goal. Living well is. Around the world, people are gaining
                years but spending too many of them in poor health. We want to change that. Every
                screening, every early catch, every honest conversation is aimed at one thing: more
                good years. Years where you are working, present, and well. Not just alive, but
                living.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── How a Screening Works ── */}
        <section className="py-20 lg:py-[110px] px-6 bg-base">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <div className="text-center mb-14">
                <p className="text-[13px] text-accent-ink uppercase tracking-[0.14em] font-semibold mb-3 font-heading">How a partner screening works</p>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight">
                  From first call to results
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.num} delay={i * 100}>
                    <div className="bg-white border border-border rounded-card p-7 h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-card bg-primary-bg border border-primary/20 flex items-center justify-center">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <span className="text-[2.4rem] font-bold text-accent/40 font-heading leading-none">{s.num}</span>
                      </div>
                      <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">{s.title}</h3>
                      <p className="text-[15px] text-text-secondary leading-relaxed font-inter">{s.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Bring a screening to your community ── */}
        <section id="request" className="py-20 lg:py-[110px] px-6 bg-section-alt scroll-mt-[80px]">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <div className="text-center mb-12 max-w-[700px] mx-auto">
                <p className="text-[13px] text-accent-ink uppercase tracking-[0.14em] font-semibold mb-3 font-heading">Work with us</p>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight mb-4 leading-[1.12]">
                  Offer free screening to your people
                </h2>
                <p className="text-[16px] md:text-[17px] text-text-secondary leading-relaxed font-inter">
                  Host a screening with us, or bring our platform to a screening you already run.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal>
                <div className="bg-white border border-border rounded-card p-7 lg:p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                    <Building2 size={24} className="text-accent-ink" />
                  </div>
                  <h3 className="text-[20px] font-bold text-text-primary font-heading mb-2">Host a screening</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter mb-6 flex-1">
                    For companies, churches, schools, associations and community groups. You cover the
                    lab tests. We bring the doctors, the logistics, the platform and the health education.
                  </p>
                  <button
                    type="button"
                    onClick={openScreening}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 self-start"
                  >
                    Host a screening <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div className="bg-white border border-border rounded-card p-7 lg:p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                    <Smartphone size={24} className="text-accent-ink" />
                  </div>
                  <h3 className="text-[20px] font-bold text-text-primary font-heading mb-2">Partner on your screening</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter mb-6 flex-1">
                    Already running a screening? We bring our platform so everyone you screen gets their
                    results in plain language, with a path to follow-up.
                  </p>
                  <button
                    type="button"
                    onClick={openScreeningPartner}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 self-start"
                  >
                    Partner on a screening <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section id="gallery" className="py-20 lg:py-[110px] px-6 bg-base scroll-mt-[80px]">
          <div className="max-w-[1180px] mx-auto">
            <Reveal>
              <div className="text-center mb-12 max-w-[640px] mx-auto">
                <p className="text-[13px] text-accent-ink uppercase tracking-[0.14em] font-semibold mb-3 font-heading">From the field</p>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight mb-4">
                  Real moments from our screenings
                </h2>
                <p className="text-[16px] md:text-[17px] text-text-secondary leading-relaxed font-inter">
                  Screening days across Ghana, run by our doctors and nurses. Tap any photo to take a
                  closer look.
                </p>
              </div>
            </Reveal>
            <Gallery />
          </div>
        </section>

        {/* ── Get Involved ── */}
        <section id="get-involved" className="py-20 lg:py-[110px] px-6 bg-section-alt scroll-mt-[80px]">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
              <Reveal>
                <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary font-heading tracking-tight leading-[1.12]">
                  This only works with people behind it
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-card overflow-hidden border border-border shadow-card" style={{ aspectRatio: "3 / 2" }}>
                  <img
                    src={getInvolvedPhoto}
                    alt="Two BetterHealth Africa Foundation volunteers in branded shirts smiling at a community screening day in Ghana."
                    width={1120}
                    height={747}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal>
                <div className="bg-white border border-border rounded-card p-7 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                    <Stethoscope size={24} className="text-accent-ink" />
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary font-heading mb-2">Volunteer</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter mb-6 flex-1">
                    Are you a doctor, nurse, or health worker? Give a few days and change the
                    trajectory of a whole community.
                  </p>
                  <button
                    type="button"
                    onClick={openVolunteer}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Volunteer <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div className="bg-white border border-border rounded-card p-7 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                    <Building2 size={24} className="text-accent-ink" />
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary font-heading mb-2">Partner</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter mb-6 flex-1">
                    Foundations, companies and institutions: sponsor a screening for a community, or
                    help us show what prevention can do at scale.
                  </p>
                  <button
                    type="button"
                    onClick={openPartner}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Partner with us <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="bg-white border border-border rounded-card p-7 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-card bg-accent-bg border border-accent/25 flex items-center justify-center mb-5">
                    <HandHeart size={24} className="text-accent-ink" />
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary font-heading mb-2">Support</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed font-inter mb-6 flex-1">
                    Your support helps us bring doctors, logistics and health education to more screenings.
                  </p>
                  <button
                    type="button"
                    onClick={openSupport}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Donate <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── About band ── */}
        <section className="py-16 lg:py-20 px-6 bg-base">
          <div className="max-w-[760px] mx-auto text-center">
            <Reveal>
              <p className="text-[18px] md:text-[20px] leading-relaxed text-text-secondary font-inter">
                The 100 Healthy Years Foundation is the social mission of the team behind{" "}
                <span className="text-text-primary font-semibold">BetterHealth Africa</span>. We are a
                registered foundation working to make prevention the default, not the privilege.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="py-20 px-6 bg-primary">
          <div className="max-w-[820px] mx-auto text-center">
            <Reveal>
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-bold text-white font-heading tracking-tight mb-3">
                Stay close to the work
              </h2>
              <p className="text-[16px] md:text-[17px] text-white/85 leading-relaxed font-inter mb-8 max-w-[560px] mx-auto">
                Get occasional updates on where we are screening next and what we are learning along
                the way.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex justify-center">
                <NewsletterForm variant="dark" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <FoundationFooter onVolunteer={openVolunteer} onPartner={openPartner} onSupport={openSupport} />

      {/* ── Modals ── */}
      <Modal open={modal === "support"} onClose={closeModal} title="Support the mission">
        <SupportContent onVolunteer={openVolunteer} onPartner={openPartner} />
      </Modal>
      <Modal open={modal === "volunteer"} onClose={closeModal} title="Volunteer with us">
        <VolunteerForm />
      </Modal>
      <Modal open={modal === "partner"} onClose={closeModal} title="Partner with us">
        <PartnerForm />
      </Modal>
      <Modal open={modal === "screening"} onClose={closeModal} title="Host a screening">
        <ScreeningRequestForm />
      </Modal>
      <Modal open={modal === "screening-partner"} onClose={closeModal} title="Partner on a screening">
        <ScreeningPartnerForm />
      </Modal>
    </div>
  );
}
