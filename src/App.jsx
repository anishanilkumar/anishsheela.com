import { Fragment, useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const CAREER_START = 2012;
const yearsShipping = new Date().getFullYear() - CAREER_START;

const nav = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'work', label: 'work' },
    { id: 'stack', label: 'stack' },
    { id: 'community', label: 'community' },
    { id: 'contact', label: 'contact' },
];

const experience = [
    {
        role: 'Senior Consultant',
        org: 'BizIntelligence Technologies',
        note: 'part-time, M.Tech now completed',
        period: '03/2024 – present',
        location: 'Remote',
        current: true,
        bullets: [
            'Architected and operate a client-side certificate authentication service end to end (FastAPI backend, React Native client), replacing password and OTP flows with cryptographic identity verification. I direct Claude Code through structured specs for the bulk of the implementation and review every generated change before merge.',
            'Built an encrypted personal data vault where encryption and key handling run entirely client-side, so plaintext never reaches the server.',
            'Led the Drupal 7 to 10 migration of a sports league management platform with 200+ modules. Most dependencies were deprecated, so I rebuilt rather than ported: a custom data migration once the standard Migrate path proved unworkable, Rules replaced with ECA, every View and custom module rewritten. Led one developer and one tester to roughly 60% before the client shelved the project on the budget risk I had flagged at the outset.',
        ],
    },
    {
        role: 'Parental leave',
        org: '',
        note: '',
        period: '11/2023 – 02/2024',
        location: '',
        bullets: [],
    },
    {
        role: 'Full-Stack Engineer',
        org: 'Meta',
        note: 'contract via Alpha Net Solutions',
        period: '03/2023 – 10/2023',
        location: 'Singapore',
        bullets: [
            'Shipped and modernized privacy-compliance tooling used across Meta’s global privacy infrastructure (React, TypeScript, Hack), supporting GDPR and CCPA adherence.',
            'Owned features end to end with product and compliance stakeholders, merging 90+ pull requests across bug fixes, performance work, and migrations of legacy tools to current engineering standards.',
            'Optimized report-generation systems, improving processing speed and reliability for compliance workflows.',
        ],
    },
    {
        role: 'Software Engineer',
        org: 'Crédit Agricole CIB',
        note: 'contract via Adecco',
        period: '05/2022 – 03/2023',
        location: 'Singapore',
        bullets: [
            'Rebuilt the corporate site (ca-cib.com) as headless Drupal 9 with a Next.js frontend, cutting page loads from 6 to 8 seconds down to 1 to 2 seconds.',
            'Automated the deployment pipeline with Jenkins, taking deploys from 3 to 4 hours down to 30 to 45 minutes and downtime from an hour to 5 minutes.',
            'Maintained the organization-wide intranet portal serving personalized content and data.',
        ],
    },
    {
        role: 'Lead Engineer',
        org: 'QBurst Technologies',
        note: '',
        period: '08/2020 – 05/2022',
        location: 'India',
        bullets: [
            'Led a multi-site Drupal 9 platform for the US National Institutes of Health on Acquia Cloud, meeting HIPAA requirements, owning architecture, content modeling, and automated deployments through Acquia Pipelines.',
            'Built a counter-terrorism portal for the Inter-Parliamentary Union: headless Drupal, a React progressive web app, and custom geopolitical maps in QGIS.',
            'Established CI/CD infrastructure and shared developer tooling from scratch across 10+ projects deploying to AWS and dedicated servers. Managed and mentored a team of 6, running technical interviews, estimation, and client consulting.',
        ],
    },
    {
        role: 'Senior Analyst',
        org: 'Accenture',
        note: '',
        period: '01/2018 – 08/2020',
        location: 'Singapore',
        bullets: [
            'Led the Singapore Pools platform rebuild (Drupal 7 to 8) and its integrations with surrounding services and backend infrastructure, modernizing a high-traffic, tightly regulated betting platform and removing expensive third-party licensing costs.',
            'Designed the Redis caching layer that cut expensive repeated queries across those integrations and improved performance 1.8x, with invalidation built so the platform never served stale availability data.',
            'Built an internal service-status dashboard (React, Node.js) for client demos, consulted on site for Telekom Malaysia, and mentored junior developers.',
        ],
    },
    {
        role: 'Drupal Developer & Technical Lead',
        org: 'Axelerant · Zyxware · Hello Infinity',
        note: 'co-founder of Hello Infinity',
        period: '06/2012 – 09/2017',
        location: 'India',
        bullets: [
            'Delivered 15+ Drupal projects (e-commerce, multilingual) leading teams of up to 5. Co-founded Hello Infinity, owning technology decisions, infrastructure, and client relationships.',
        ],
    },
];

