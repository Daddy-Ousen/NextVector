import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import {
  Mail,
  ShieldCheck,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  Lock,
  Globe,
  ArrowRight
} from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: 'editorial',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setIsSubmitted(true);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://nextvector.rhasan.online/contact#webpage',
        url: 'https://nextvector.rhasan.online/contact',
        name: 'Contact NextVector Editorial & Research Intelligence',
        description: 'Direct editorial contact points, benchmark submissions, press inquiries, and entity verification for NextVector.',
        publisher: {
          '@id': 'https://nextvector.rhasan.online/#organization',
        },
      },
      {
        '@type': ['Organization', 'NewsMediaOrganization'],
        '@id': 'https://nextvector.rhasan.online/#organization',
        name: 'NextVector',
        alternateName: ['NextVector AI', 'NextVector Intelligence'],
        url: 'https://nextvector.rhasan.online',
        logo: 'https://nextvector.rhasan.online/brand/nextvector-logo.jpg',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'editorial',
            email: 'editor@nextvector.rhasan.online',
            url: 'https://nextvector.rhasan.online/contact',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'technical support',
            email: 'benchmarks@nextvector.rhasan.online',
            url: 'https://nextvector.rhasan.online/contact',
            availableLanguage: ['English'],
          },
        ],
        sameAs: [
          'https://github.com/Daddy-Ousen',
          'https://nextvectorr.substack.com',
          'https://rhasan.online',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4 sm:px-6">
      <SEOHead
        title="Contact NextVector Editorial & Research Intelligence | Entity Verification"
        description="Direct contact channels for NextVector. Submit AI model benchmark disclosures, editorial corrections, research inquiries, or reach Founder & Editor Robiul Hasan."
        canonicalPath="/contact"
        schemaData={contactSchema}
        tags={[
          'Contact NextVector',
          'NextVector Editorial',
          'Robiul Hasan Contact',
          'AI Benchmark Submission',
          'NextVector Media Inquiries',
        ]}
      />

      {/* Primary Entity Header H1 */}
      <header className="border-b border-zinc-800/80 pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Entity Verification &amp; Editorial Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-100 font-sans tracking-tight leading-tight">
              Contact NextVector <span className="text-zinc-600 font-light">—</span>{' '}
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Editorial &amp; Research Desk
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md leading-relaxed border-l-2 border-emerald-500/50 pl-3">
            Direct communication channels for AI labs, computer science researchers, journalists, and readers. All tips and benchmark audits are verified against primary sources.
          </p>
        </div>
      </header>

      {/* Grid: Contact Information & Communication Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Inboxes & Entity Grounding */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl space-y-6">
            <h2 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Direct Communication Desks</span>
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-emerald-400 font-semibold uppercase block text-[11px]">
                  Editorial &amp; Lead Inquiries
                </span>
                <a
                  href="mailto:editor@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-emerald-400 transition-colors mt-0.5 block"
                >
                  editor@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-[11px] mt-1 block">
                  Lead stories, breaking AI disclosures, and executive interviews.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-cyan-400 font-semibold uppercase block text-[11px]">
                  Benchmark &amp; Model Auditing
                </span>
                <a
                  href="mailto:benchmarks@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-cyan-400 transition-colors mt-0.5 block"
                >
                  benchmarks@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-[11px] mt-1 block">
                  LMSYS Arena updates, SWE-bench telemetry, OSWorld submissions.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-purple-400 font-semibold uppercase block text-[11px]">
                  Corrections &amp; Factual Disputes
                </span>
                <a
                  href="mailto:corrections@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-purple-400 transition-colors mt-0.5 block"
                >
                  corrections@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-[11px] mt-1 block">
                  Rigorously investigated within 4 hours in adherence to §8 Rulebook.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Operating Hub: San Francisco, CA &amp; Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PGP Encrypted Submissions Available on Request</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Independent Digital Publisher • ISSN Registered Entity</span>
              </div>
            </div>
          </div>

          {/* Founder Verification Box */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider block text-[11px]">Editor-in-Chief</span>
            <div className="flex items-center gap-3">
              <img
                src="https://rhasan.online/avatar.jpg"
                alt="Robiul Hasan"
                className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <div className="font-bold text-zinc-100 text-sm">Robiul Hasan</div>
                <div className="text-zinc-400 text-[11px]">Systems Architect &amp; Research Editor</div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 text-emerald-400">
              <a
                href="https://rhasan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>rhasan.online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://github.com/Daddy-Ousen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://nextvectorr.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6719] hover:underline inline-flex items-center gap-1"
              >
                <span>Substack</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Inquiry Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative">
            <h2 className="text-xl font-bold text-zinc-100 font-sans tracking-tight mb-2">
              Dispatch an Editorial Inquiry or Research Signal
            </h2>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Messages are routed directly to NextVector's editorial queue. Response turnaround is typically under 12 hours.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 font-sans">Inquiry Received</h3>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                  Thank you for submitting to NextVector. Our research desk will verify your information against primary sources.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', category: 'editorial', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 hover:border-emerald-500 transition-colors"
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 block">Your Name / Organization</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Elena Vance / Anthropic"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 block">Email Address (for response)</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. researcher@lab.ai"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 block">Inquiry Type</label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    >
                      <option value="editorial">Breaking Story / Lead Tip</option>
                      <option value="benchmark">Benchmark Data Audit Submission</option>
                      <option value="model">Foundation Model Registry Update</option>
                      <option value="correction">Editorial Correction / Erratum</option>
                      <option value="press">Press &amp; Media Syndicate</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Brief topic summary"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300 block">Message &amp; Primary Source Links</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide technical details, benchmark replication links, arXiv IDs, or disclosure specifics..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Whistleblower &amp; source protection guaranteed
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Dispatch to Editorial Desk</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
