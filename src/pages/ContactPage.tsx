import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import {
  Mail,
  ShieldCheck,
  Send,
  MessageSquare,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  Lock,
  Globe,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';

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
    <div className="max-w-5xl space-y-12 pb-20">
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
      <PageHeader
        eyebrow={<>Entity Verification &amp; Editorial Desk</>}
        icon={<ShieldCheck className="w-4 h-4" />}
        title={<>Contact NextVector <span className="text-zinc-400">— Editorial &amp; Research Desk</span></>}
        description="Direct communication channels for AI labs, computer science researchers, journalists, and readers. All tips and benchmark audits are verified against primary sources."
      />

      {/* Grid: Contact Information & Communication Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Inboxes & Entity Grounding */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl space-y-6">
            <h2 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Direct Communication Desks</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="eyebrow block">
                  Editorial &amp; Lead Inquiries
                </span>
                <a
                  href="mailto:editor@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-emerald-400 transition-colors mt-0.5 block pointer-coarse:leading-10 break-all"
                >
                  editor@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-2xs mt-1 block">
                  Lead stories, breaking AI disclosures, and executive interviews.
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="eyebrow block">
                  Benchmark &amp; Model Auditing
                </span>
                <a
                  href="mailto:benchmarks@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-emerald-400 transition-colors mt-0.5 block pointer-coarse:leading-10 break-all"
                >
                  benchmarks@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-2xs mt-1 block">
                  Corrections to model, price or benchmark data (please include the source link).
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="eyebrow block">
                  Corrections &amp; Factual Disputes
                </span>
                <a
                  href="mailto:corrections@nextvector.rhasan.online"
                  className="text-sm font-bold text-zinc-100 hover:text-emerald-400 transition-colors mt-0.5 block pointer-coarse:leading-10 break-all"
                >
                  corrections@nextvector.rhasan.online
                </a>
                <span className="text-zinc-400 text-2xs mt-1 block">
                  Rigorously investigated within 4 hours in adherence to §8 Rulebook.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs text-zinc-400">
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
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-3">
            <span className="text-zinc-400 uppercase tracking-wider block text-2xs">Editor-in-Chief</span>
            <div className="flex items-center gap-3">
              <img
                src="https://rhasan.online/avatar.jpg"
                alt="Robiul Hasan"
                className="w-12 h-12 rounded-lg object-cover border border-zinc-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <div className="font-bold text-zinc-100 text-sm">Robiul Hasan</div>
                <div className="text-zinc-400 text-2xs">Systems Architect &amp; Research Editor</div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 text-emerald-400">
              <a
                href="https://rhasan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="tap hover:underline inline-flex items-center gap-1"
              >
                <span>rhasan.online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://github.com/Daddy-Ousen"
                target="_blank"
                rel="noopener noreferrer"
                className="tap hover:underline inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://nextvectorr.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tap text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Substack</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Inquiry Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl relative">
            <h2 className="heading-section mb-2">
              Dispatch an Editorial Inquiry or Research Signal
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Messages are routed directly to NextVector's editorial queue. Response turnaround is typically under 12 hours.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 font-sans">Inquiry Received</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you for submitting to NextVector. Our research desk will verify your information against primary sources.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', category: 'editorial', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 hover:border-emerald-500 transition-colors"
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 block">Your Name / Organization</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Elena Vance / Anthropic"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 block">Email Address (for response)</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. researcher@lab.ai"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 block">Inquiry Type</label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="editorial">Breaking Story / Lead Tip</option>
                      <option value="benchmark">Benchmark Data Audit Submission</option>
                      <option value="model">Foundation Model Registry Update</option>
                      <option value="correction">Editorial Correction / Erratum</option>
                      <option value="press">Press &amp; Media Syndicate</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Brief topic summary"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 block">Message &amp; Primary Source Links</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide technical details, benchmark replication links, arXiv IDs, or disclosure specifics..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-2xs text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Whistleblower &amp; source protection guaranteed
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
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