const stack = [
    { group: 'Languages', items: ['PHP', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { group: 'Backend', items: ['Drupal 7 to 10', 'Symfony', 'FastAPI', 'Flask', 'Node.js', 'REST', 'GraphQL'] },
    { group: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS'] },
    { group: 'ML & AI', items: ['PyTorch', 'Swin Transformer', 'YOLO', 'LLM APIs', 'Model Context Protocol', 'Claude Code'] },
    { group: 'DevOps & Cloud', items: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Acquia Cloud', 'NixOS'] },
    { group: 'Data & Testing', items: ['PostgreSQL', 'MySQL', 'Redis', 'Apache Solr', 'PHPUnit', 'Behat', 'Jest', 'Playwright'] },
];

/* Projects are grouped by theme rather than size. A group's first cards can
   be featured (full width, image, "why it matters"); the rest sit in a grid.
   Each card's href is the primary link (the whole card), and `links` adds
   secondary ones such as the source code. */
const projectGroups = [
    {
        title: 'Applied machine learning',
        featured: [
        {
            title: 'Road Quality Map',
            meta: 'M.Tech dissertation · open source · 2025 to 2026',
            href: 'https://roads.anishsheela.com/',
            hrefLabel: 'roads.anishsheela.com',
            links: [
                { label: 'annotate.anishsheela.com', href: 'https://annotate.anishsheela.com/' },
                { label: 'source', href: 'https://github.com/anishanilkumar/potholes' },
            ],
            image: '/projects/roads.jpg',
            alt: 'An interactive map with road segments colored by surface quality.',
            body: 'A dashcam records the road on an ordinary drive. This turns that footage into a map of how good or bad the surface actually is, stretch by stretch, across 808 road segments, and can then route you along the smoothest way rather than the shortest. It works out where the camera was from the timestamp burned into the video, and learns to recognize a rough surface or a pothole from the picture itself. The labels came from a game I built for it: you rate a dashcam frame against a five-point rubric, and only score when someone else independently gives the same answer. Fifty-three people played and produced 3,216 agreed images. Fixing that data and the class design, rather than the model, took validation accuracy from 53% to 79.6%.',
            why: 'Road condition surveys are expensive, so they happen rarely and cover very little. Anyone with a dashcam is already carrying the sensor, which matters most on the roads official surveys never reach. A smoother route is also an accessibility question for anyone on two wheels, in a wheelchair, or carrying a patient. And rewarding agreement instead of volume made accuracy the thing worth chasing.',
        },
        ],
        cards: [],
    },
    {
        title: 'Products',
        featured: [
        {
            title: 'ApplyQuest',
            meta: 'Full-stack platform · live demo · 2026',
            href: 'https://applyquest-demo.anishsheela.com',
            hrefLabel: 'applyquest-demo.anishsheela.com',
            links: [{ label: 'source', href: 'https://github.com/anishanilkumar/applyquest' }],
            image: '/projects/applyquest.jpg',
            alt: 'A diagram tracing job applications through interview stages to their outcomes.',
            body: 'A job hunt is hundreds of applications spread over months, with long silences and very little feedback. ApplyQuest keeps all of it in one place: where each application stands, who you have spoken to, what needs a follow up this week. It borrows from games, awarding points and streaks for the effort you control, because the outcome mostly is not. A browser add-on saves a posting in one click, a weekly email tells you where things stand, and an MCP server lets an AI assistant check your tracked applications against your actual Gmail inbox. The demo is loaded with a sample job hunt, so you can click straight in.',
            why: 'Job hunting is demoralizing precisely because effort and results come apart. Rewarding the applications you sent, rather than the replies you did not get, is what keeps people going through the part that actually decides whether they get hired.',
        },        ],
        cards: [
        {
            title: 'Content Authenticity Toolkit',
            meta: 'Media provenance · proof of concept · 2026',
            href: 'https://github.com/anishanilkumar/content-authenticity-poc',
            hrefLabel: 'github.com/anishanilkumar/content-authenticity-poc',
            links: [{ label: 'Firefox add-on', href: 'https://github.com/anishanilkumar/sign_extension' }],
            body: 'A way to prove that a photo or document is the one you published and has not been altered since. You sign your images and PDFs, and a browser add-on checks the signature as you browse. It still recognizes a picture that was resized or re-saved along the way, which is what normally breaks this kind of check.',
        },
        ],
    },
    {
        title: 'The kitchen, run through Claude',
        featured: [],
        cards: [
        {
            title: 'Grocy MCP',
            meta: 'Open source · AI assistant tooling · 2026',
            href: 'https://github.com/anishanilkumar/grocy-mcp',
            hrefLabel: 'github.com/anishanilkumar/grocy-mcp',
            body: 'Connects an AI assistant to the open source software that tracks what is in your kitchen, so instead of tapping through an inventory app you just ask: what is going off this week, what can I cook with it, add coconut milk to the list. The careful part is what it refuses to do. If a product name could mean two things, it stops and asks rather than quietly moving the wrong item.',
        },
        {
            title: 'Recipie',
            meta: 'Offline-first PWA · MCP · 2026',
            href: 'https://github.com/anishanilkumar/recipie',
            hrefLabel: 'github.com/anishanilkumar/recipie',
            body: 'A household recipe book that checks the pantry before you start. Each recipe gets a lid: green when everything is in, yellow when one or two minor things are missing, red when the dish cannot happen tonight. It knows coconut oil can stand in for ghee, works offline at the stove, and lets Claude read and save recipes.',
        },
        {
            title: 'Foodlog',
            meta: 'Photo-first PWA · MCP · private · 2026',
            body: 'Logging a meal takes a photo and a few seconds. Claude works out later what was on the plate, how much, and the nutrition, reading a kitchen scale in the frame when there is one. Each half of an entry has exactly one writer, the phone or Claude, so syncing never has to merge anything.',
        },
        ],
    },
    {
        title: 'Self-hosted, for home and community',
        featured: [],
        cards: [
        {
            title: 'Jarvis, a home server that rebuilds itself',
            meta: 'Home infrastructure · NixOS · 2025 to 2026',
            href: 'https://abfahrt.anishsheela.com/',
            hrefLabel: 'abfahrt.anishsheela.com',
            links: [{ label: 'source', href: 'https://github.com/anishanilkumar/jarvis' }],
            body: 'A Raspberry Pi that runs the household: media, automatic Mac backups, monitoring, remote access. The whole machine is described in one set of text files, so if the memory card dies I write a fresh one and get the identical server back. A cheap tablet on the wall shows the day from it: weather, whether you need an umbrella, tram departures, dinner, the shopping list. It answers to "hey jarvis" entirely on the Pi, with no account and nothing said in the house sent anywhere. The rule is that it never blanks and never lies: stale data looks stale. Its departures panel is public as Abfahrt: give it a Berlin address and see the trams and buses you can still catch nearby.',
        },
        {
            title: 'Human Nutrition Facts',
            meta: 'Just for fun · single page · 2026',
            href: 'https://human-nutrition.anishsheela.com/',
            hrefLabel: 'human-nutrition.anishsheela.com',
            links: [{ label: 'source', href: 'https://github.com/anishanilkumar/human-nutrition' }],
            body: 'What is the nutritional value of a human? Enter your height, weight and age and get the full German food label for your own body: energy, vitamins, minerals, a Nutri-Score and a best before date drawn from life expectancy tables. The numbers come from real body composition research, and every row says how confident the estimate is.',
        },        {
            title: 'Drupal Kerala community hub',
            meta: 'Community · open books · 2026',
            href: 'https://drupalkerala.org/',
            hrefLabel: 'drupalkerala.org',
            links: [{ label: 'source', href: 'https://github.com/anishanilkumar/drupalkerala' }],
            body: 'The home of the Drupal community I co-founded in Kerala: upcoming meetups on a shared calendar, and the complete accounts for the Drupal and Wikipedia 25th anniversary celebrations in Thiruvananthapuram and Kochi, down to the scanned bills. Volunteer events run on trust, and publishing every rupee is the cheapest way to keep it.',
        },        ],
    },
    {
        title: 'Smaller tools and older open source',
        featured: [],
        cards: [
        {
            title: 'Karyasthan',
            meta: 'WhatsApp bot · Node · 2026',
            href: 'https://github.com/anishanilkumar/wg_whatsapp',
            hrefLabel: 'github.com/anishanilkumar/wg_whatsapp',
            body: 'Announces the day\'s cleaning duties to our shared flat\'s WhatsApp group every morning. Deliberately notify only: no tracking, no reminders, no calling anyone out.',
        },
        {
            title: 'Walk or run for the bus?',
            meta: 'React · Singapore · 2022',
            href: 'https://github.com/anishanilkumar/sgbusrun',
            hrefLabel: 'github.com/anishanilkumar/sgbusrun',
            body: 'One glance at live arrivals for the bus between home and office, colored by how full each bus is, to decide whether it was worth running.',
        },
        {
            title: 'Drupal and PHP contributions',
            meta: 'Open source · 2012 to 2026',
            href: 'https://github.com/anishanilkumar/phpresellerclub',
            hrefLabel: 'github.com/anishanilkumar/phpresellerclub',
            body: 'A typed, tested PHP client for the ResellerClub domain API, plus Drupal modules: Hacked! and Block ID ported to Drupal 9, a CSV list field formatter, and a JSON page API.',
        },
        ],
    },
];

const education = [
    { degree: 'M.Tech, Software Engineering', school: 'BITS Pilani (work-integrated)', period: '2024 – 2026', note: 'CGPA 8.22 / 10. Dissertation: Road Quality Assessment System Using Computer Vision and GPS-Based Mapping, graded Excellent.' },
    { degree: 'MicroMasters, Statistics & Data Science', school: 'MITx, via edX', period: '2020 – 2022', note: 'Four graduate-level courses across probability, statistics, machine learning, and data analysis, with proctored capstone exams, completed while working full time.', href: 'https://micromasters.mit.edu/letter/program/5c400dcc-ba4c-491b-89f0-124b33f6691c', hrefLabel: 'Verify credential' },
    { degree: 'B.Tech, Computer Science & Engineering', school: 'University of Kerala', period: '2008 – 2012', note: '' },
];

const certifications = ['Acquia Certified Developer', 'Google AI for JavaScript Developers with TensorFlow.js'];

const languages = [
    { name: 'German', level: 'B1, Goethe-Institut certified, studying toward B2' },
    { name: 'English', level: 'C1 (IELTS), full professional proficiency' },
    { name: 'Malayalam', level: 'Native' },
    { name: 'Tamil & Hindi', level: 'Conversational' },
];

const community = [
    {
        group: 'Speaking',
        items: [
            {
                text: 'Zero to community: building and scaling your local Drupal group',
                meta: 'DrupalCon Vienna 2025',
                href: 'https://events.drupal.org/vienna2025/session/zero-community-building-and-scaling-your-local-drupal-group',
            },
            {
                text: 'The future of login: how Drupal can champion user choice, privacy and simplicity',
                meta: 'DrupalCon Vienna 2025',
                href: 'https://events.drupal.org/vienna2025/session/future-login-how-drupal-can-champion-user-choice-privacy-and-simplicity',
            },
            {
                text: 'Open Source Handwriting Recognition',
                meta: 'IndiaOS, FOSS United',
                href: 'https://fossunited.org/indiafoss/speakers/anish-sheela',
            },
            {
                text: 'Malayalam localization in WordPress',
                meta: 'WordCamp Kerala 2024',
                href: 'https://kerala.wordcamp.org/2024/session/malayalam-localization-in-wordpress/',
            },
            {
                text: 'Fostering growth of local Drupal communities in India',
                meta: 'DrupalCamp Pune, panel',
                href: 'https://www.drupalpune.in/panel-discussion-fostering-growth-local-drupal-communities-india',
            },
            { text: 'FOSSMeet 2025', meta: 'Speaker', href: null },
        ],
    },
    {
        group: 'Open source',
        items: [
            {
                text: 'Contributor to Drupal core and contributed modules',
                meta: 'drupal.org/u/anisha',
                href: 'https://www.drupal.org/u/anisha',
            },
            {
                text: 'Maintainer of phpresellerclub, a PHP API library in continuous use since 2012',
                meta: '23 stars on GitHub',
                href: 'https://github.com/anishanilkumar/phpresellerclub',
            },
            {
                text: 'Malayalam language computing with Swathantra Malayalam Computing',
                meta: 'localization for Mozilla and GNOME',
                href: 'https://smc.org.in/',
            },
        ],
    },
    {
        group: 'Organizing',
        items: [
            {
                text: 'Co-founder of Drupal Kerala. I organize meetups and mentor new contributors.',
                meta: 'drupalkerala.org',
                href: 'https://drupalkerala.org/',
            },
            {
                text: 'Responsible for the cooking at The Migrant Canteen, and an amateur baker the rest of the time.',
                meta: 'The Migrant Canteen',
            },
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
    return (
        <div className="label flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 bg-arc-dim" aria-hidden="true" />
            {children}
        </div>
    );
}

function SectionHead({ label, title, id }) {
    return (
        <div className="mb-10">
            <Eyebrow>{label}</Eyebrow>
            <h2 id={id} className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-4xl">
                {title}
            </h2>
            <div className="mt-5 h-[2px] w-full bg-engrave" />
        </div>
    );
}

function Chip({ children }) {
    return (
        <span className="rounded-[2px] border-rule border-engrave bg-panel px-2.5 py-1 font-mono text-[13px] text-ink">
            {children}
        </span>
    );
}

function GroupLabel({ children, className = '' }) {
    return <h3 className={`label ${className}`}>{children}</h3>;
}

/* One card in the projects section. The title link is stretched over the
   whole card, so the card stays one big click target while a separate source
   link can sit on top of it (anchors cannot nest). Cards with nowhere to go
   get no misleading affordances. */
function ProjectCard({ p, featured: isFeatured }) {
    const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

    return (
        <div
            className={`instrument group flex flex-col p-6 sm:p-7 ${p.href ? 'hover:bg-panel-lit' : ''}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold leading-[1.1] tracking-[-0.01em] text-ink transition-colors group-hover:text-arc">
                        {p.href ? (
                            <a
                                href={p.href}
                                {...linkProps}
                                className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-arc"
                            >
                                {p.title}
                            </a>
                        ) : (
                            p.title
                        )}
                    </h3>
                    <div className="mt-1.5 font-mono text-xs tracking-[0.08em] text-ink-dim">{p.meta}</div>
                </div>
                {p.href && (
                    <span
                        aria-hidden="true"
                        className="mt-0.5 font-mono text-lg text-ink-dim transition-colors group-hover:text-arc"
                    >
                        ↗
                    </span>
                )}
            </div>

            <div className={isFeatured && p.image ? 'mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8' : ''}>
                {isFeatured && p.image && (
                    <img
                        src={p.image}
                        alt={p.alt}
                        width="1442"
                        height="900"
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full border-rule border-engrave bg-ground object-cover object-top"
                    />
                )}
                <div>
                    <p className={`leading-relaxed text-ink-dim ${isFeatured && p.image ? '' : 'mt-4'}`}>{p.body}</p>
                    {p.why && (
                        <div className="mt-5 border-t-rule border-engrave pt-4">
                            <GroupLabel>Why it matters</GroupLabel>
                            <p className="mt-2 leading-relaxed text-ink-dim">{p.why}</p>
                        </div>
                    )}
                </div>
            </div>

            {(p.hrefLabel || p.links) && (
                <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-1 pt-5 font-mono text-[13px]">
                    {/* Long repo URLs wrap after a slash, never mid-name. */}
                    {p.hrefLabel && (
                        <span className="text-arc">
                            {p.hrefLabel.split('/').map((part, i) => (
                                <Fragment key={i}>
                                    {i > 0 && '/'}
                                    {i > 0 && <wbr />}
                                    {part}
                                </Fragment>
                            ))}
                        </span>
                    )}
                    {p.links?.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            {...linkProps}
                            className="relative z-10 text-ink-dim underline decoration-engrave decoration-2 underline-offset-4 hover:text-arc hover:decoration-arc"
                        >
                            {l.label} ↗
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
    const [active, setActive] = useState('about');

    // Deep links like /#projects are the whole point of having real anchors, so
    // they have to survive load. The browser's own jump to the fragment happens
    // before hydration, web fonts and images have settled the page height, and
    // does not stick. Re-align as those land, and bail out the moment the
    // visitor scrolls for themselves. Smooth scrolling is switched on at the
    // same time so it applies to clicks but not to this.
    useEffect(() => {
        const html = document.documentElement;
        const { hash } = window.location;

        let target = null;
        try {
            target = hash ? document.querySelector(hash) : null;
        } catch {
            target = null;
        }

        if (!target) {
            html.classList.add('smooth-scroll');
            return;
        }

        let active = true;
        const jump = () => active && target.scrollIntoView({ behavior: 'instant' });
        const release = () => {
            active = false;
            html.classList.add('smooth-scroll');
        };

        const opts = { once: true, passive: true };
        window.addEventListener('wheel', release, opts);
        window.addEventListener('touchstart', release, opts);
        window.addEventListener('keydown', release, opts);

        jump();
        window.addEventListener('load', jump);
        document.fonts?.ready.then(jump);
        const settled = setTimeout(release, 500);

        return () => {
            clearTimeout(settled);
            window.removeEventListener('load', jump);
            window.removeEventListener('wheel', release);
            window.removeEventListener('touchstart', release);
            window.removeEventListener('keydown', release);
        };
    }, []);

    // Highlight whichever section is currently in view. Without this the nav
    // keeps whatever was clicked last highlighted all the way down the page.
    useEffect(() => {
        const sections = nav
            .map((n) => document.getElementById(n.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const navLink = (n, extra = '') =>
        `font-mono text-[13px] uppercase tracking-[0.08em] transition-colors hover:text-ink ${
            active === n.id ? 'text-arc' : 'text-ink-dim'
        } ${extra}`;

    return (
        <div className="min-h-screen">
            <a
                href="#main"
                className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
            >
                Skip to content
            </a>

            {/* Header. Solid ground, not translucent: no blur in this language. */}
            <header className="fixed inset-x-0 top-0 z-50 border-b-rule border-engrave bg-ground">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <a href="#about" className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-ink">
                        Anish Anilkumar
                    </a>
                    <nav aria-label="Sections" className="hidden gap-7 sm:flex">
                        {nav.map((n) => (
                            <a
                                key={n.id}
                                href={`#${n.id}`}
                                aria-current={active === n.id ? 'true' : undefined}
                                className={navLink(n)}
                            >
                                {n.label}
                            </a>
                        ))}
                    </nav>
                </div>
                {/* Phones get a scrollable strip rather than no navigation at all. */}
                <nav
                    aria-label="Sections"
                    className="no-scrollbar flex gap-6 overflow-x-auto border-t-rule border-engrave px-6 py-2.5 sm:hidden"
                >
                    {nav.map((n) => (
                        <a
                            key={n.id}
                            href={`#${n.id}`}
                            aria-current={active === n.id ? 'true' : undefined}
                            className={navLink(n, 'shrink-0')}
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>
            </header>

            <main id="main" className="mx-auto max-w-5xl px-6">
                {/* Hero */}
                <section id="about" className="pt-40 pb-24 sm:pt-44">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
                        <div>
                            <div className="rise" style={{ animationDelay: '0.05s' }}>
                                <Eyebrow>Senior Full-Stack Engineer</Eyebrow>
                            </div>
                            <h1
                                className="rise mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl"
                                style={{ animationDelay: '0.12s' }}
                            >
                                I build web platforms that hold up at scale.
                            </h1>
                            <p
                                className="rise mt-7 text-lg leading-relaxed text-ink-dim"
                                style={{ animationDelay: '0.2s' }}
                            >
                                {yearsShipping} years shipping software for Meta, Crédit Agricole CIB, Accenture, and
                                the US National Institutes of Health. I work across the stack: deep PHP and Drupal,
                                React and TypeScript on the frontend, and, lately, applied machine learning. Based in
                                Berlin with a Goethe-certified B1 in German.
                            </p>

                            <div
                                className="rise mt-8 flex flex-wrap items-center gap-3"
                                style={{ animationDelay: '0.28s' }}
                            >
                                {/* A status readout, not a pill: the dot carries the state. */}
                                <span className="inline-flex items-center gap-2.5 border-l-4 border-arc bg-panel py-2 pl-3 pr-4 font-mono text-[13px] uppercase tracking-[0.08em] text-ink">
                                    <span className="inline-block h-2 w-2 bg-arc" aria-hidden="true" />
                                    Available in Berlin, work authorization ready
                                </span>
                            </div>

                            <div
                                className="rise mt-8 flex flex-wrap items-center gap-3"
                                style={{ animationDelay: '0.34s' }}
                            >
                                <a
                                    href="/Anish_Anilkumar_CV.pdf"
                                    download
                                    className="btn btn-primary"
                                >
                                    Download CV
                                </a>
                                <a
                                    href="mailto:aneesh.nl@gmail.com"
                                    className="btn"
                                >
                                    Get in touch
                                </a>
                                <div className="ml-1 flex items-center gap-1">
                                    {[
                                        { icon: Github, href: 'https://github.com/anishanilkumar', label: 'GitHub' },
                                        { icon: Linkedin, href: 'https://www.linkedin.com/in/anishanil/', label: 'LinkedIn' },
                                        { icon: Mail, href: 'mailto:aneesh.nl@gmail.com', label: 'Email' },
                                    ].map(({ icon: Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            target={href.startsWith('http') ? '_blank' : undefined}
                                            rel="noopener noreferrer"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] text-ink-dim transition-colors hover:bg-engrave hover:text-arc"
                                        >
                                            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rise instrument hidden p-3 lg:block" style={{ animationDelay: '0.2s' }}>
                            <img
                                src="/portrait.jpg"
                                alt="Anish Anilkumar"
                                width="880"
                                height="1099"
                                className="w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Selected work" title="Things I have built" />
                    <div className="space-y-14">
                        {projectGroups.map((g) => (
                            <div key={g.title}>
                                <GroupLabel>{g.title}</GroupLabel>
                                <div className="mt-4 space-y-5">
                                    {g.featured.map((p) => (
                                        <ProjectCard key={p.title} p={p} featured />
                                    ))}
                                    {g.cards.length > 0 && (
                                        <div
                                            className={`grid gap-5 ${g.cards.length > 1 ? 'sm:grid-cols-2' : ''} ${
                                                g.cards.length % 3 === 0 ? 'lg:grid-cols-3' : g.cards.length === 4 ? 'lg:grid-cols-4' : ''
                                            }`}
                                        >
                                            {g.cards.map((p) => (
                                                <ProjectCard key={p.title} p={p} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Work */}
                <section id="work" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Work history" title="Where I have shipped" />
                    <div className="relative">
                        {/* An engraved rule with a tick per role: filled arc for the
                            current one, an empty engraved square for the past. */}
                        <div
                            className="absolute bottom-2 left-[6px] top-2 w-[2px] bg-engrave sm:left-[7px]"
                            aria-hidden="true"
                        />
                        <ol className="space-y-12">
                            {experience.map((job) => (
                                <li key={job.role + job.org} className="relative pl-8 sm:pl-10">
                                    <span
                                        className={`absolute left-0 top-1.5 h-[14px] w-[14px] border-rule bg-ground sm:h-4 sm:w-4 ${
                                            job.current ? 'border-arc' : 'border-arc-dim'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {job.current && <span className="absolute inset-[2px] bg-arc" />}
                                    </span>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                        <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
                                            {job.role}
                                            {job.org && <span className="text-arc-dim"> · {job.org}</span>}
                                        </h3>
                                        <div className="shrink-0 font-mono text-[13px] tracking-[0.04em] text-ink-dim">
                                            {job.location ? `${job.period} · ${job.location}` : job.period}
                                        </div>
                                    </div>
                                    {job.note && (
                                        <div className="mt-0.5 font-mono text-xs tracking-[0.04em] text-ink-dim">{job.note}</div>
                                    )}
                                    <ul className="mt-3 space-y-2">
                                        {job.bullets.map((b, i) => (
                                            <li key={i} className="flex gap-3 leading-relaxed text-ink-dim">
                                                <span
                                                    className="mt-2.5 h-1 w-1 shrink-0 bg-arc-dim"
                                                    aria-hidden="true"
                                                />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Stack */}
                <section id="stack" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Toolkit" title="What I work with" />
                    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                        {stack.map((s) => (
                            <div key={s.group}>
                                <GroupLabel>{s.group}</GroupLabel>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {s.items.map((it) => (
                                        <Chip key={it}>{it}</Chip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education + Certs + Languages */}
                <section id="background" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Background" title="Education & languages" />
                    <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <GroupLabel>Education</GroupLabel>
                            <div className="mt-4 space-y-6">
                                {education.map((e) => (
                                    <div key={e.degree}>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                            <h4 className="text-lg font-semibold text-ink">{e.degree}</h4>
                                            <span className="shrink-0 font-mono text-[13px] text-ink-dim">{e.period}</span>
                                        </div>
                                        <div className="text-arc-dim">{e.school}</div>
                                        {e.note && <p className="mt-1 text-[15px] leading-relaxed text-ink-dim">{e.note}</p>}
                                        {e.href && (
                                            <a
                                                href={e.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 inline-block font-mono text-[13px] text-arc hover:text-ink"
                                            >
                                                {e.hrefLabel} ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <GroupLabel className="mt-10">Certifications</GroupLabel>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {certifications.map((c) => (
                                    <Chip key={c}>{c}</Chip>
                                ))}
                            </div>
                        </div>

                        <div>
                            <GroupLabel>Languages</GroupLabel>
                            <dl className="mt-4 space-y-4">
                                {languages.map((l) => (
                                    <div key={l.name}>
                                        <dt className="font-semibold text-ink">{l.name}</dt>
                                        <dd className="text-[15px] leading-relaxed text-ink-dim">{l.level}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                {/* Community */}
                <section id="community" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Off the clock" title="Community & open source" />
                    <div className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
                        {community.map((c) => (
                            <div key={c.group}>
                                <GroupLabel>{c.group}</GroupLabel>
                                <ul className="mt-4 space-y-4">
                                    {c.items.map((it) => (
                                        <li key={it.text}>
                                            {it.href ? (
                                                <a
                                                    href={it.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group block"
                                                >
                                                    <span className="leading-relaxed text-ink-dim transition-colors group-hover:text-ink">
                                                        {it.text}
                                                    </span>
                                                    <span className="mt-0.5 block font-mono text-xs text-arc transition-colors">
                                                        {it.meta} ↗
                                                    </span>
                                                </a>
                                            ) : (
                                                <div>
                                                    <span className="leading-relaxed text-ink-dim">{it.text}</span>
                                                    <span className="mt-0.5 block font-mono text-xs text-ink-dim">
                                                        {it.meta}
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="border-t-rule border-engrave py-20">
                    <SectionHead label="Get in touch" title="Let's talk" />
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                            <p className="max-w-xl text-lg leading-relaxed text-ink-dim">
                                I am looking for senior full-stack roles in Berlin and across the EU. Full German work
                                authorization, no sponsorship needed, available to start immediately, and open to
                                relocation.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="mailto:aneesh.nl@gmail.com"
                                    className="btn btn-primary"
                                >
                                    Email me
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/anishanil/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                >
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </div>

                        <dl className="space-y-4 font-mono text-[13px]">
                            {[
                                ['Email', 'aneesh.nl@gmail.com', 'mailto:aneesh.nl@gmail.com'],
                                ['Phone', '+49 151 51484460', 'tel:+4915151484460'],
                                ['Location', 'Berlin, Germany', null],
                                ['GitHub', 'github.com/anishanilkumar', 'https://github.com/anishanilkumar'],
                                ['Drupal', 'drupal.org/u/anisha', 'https://www.drupal.org/u/anisha'],
                            ].map(([k, v, href]) => (
                                <div
                                    key={k}
                                    className="flex flex-col gap-0.5 border-b-rule border-engrave pb-3 sm:flex-row sm:justify-between sm:gap-6"
                                >
                                    <dt className="uppercase tracking-[0.14em] text-ink-dim">{k}</dt>
                                    <dd className="sm:text-right">
                                        {href ? (
                                            <a
                                                href={href}
                                                target={href.startsWith('http') ? '_blank' : undefined}
                                                rel="noopener noreferrer"
                                                className="text-arc transition-colors hover:text-ink"
                                            >
                                                {v}
                                            </a>
                                        ) : (
                                            <span className="text-ink">{v}</span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>
            </main>

            <footer className="border-t-rule border-engrave">
                <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
                    <span>Anish Anilkumar, Berlin</span>
                    <span>Built with React and Tailwind. No template.</span>
                </div>
            </footer>
        </div>
    );
}
