import { useEffect, useMemo, useState } from 'react'
import { Menu, Search, Star, X, Sparkles } from 'lucide-react'

type Section = 'Home' | 'Viral Hooks' | 'Script Templates' | 'Caption Vault' | 'Hashtag Vault' | 'Creator Academy' | 'Favorites' | 'Contact' | 'Image Generator'

type Resource = { id: string; title: string; category: string; body: string }

const sections: Section[] = ['Home','Viral Hooks','Script Templates','Caption Vault','Hashtag Vault','Creator Academy','Favorites','Contact','Image Generator']

const resources: Resource[] = [
  { id:'hook-1', title:'Business', category:'Business', body:'Start with the problem your audience already wants solved.' },
  { id:'hook-2', title:'Motivation', category:'Motivation', body:'The truth about consistency nobody tells creators.' },
  { id:'script-1', title:'Short Form Story', category:'Storytelling', body:'Hook → tension → turning point → payoff → call to action.' },
  { id:'caption-1', title:'Engagement Caption', category:'Engagement', body:'What would you do if you knew you could not fail?' },
  { id:'hash-1', title:'Creator Collection', category:'TikTok', body:'#ContentCreator #CreatorTips #ContentStrategy' },
  { id:'academy-1', title:'Content Planning', category:'Content Planning', body:'Build a repeatable weekly content system around three core pillars.' },
]

const tips = [
  'Create for one person, not everyone. Specific content is easier to remember.',
  'Your first sentence has one job: make the viewer want the second sentence.',
  'Consistency becomes easier when you build repeatable content formats.',
  'Study what your audience saves and shares, not only what gets views.',
]

export default function App() {
  const [section, setSection] = useState<Section>('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('doni-favorites') || '[]'))
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)])

  useEffect(() => localStorage.setItem('doni-favorites', JSON.stringify(favorites)), [favorites])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return resources.filter(r => !q || `${r.title} ${r.category} ${r.body}`.toLowerCase().includes(q))
  }, [query])

  const toggleFavorite = (id: string) => setFavorites(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  const go = (s: Section) => { setSection(s); setMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}) }

  return <div className="app">
    <header className="header">
      <button className="brand" onClick={() => go('Home')} aria-label="Go home">
        <div className="logo-mark">D</div>
        <div><strong>DONI CREATOR STUDIO</strong><span>Create. Grow. Dominate.</span></div>
      </button>
      <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Open menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    {menuOpen && <nav className="menu">{sections.map(s => <button key={s} onClick={() => go(s)}>{s}</button>)}</nav>}

    <main>
      <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search DONI resources..." /></div>

      {section === 'Home' && <>
        <section className="hero">
          <p className="eyebrow">WELCOME TO DONI CREATOR STUDIO</p>
          <h1>Create Better Content Faster.</h1>
          <p>Your all-in-one creator toolkit designed to help content creators generate better ideas, write faster, stay consistent, and grow their audience.</p>
          <p>Browse Viral Hooks, Script Templates, Captions, Hashtags, and Creator Guides.</p>
        </section>
        <section><h2>Quick Resources</h2><div className="grid">{sections.slice(1,6).map(s => <button className="card nav-card" key={s} onClick={()=>go(s)}><span>{iconFor(s)}</span><h3>{s}</h3><small>Explore resources</small></button>)}</div></section>
        <section className="tip"><Sparkles/><div><small>DAILY CREATOR TIP</small><p>{tip}</p></div></section>
      </>}

      {section !== 'Home' && section !== 'Contact' && section !== 'Favorites' && section !== 'Image Generator' && <Library title={section} resources={filtered} favorites={favorites} toggleFavorite={toggleFavorite}/>} 
      {section === 'Favorites' && <Library title="Favorites" resources={resources.filter(r=>favorites.includes(r.id))} favorites={favorites} toggleFavorite={toggleFavorite}/>} 
      {section === 'Contact' && <section className="panel"><p className="eyebrow">CONTACT</p><h1>DONI CREATOR STUDIO</h1><p>Thank you for using DONI CREATOR STUDIO.</p><a href="mailto:donistudioproduction@gmail.com">donistudioproduction@gmail.com</a></section>}
      {section === 'Image Generator' && <section className="panel"><p className="eyebrow">CREATOR TOOL</p><h1>Image Generator</h1><p>Describe the visual you want to create. This interface is ready for the integrated generation workflow.</p><textarea placeholder="Describe your image..."/><button className="primary"><Sparkles/> Generate Image</button></section>}
    </main>
    <footer>DONI CREATOR STUDIO · Create. Grow. Dominate.</footer>
  </div>
}

function Library({title, resources, favorites, toggleFavorite}:{title:string;resources:Resource[];favorites:string[];toggleFavorite:(id:string)=>void}) {
  return <section><div className="section-head"><div><p className="eyebrow">RESOURCE LIBRARY</p><h1>{title}</h1></div></div><div className="grid">{resources.length ? resources.map(r=><article className="card" key={r.id}><div className="card-top"><span className="pill">{r.category}</span><button className="star" onClick={()=>toggleFavorite(r.id)} aria-label="Favorite"><Star fill={favorites.includes(r.id)?'currentColor':'none'}/></button></div><h3>{r.title}</h3><p>{r.body}</p></article>) : <div className="empty">More content coming in future updates.</div>}</div></section>
}
function iconFor(s: string) { return ({'Viral Hooks':'🎣','Script Templates':'📝','Caption Vault':'💬','Hashtag Vault':'#️⃣','Creator Academy':'📚'} as Record<string,string>)[s] || '✦' }
