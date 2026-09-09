import React, { useState } from 'react';
import { Article } from '../types';
import { SEOHead } from '../components/common/SEOHead';
import {
  ExternalLink,
  Mail,
  ShieldCheck,
  Cpu,
  Server,
  Terminal,
  CheckCircle,
  Briefcase,
  Award,
  GraduationCap,
  Bot,
  Copy,
  Check,
  Radio,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Download,
} from 'lucide-react';
import { NextVectorLogo } from '../components/common/NextVectorLogo';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface AuthorPageProps {
  articles: Article[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const AuthorPage: React.FC<AuthorPageProps> = ({
  onNavigate,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rhasan229@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Robiul Hasan',
      jobTitle: 'Founder & Editor-in-Chief',
      description: 'Systems engineer, cybersecurity analyst, and technology researcher specializing in enterprise infrastructure and autonomous AI systems.',
      url: 'https://rhasan.online',
      sameAs: [
        'https://rhasan.online',
        'https://github.com/Daddy-Ousen',
        'https://linkedin.com/in/robiul-hasan-401296137',
      ],
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: 'NextVector',
        url: 'https://nextvector.rhasan.online',
      },
    },
  };

  return (
    <div className="space-y-16 pb-24 max-w-5xl mx-auto">
      <SEOHead
        title="Robiul Hasan — Founder, Systems Engineer & Editor-in-Chief | NextVector"
        description="Systems engineer, IT infrastructure lead, and founder of NextVector. Editorial charter: Less noise. More signal. Verified benchmarks over marketing hype."
        canonicalPath="/about"
        ogType="profile"
        schemaData={authorSchema}
      />

      {/* 1. Hero Dossier Card */}
      <section className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar Photo & Verification Badge */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-zinc-800 to-zinc-900 p-1 border border-zinc-700/80 shadow-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/images/author-robiul-hasan.jpg"
                alt="Robiul Hasan"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-zinc-950 p-1.5 rounded-xl shadow-lg border-2 border-zinc-950" title="Verified Editorial Lead & Systems Specialist">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Core Profile Narrative */}
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Founder & Editor-in-Chief</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
                Dhaka (UTC+6)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Enterprise MSP & Agentic AI</span>
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 font-sans tracking-tight">
                Robiul Hasan
              </h1>
              <p className="text-sm md:text-base text-zinc-300 font-sans mt-3 leading-relaxed">
                IT infrastructure specialist, service desk co-leader, and founder of <strong className="text-emerald-400 font-semibold">NextVector</strong>. With over 5 years of frontline enterprise MSP experience administering multi-tenant Microsoft 365, Azure cloud environments, and disaster-recovery systems across 2,500+ endpoints, Robiul combines practical infrastructure discipline with empirical AI capability audits.
              </p>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://rhasan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
                title="Visit Official Website"
              >
                <span>rhasan.online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://nextvectorr.substack.com/?r=92ang8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-[#FF6719]/15 hover:bg-[#FF6719]/25 border border-[#FF6719]/40 text-[#FF6719] text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                title="NextVector on Substack"
              >
                <span>Substack</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://github.com/Daddy-Ousen"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono transition-colors flex items-center gap-2"
                title="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Daddy-Ousen</span>
              </a>

              <a
                href="https://linkedin.com/in/robiul-hasan-401296137"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 text-xs font-mono transition-colors flex items-center gap-2"
                title="LinkedIn Profile"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors flex items-center gap-2"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Email!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>rhasan229@gmail.com</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Enterprise Scale & Operations Telemetry */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <Server className="w-4 h-4" />
          <span>Operational Scale & Enterprise Footprint</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-2xl md:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              2,500+
            </div>
            <div className="text-xs font-semibold text-zinc-200 mt-1 font-sans">
              Endpoints Monitored
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
              Managed monthly maintenance & RMM telemetry across diverse enterprise environments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-2xl md:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight">
              1,100+
            </div>
            <div className="text-xs font-semibold text-zinc-200 mt-1 font-sans">
              Security Assets
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
              Active endpoint security, EDR, and antivirus administration across client fleets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-2xl md:text-4xl font-extrabold text-purple-400 font-mono tracking-tight">
              25+
            </div>
            <div className="text-xs font-semibold text-zinc-200 mt-1 font-sans">
              IT Projects Delivered
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
              Led technical delivery and architecture coordination for major client migrations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="text-2xl md:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              &gt;90%
            </div>
            <div className="text-xs font-semibold text-zinc-200 mt-1 font-sans">
              Client Satisfaction
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
              Sustained CSAT rating while handling complex multi-account escalations.
            </p>
          </div>
        </div>
      </section>

      {/* 3. NextVector Editorial Manifesto & Signal Purity Protocol */}
      <section className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-10 space-y-8 relative overflow-hidden">
        <div className="border-b border-zinc-800/80 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Editorial Charter & Philosophy</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
              Why NextVector Was Created: Less Noise. More Signal.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Explore Live Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-zinc-100 font-sans">
              Empirical Ground Truth
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              NextVector refuses to reprint synthetic marketing benchmarks or vendor press kits. We evaluate models based on direct coordinate vision testing (OSWorld), multi-step web agent execution (WebArena), and verified software engineering datasets (SWE-bench).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-zinc-100 font-sans">
              The Three Core Questions
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Every single report published on this platform is structured around three non-negotiable questions: <em>What happened? Why does it matter to systems architecture? And what could happen next?</em>{' '}No fluff, no sponsored filler.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-purple-400 text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-zinc-100 font-sans">
              Signal Purity Formula (1–100)
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Each article is assigned a rigorous 1–100 Signal Purity rating based on methodological reproducibility (40%), true architectural significance (35%), and zero-hype subtraction (25%), giving enterprise leaders instant clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Professional Work History */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <Briefcase className="w-4 h-4" />
          <span>Professional Experience & Systems Leadership</span>
        </div>

        <div className="space-y-4">
          {/* Role 1: Techants */}
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-sans flex items-center gap-2">
                  <span>L2 Support Engineer & Service Desk Co-Leader</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Current
                  </span>
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  Techants Solutions Pty Ltd (Managed Service Provider) • Dhaka, Bangladesh
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 shrink-0 self-start md:self-auto">
                Oct 2022 – Present
              </div>
            </div>

            <ul className="space-y-2.5 text-xs md:text-sm text-zinc-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  <strong>Project Delivery & Coordination:</strong> Led technical delivery and coordination for 25+ enterprise IT projects across diverse client accounts, collaborating on 5+ additional large-scale cloud and endpoint rollouts.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  <strong>Infrastructure Fleet Management:</strong> Oversee monthly maintenance and real-time monitoring across 2,500+ endpoints; administer antivirus and endpoint security for 1,100+ critical devices.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  <strong>Service Desk Co-Leadership:</strong> Co-lead a 10+ member Service Desk team, evaluating escalation pathways, mentoring L1 engineers, and creating structured SOP runbooks for new system rollouts.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  <strong>BCDR & Compliance:</strong> Own quarterly Backup & Disaster Recovery (BCDR) reporting, deploying backup agents across client endpoints while sustaining strict SDO compliance.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  <strong>Customer Satisfaction:</strong> Maintained customer satisfaction above 90% while managing high-priority technical escalations across multiple concurrent corporate accounts.
                </span>
              </li>
            </ul>
          </div>

          {/* Role 2: Cobait */}
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-sans">
                  Jr. Support Engineer
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  Cobait Dhaka • Dhaka, Bangladesh
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 shrink-0 self-start md:self-auto">
                2021 – 2022
              </div>
            </div>

            <ul className="space-y-2.5 text-xs md:text-sm text-zinc-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  Served as primary frontline contact for client support requests, diagnosing complex application-level issues in a fast-paced, high-ticket-volume MSP environment.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  Administered managed client server infrastructure, configuring Active Directory permissions, DNS configurations, and server data backup procedures.
                </span>
              </li>
            </ul>
          </div>

          {/* Role 3: AQSBD */}
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-sans">
                  Information Technology Executive
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  AQSBD • Dhaka, Bangladesh
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 shrink-0 self-start md:self-auto">
                2020
              </div>
            </div>

            <ul className="space-y-2.5 text-xs md:text-sm text-zinc-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  Spearheaded the digitization of outdated manual tracking systems, implementing standardized infrastructure documentation and incident escalation processes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">
                  Streamlined internal corporate communications and technical support procedures across all departments.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Featured Technical Engineering: Hermes AI Assistant */}
      <section className="rounded-3xl bg-zinc-950 border border-emerald-500/30 p-6 md:p-10 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>Featured Engineering Project</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Feb 2026 – Present
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight">
              Hermes — Self-Hosted Autonomous AI Assistant
            </h3>
          </div>

          <a
            href="https://github.com/Daddy-Ousen"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-2 transition-colors shrink-0"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        <p className="text-sm text-zinc-300 font-sans leading-relaxed">
          Outside enterprise IT infrastructure, Robiul architectures and self-hosts <strong>Hermes</strong>—a private, sovereign agentic AI system engineered to automate personal workflows, query local telemetry, and investigate practical agentic automation boundaries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Multi-Step Tool Calling</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Dynamically evaluates tasks, calls local system functions, inspects logs, and returns structured execution status.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>Browser Automation</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Uses headless browser drivers to manipulate web portals, extract data feeds, and automate administrative tasks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Sandboxed Execution</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Self-hosted on isolated infrastructure with strict egress filtering, manual interrupt switches, and messaging integration.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Technical Competencies Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <Layers className="w-4 h-4" />
          <span>Technical Competencies & Systems Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domain 1: Cloud & Identity */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-100 font-sans">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Cloud & Identity Architecture</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Microsoft 365 Tenant Admin',
                'Microsoft Azure',
                'Entra ID (Azure AD)',
                'Exchange Online & Mailflow',
                'Microsoft Intune MDM/MAM',
                'Conditional Access Policies',
                'Zero Trust Endpoint Security',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Domain 2: Infrastructure & BCDR */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-100 font-sans">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Infrastructure & Business Continuity</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Windows Server (2019/2022)',
                'Hyper-V Virtualization',
                'Active Directory & GPO',
                'Datto BCDR Appliances',
                'Datto RMM Automation',
                'DNS, DHCP & Subnetting',
                'Endpoint Patch Management',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Domain 3: Operations & Leadership */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-100 font-sans">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Operations & Reliability Engineering</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Incident & Severity Triage',
                'Service Desk Co-Leadership',
                'L1 Staff Training & Mentorship',
                'SOP & Knowledge Base Authoring',
                'Quarterly BCDR Auditing',
                'Disaster Recovery Deployment',
                'Client Stakeholder Relations',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Domain 4: Automation & AI */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-100 font-sans">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Automation & Agentic AI Systems</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Python Automation Scripting',
                'PowerShell & Bash Systems Ops',
                'Autonomous Agent Workflows',
                'Tool-Calling Architectures',
                'Headless Browser Automation',
                'Self-Hosted LLM Telemetry',
                'Benchmark Reproduction (OSWorld)',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Certifications & Academic Credentials */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <Award className="w-4 h-4" />
          <span>Industry Certifications & Education</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-100 font-sans">
                Microsoft 365 Certified: Endpoint Administrator Associate
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">
                Credential: MD-102
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                Enterprise endpoint deployment, policy compliance, Intune management, and identity protection.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-100 font-sans">
                Microsoft Certified: Modern Desktop Administrator Associate
              </div>
              <div className="text-xs font-mono text-cyan-400 mt-0.5">
                Credential: MD-100
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                Windows client architecture, network configuration, local storage, and security maintenance.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-100 font-sans">
                Python Programming Specialization
              </div>
              <div className="text-xs font-mono text-purple-400 mt-0.5">
                University of Michigan (Coursera)
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                Data structures, API integrations, networked application development, and automated scripting.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-100 font-sans">
                Bachelor of Business Administration (BBA)
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">
                Bangladesh University of Professionals (BUP) • Graduated 2022
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                Rigorous operational management, analytical modeling, and technical project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NextVector Brand Identity & Media Kit */}
      <section className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div className="flex items-center gap-3">
            <NextVectorLogo size={28} withContainer={true} showWordmark={false} />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Identity & Press Kit
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sans tracking-tight mt-0.5">
                NextVector Official Brand Assets
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/brand/nextvector-brand-system.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <span>View Brand Board</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
            <a
              href="/brand/nextvector-mark.svg"
              download="nextvector-mark.svg"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Vector SVG</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-400 font-semibold">Core Metaphor</div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              The symbol fuses the capital <strong className="text-emerald-400 font-mono">N</strong> (Next) with a forward-pointing vector chevron <strong className="text-cyan-400 font-mono">&gt;</strong> and a precision coordinate aperture ring in negative space.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-400 font-semibold">Chromatic Palette</div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                #10B981 Signal Emerald
              </span>
              <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                #06B6D4 Core Cyan
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                #09090B Obsidian
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-400 font-semibold">Substack & Social Media</div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              High-resolution 1024×1024 master icon available for newsletter distribution, mobile app squircle framing, and verified publication badges.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Direct Contact & Communication Footer */}
      <section className="rounded-3xl bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Collaboration</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight">
            Get in Touch with Robiul Hasan
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
            Open to discussions regarding systems administration, cloud infrastructure engineering, autonomous agent architectures, and technical editorial inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="https://rhasan.online"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <span>Visit rhasan.online</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://nextvectorr.substack.com/?r=92ang8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#FF6719]/15 hover:bg-[#FF6719]/25 border border-[#FF6719]/40 text-[#FF6719] font-mono font-bold text-xs transition-colors flex items-center gap-2"
          >
            <span>Read on Substack</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="mailto:rhasan229@gmail.com"
            className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Send Email</span>
          </a>

          <a
            href="https://github.com/Daddy-Ousen"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs transition-colors flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://linkedin.com/in/robiul-hasan-401296137"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs transition-colors flex items-center gap-2"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </section>
    </div>
  );
};
