import { useState } from "react";
import { Check, Clipboard, ExternalLink, ArrowLeft, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Guide() {
  // Customisation state
  const [schoolName, setSchoolName] = useState("Nanyang High School");
  const [tagline, setTagline] = useState("Your music, all in one place");
  const [primaryColor, setPrimaryColor] = useState("amber/gold (#F59E0B)");
  const [customSection, setCustomSection] = useState("Sectionals");
  
  // Toggle optional sections
  const [includeCharts, setIncludeCharts] = useState(true);

  // Copy status state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Prompts builder
  const prompt1Text = `Build me a simple mobile-first web app called "${schoolName} Band Hub".

This is a resource hub for a school band. It should look and feel like a clean mobile app.

The app has 3 sections accessible from a bottom navigation bar:
1. Home — shows announcements
2. Schedule — shows rehearsal schedule
3. Resources — shows music resources

Design:
- Header bar with the school name and tagline: "${tagline}"
- Header colour: ${primaryColor} with white text
- Clean white cards, slate grey text, rounded corners
- Mobile-first layout, max-width 480px, centred on desktop

Just build the shell with the bottom nav and empty placeholder sections for now. No data yet.`;

  const prompt2Text = `Build the Announcements section (the home/landing screen).

Show a list of announcements as collapsible cards. Each announcement has:
- Title
- Date posted
- Body text (can be long — hide it until the card is tapped)

Display newest first. Tap a card to expand and read the full message. Tap again to collapse.

Add a small "Admin" link at the very bottom of the page (subtle, low opacity) that leads to a simple admin panel where someone can:
- Add a new announcement (title, date, body)
- Archive/delete old ones

No login needed for the admin panel for now — just a hidden link.`;

  const prompt3OptionA = `Build the Schedule section.

Instead of storing schedule data in the app, just display it from an external source.
Give the admin two choices (they pick one when setting up):

Option 1 — Embed a Google Calendar:
Show an embedded Google Calendar iframe. The admin just pastes their Google Calendar embed URL.

Option 2 — Link to an existing website:
Show a button that opens an external URL (e.g., the school website schedule page) in a new tab. The admin pastes the URL.

On the Schedule screen, show whichever option is configured, with a label like "Rehearsal Schedule" and a brief note like "Tap to view full schedule" for the link option.

The admin can configure which option is active from the admin panel.`;

  const prompt3OptionB = `Build the Schedule section where admins can manage rehearsal sessions.

Each rehearsal entry has:
- Date (date picker)
- Start time and end time
- Venue / location
- Rehearsal items / agenda (optional free text — e.g. "Bar 32–56 of March, Full run of Concert Piece")

Display the schedule as a clean list, grouped by upcoming vs past.
Upcoming rehearsals show at the top. Past ones are collapsed under a "Past Sessions" toggle.

Also give the admin an option to upload a PDF schedule file. If a PDF is uploaded, show a "Download Full Schedule" button at the top of the schedule screen.

The admin can manage entries (add, edit, delete) from the admin panel.`;

  const prompt4Text = `Build the Resources section with three sub-sections accessible via tabs or a button row at the top:

1. VIDEOS
- Show a list of video resources as cards
- Each card: title, optional description, and a thumbnail
- Support YouTube links — auto-fetch the thumbnail from the YouTube URL
- Tapping a card opens a video player modal (embedded YouTube player)
- Admin can mark any video as "Featured" — featured videos appear at the top

2. SHEET MUSIC
- Show sheet music files as a simple list
- Each item: title, instrument/group tag (e.g. "Full Band", "Trumpet", "Flute")
- Tapping downloads or opens the file (PDF or external link)
- Group items by instrument tag using collapsible sections
${includeCharts ? `
3. CHARTS
- Show reference charts as downloadable/viewable items
- Two types: Fingering Charts and Transposition Charts
- Each item: title and a tap-to-view action (opens PDF)
- Admin can upload files or paste external links` : ''}

Admin can manage all resources (add, edit, delete, reorder) from the admin panel.
Use the same amber brand colour for section headers and active states.`;

  const prompt5Text = `Make these final improvements to the whole app:

1. Loading states: when any section is loading data, show skeleton/shimmer placeholder cards instead of a blank screen
2. Empty states: if a section has no content yet, show a friendly message with an icon (e.g. "No announcements yet — check back soon!")
3. Make the bottom nav highlight the active section
4. On the Resources screen, if no section tab is selected, show a summary/preview of all three sections with a "See all" link each

Keep everything consistent with the amber brand theme.`;

  const customizePrompt1 = `Update the app for ${schoolName}:
- School name: ${schoolName}
- Tagline: ${tagline}  
- Primary colour: ${primaryColor}
- Update all headers, buttons, and active states to use this colour`;

  const customizePrompt2 = `Add a new sub-section to Resources called "${customSection}".
It should work the same as the Sheet Music section — a list of items with a title, category tag, and a link or file download.`;

  const customizePrompt3 = `Populate the app with sample data for a school band:

Announcements:
- "Sectional rehearsal this Friday — all woodwinds 3–5pm, Room 4"
- "Concert tickets now on sale — see link on school website"
- "New sheet music uploaded: Flight of the Bumblebee"

Schedule (3 upcoming rehearsals):
- 24 July 2026, 3:00 PM, Rehearsal Room 1, Agenda: "Run Concert Programme, Section work on bar 34–56"
- 27 July 2026, 2:00 PM, School Auditorium, Agenda: "Full Dress Rehearsal"
- 30 July 2026, 3:00 PM, Rehearsal Room 1, Agenda: "Post-Concert Debrief"

Resources:
- 1 YouTube video: any band performance video
- 2 sheet music items under "Full Band"`;

  const troubleshooting1 = `The app isn't displaying correctly on a mobile screen width (375px). 
Fix any overflow issues, ensure all padding is at least 16px on sides, 
and make sure the bottom nav doesn't cover the page content.`;

  const troubleshooting2 = `After I add or delete an item in the admin panel, the main view doesn't refresh.
Make the list automatically update after any save or delete action.`;

  const troubleshooting3 = `YouTube thumbnails are not loading. 
The URL format used is: https://www.youtube.com/watch?v=VIDEO_ID
Extract the video ID and use: https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`;

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a] font-sans antialiased">
      {/* Top Banner */}
      <div className="border-b border-[#0a0a0a]/10 bg-white py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:opacity-70">
            <ArrowLeft size={14} /> Back to Website
          </Link>
          <span className="rounded bg-[#f59e0b]/10 px-2.5 py-1 text-xs font-semibold text-[#d97706]">
            Interactive Facilitator Kit
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Title */}
        <header className="mb-12 border-b border-[#0a0a0a]/15 pb-8">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            🎵 Band Hub – Vibe Coding Prompt Template
          </h1>
          <p className="mt-3 text-lg text-black/60 font-medium">
            30-Min Lesson Guide: Build a School Music Resource Hub
          </p>
        </header>

        {/* Interactive Customisation Control Panel */}
        <section className="mb-12 rounded-xl border border-amber-500/25 bg-amber-50/20 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2.5 border-b border-amber-200/50 pb-4">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-amber-900">Customise Prompts Dynamically</h2>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-amber-800/80">
            Type your school's info below. The prompts in the boxes further down will **automatically update** in real-time. Students can copy the pre-filled prompts directly!
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/70" htmlFor="school">School Name</label>
              <input
                id="school"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/70" htmlFor="tagline">Tagline / Motto</label>
              <input
                id="tagline"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/70" htmlFor="color">Theme Color</label>
              <input
                id="color"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900/70" htmlFor="section">Custom Section Name</label>
              <input
                id="section"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-amber-200 bg-white px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                value={customSection}
                onChange={(e) => setCustomSection(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Before You Start */}
        <section className="mb-12 rounded-lg border border-black/10 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold">🚀 BEFORE YOU START</h2>
          <ol className="mt-4 list-decimal pl-5 space-y-2.5 text-sm text-black/75">
            <li>Open a free vibe coding platform (e.g., Bolt.new, Replit, Lovable, v0.dev)</li>
            <li>Start a <strong>new project</strong></li>
            <li>Work through Prompts 1–4 in order</li>
            <li>Use the customizable values in the fields above, or edit them directly after pasting.</li>
          </ol>
        </section>

        {/* Flow Legend */}
        <div className="mb-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-black/60">
          <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50 px-3 py-1 text-blue-600">
            🔵 Core Flow (Required)
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-50 px-3 py-1 text-yellow-600">
            🟡 Optional Extensions
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-50 px-3 py-1 text-green-600">
            🟢 Personal Customisations
          </span>
        </div>

        {/* PROMPTS WORKFLOW */}
        <div className="space-y-16">
          {/* Prompt 1 */}
          <PromptCard
            id="p1"
            badge="🔵 PROMPT 1"
            badgeColor="bg-blue-600 text-white"
            title="App Shell & Identity"
            subtitle="Send this first. It sets the whole app structure up."
            text={prompt1Text}
            teachingPoint="We set identity and layout FIRST before any features. This prevents having to restyle everything later. Notice we also define the 3 sections upfront — the AI will wire the navigation correctly from the start."
            onCopy={handleCopy}
            copiedId={copiedId}
            customizedVariables={[`"${schoolName} Band Hub"`, `"${tagline}"`, primaryColor]}
          />

          {/* Prompt 2 */}
          <PromptCard
            id="p2"
            badge="🔵 PROMPT 2"
            badgeColor="bg-blue-600 text-white"
            title="Announcements Feed"
            subtitle="The simplest feature — good for warming up."
            text={prompt2Text}
            teachingPoint="Collapsible cards are a classic mobile pattern — they show the right amount of info at the right time. The hidden admin link is a deliberate UX choice: admins know where to look, students don't see clutter."
            onCopy={handleCopy}
            copiedId={copiedId}
          />

          {/* Prompt 3 */}
          <section className="space-y-6">
            <div className="border-b border-[#0a0a0a]/10 pb-4">
              <span className="rounded bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                🔵 PROMPT 3
              </span>
              <h2 className="mt-3 text-2xl font-bold">Schedule Rehearsals</h2>
              <p className="text-sm text-black/60">Choose <strong>ONE</strong> of the options below to paste into the builder.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-black/10 bg-white p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">Option A: Link to External Source</h3>
                  <p className="mt-1 text-xs text-black/50">Good for embedding Google Calendars or linking to existing school websites.</p>
                  <pre className="mt-4 h-56 overflow-y-auto rounded bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-100 whitespace-pre-wrap select-all">
                    {prompt3OptionA}
                  </pre>
                </div>
                <button
                  onClick={() => handleCopy(prompt3OptionA, "p3a")}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-black py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800"
                >
                  {copiedId === "p3a" ? <Check size={14} /> : <Clipboard size={14} />}
                  {copiedId === "p3a" ? "Copied!" : "Copy Option A"}
                </button>
              </div>

              <div className="rounded-lg border border-black/10 bg-white p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">Option B: Manual Rehearsal Logs</h3>
                  <p className="mt-1 text-xs text-black/50">Best if you want custom logs and PDF schedules uploaded natively in the app.</p>
                  <pre className="mt-4 h-56 overflow-y-auto rounded bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-100 whitespace-pre-wrap select-all">
                    {prompt3OptionB}
                  </pre>
                </div>
                <button
                  onClick={() => handleCopy(prompt3OptionB, "p3b")}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-black py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800"
                >
                  {copiedId === "p3b" ? <Check size={14} /> : <Clipboard size={14} />}
                  {copiedId === "p3b" ? "Copied!" : "Copy Option B"}
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-100 p-4 text-xs leading-relaxed text-black/60">
              <strong>Teaching point:</strong> Option A proves the best code is sometimes <em>no code</em> — linking to an existing system saves time. Option B teaches data definition: grouping inputs, selecting field types, and managing file uploads.
            </div>
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="rounded bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  🔵 PROMPT 4
                </span>
                <h2 className="mt-3 text-2xl font-bold">Resources Hub</h2>
                <p className="text-sm text-black/60">The richest section — builds video, sheet music, and custom reference sections.</p>
              </div>

              {/* Toggle controls */}
              <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50/30 px-3.5 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Include Optional Charts?</span>
                <button
                  onClick={() => setIncludeCharts(!includeCharts)}
                  className="text-amber-700 hover:opacity-85 focus:outline-none"
                >
                  {includeCharts ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>
            </div>

            <PromptCard
              id="p4"
              title=""
              subtitle=""
              text={prompt4Text}
              teachingPoint="The Resources section shows how one screen can hold multiple content types using tabs. Notice we defined 'Featured' as just a boolean flag on a resource — simple but powerful. The Charts block is truly optional: show participants how removing one paragraph from a prompt removes a whole feature cleanly."
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          </section>

          {/* Prompt 5 */}
          <PromptCard
            id="p5"
            badge="🟡 PROMPT 5"
            badgeColor="bg-[#d97706] text-white"
            title="Polish (Optional)"
            subtitle="Only if time allows. Improves loading states, empty states, and nav states."
            text={prompt5Text}
            teachingPoint="Polishing loading states and empty states transforms a prototype into a product. It establishes user experience guardrails."
            onCopy={handleCopy}
            copiedId={copiedId}
          />

          {/* CUSTOMISATIONS */}
          <section className="space-y-6">
            <div className="border-b border-[#0a0a0a]/10 pb-4">
              <span className="rounded bg-green-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                🟢 CUSTOMISATIONS
              </span>
              <h2 className="mt-3 text-2xl font-bold">Individual Student Personalization</h2>
              <p className="text-sm text-black/60">Help participants customize the theme, add categories, or inject mock data once the core app is running.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">1. Change School Colors and Identity</h3>
                <PromptBox text={customizePrompt1} id="c1" onCopy={handleCopy} copiedId={copiedId} />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">2. Add Custom Resource Category</h3>
                <PromptBox text={customizePrompt2} id="c2" onCopy={handleCopy} copiedId={copiedId} />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">3. Inject Demo Band Data</h3>
                <PromptBox text={customizePrompt3} id="c3" onCopy={handleCopy} copiedId={copiedId} />
              </div>
            </div>
          </section>

          {/* TROUBLESHOOTING */}
          <section className="space-y-6">
            <div className="border-b border-[#0a0a0a]/10 pb-4">
              <span className="rounded bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                🔧 TROUBLESHOOTING
              </span>
              <h2 className="mt-3 text-2xl font-bold">Quick Fix Prompts</h2>
              <p className="text-sm text-black/60">If the AI makes a mistake, copy and paste these exact troubleshooting prompts.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">Layout Breaks on Mobile</h3>
                <PromptBox text={troubleshooting1} id="t1" onCopy={handleCopy} copiedId={copiedId} />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">Content Doesn't Refresh Automatically</h3>
                <PromptBox text={troubleshooting2} id="t2" onCopy={handleCopy} copiedId={copiedId} />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">YouTube Video Thumbnails Not Loading</h3>
                <PromptBox text={troubleshooting3} id="t3" onCopy={handleCopy} copiedId={copiedId} />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#0a0a0a]/10 pt-8 text-center text-xs text-black/45">
          <p>© {new Date().getFullYear()} AImplified Creatives. All rights reserved.</p>
          <p className="mt-2">Made for the Wind Bands Association of Singapore (WBAS) Symposium.</p>
        </footer>
      </div>
    </div>
  );
}

// Subcomponents
interface PromptCardProps {
  id: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  text: string;
  teachingPoint: string;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
  customizedVariables?: string[];
}

function PromptCard({
  id,
  badge,
  badgeColor,
  title,
  subtitle,
  text,
  teachingPoint,
  onCopy,
  copiedId,
  customizedVariables = [],
}: PromptCardProps) {
  // Highlight customized terms visually inside the prompt text
  const renderHighlightedText = () => {
    let output = text;
    // Replace customized variables with a highlighted span
    customizedVariables.forEach((val) => {
      // Escape special regex chars
      const escaped = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      output = output.replace(regex, `<span class="highlight-var font-bold bg-[#f59e0b]/20 text-[#b45309] px-1 rounded">${val}</span>`);
    });

    return <code dangerouslySetInnerHTML={{ __html: output }} />;
  };

  return (
    <article className="group relative rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      {badge && (
        <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
          {badge}
        </span>
      )}
      {title && <h2 className="mt-4 text-2xl font-bold">{title}</h2>}
      {subtitle && <p className="mt-1 text-sm text-black/55">{subtitle}</p>}

      {/* Code Area */}
      <div className="relative mt-5">
        <button
          onClick={() => onCopy(text, id)}
          className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          {copiedId === id ? <Check size={13} /> : <Clipboard size={13} />}
          {copiedId === id ? "Copied!" : "Copy"}
        </button>
        <pre className="h-64 overflow-y-auto rounded-lg bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100 whitespace-pre-wrap select-all">
          {customizedVariables.length > 0 ? renderHighlightedText() : text}
        </pre>
      </div>

      {/* Teaching Point */}
      <div className="mt-4 border-l-2 border-zinc-300 pl-4 py-1 text-xs leading-relaxed text-black/60">
        <strong>Teaching point:</strong> {teachingPoint}
      </div>
    </article>
  );
}

function PromptBox({ text, id, onCopy, copiedId }: { text: string; id: string; onCopy: (text: string, id: string) => void; copiedId: string | null }) {
  return (
    <div className="relative">
      <button
        onClick={() => onCopy(text, id)}
        className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
      >
        {copiedId === id ? <Check size={12} /> : <Clipboard size={12} />}
        {copiedId === id ? "Copied!" : "Copy"}
      </button>
      <pre className="rounded bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-100 whitespace-pre-wrap select-all">
        {text}
      </pre>
    </div>
  );
}
