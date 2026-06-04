import { useState } from "react";

type Page = "home" | "dashboard";

// ─── Student Dashboard ───────────────────────────────────────────────────────
function StudentDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const rooms = [
    { id: "ia", label: "Intelligence Artificielle", color: "#1A3A8F", icon: "🤖", status: "En cours", link: "https://meet.jit.si/JambuyoAcademy-IA" },
    { id: "prompt", label: "Prompt Engineering", color: "#E8652A", icon: "💡", status: "Programmé", link: "https://meet.jit.si/JambuyoAcademy-Prompt" },
    { id: "excel", label: "Excel & VBA", color: "#2E7D32", icon: "📊", status: "Disponible", link: "https://meet.jit.si/JambuyoAcademy-Excel" },
    { id: "canva", label: "Canva & Créativité", color: "#7B1FA2", icon: "🎨", status: "Disponible", link: "https://meet.jit.si/JambuyoAcademy-Canva" },
    { id: "business", label: "Business English", color: "#00695C", icon: "🌍", status: "Programmé", link: "https://meet.jit.si/JambuyoAcademy-Business" },
    { id: "compta", label: "Comptabilité", color: "#C62828", icon: "📁", status: "Disponible", link: "https://meet.jit.si/JambuyoAcademy-Compta" },
  ];

  const statusColor: Record<string, string> = {
    "En cours": "#22c55e",
    "Programmé": "#f59e0b",
    "Disponible": "#94a3b8",
  };

  return (
    <div className="jb-dashboard">
      <header className="jb-dash-header">
        <div className="jb-brand">
          <img src="/logo-jb.png" alt="Logo" className="jb-brand-mark" />
          <div>
            <strong>JAM'BOUYO</strong>
            <small>Espace Étudiant</small>
          </div>
        </div>
        <div className="jb-dash-user">
          <div className="jb-avatar" style={{ background: "#1A3A8F", color: "#fff" }}>ÉT</div>
          <span>Bienvenue, Étudiant</span>
          <button className="jb-btn jb-btn-outline jb-btn-sm" onClick={onLogout}>Déconnexion</button>
        </div>
      </header>

      <div className="jb-dash-body">
        <div className="jb-dash-welcome">
          <h1>Vos cours en direct <span>🎓</span></h1>
          <p>Rejoignez votre salle de classe virtuelle JAM'BOUYO — partage d'écran, chat, audio/vidéo et accompagnement humain en temps réel.</p>
        </div>

        {activeRoom && (
          <div className="jb-jitsi-embed">
            <div className="jb-jitsi-bar">
              <span>Classe virtuelle — {rooms.find(r => r.id === activeRoom)?.label}</span>
              <button onClick={() => setActiveRoom(null)} className="jb-btn jb-btn-outline jb-btn-sm">✕ Fermer</button>
            </div>
            <iframe
              src={rooms.find(r => r.id === activeRoom)?.link + "#config.prejoinPageEnabled=false"}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              style={{ width: "100%", height: 520, border: "none", borderRadius: "0 0 12px 12px" }}
              title="Classe virtuelle Jitsi Meet"
            />
          </div>
        )}

        <div className="jb-rooms-grid">
          {rooms.map((room) => (
            <div key={room.id} className="jb-room-card">
              <div className="jb-room-icon" style={{ background: room.color + "18", color: room.color }}>{room.icon}</div>
              <div className="jb-room-info">
                <h3>{room.label}</h3>
                <span className="jb-room-status" style={{ color: statusColor[room.status] }}>
                  ● {room.status}
                </span>
              </div>
              <button
                className="jb-btn jb-btn-primary"
                style={{ background: room.color, borderColor: room.color }}
                onClick={() => setActiveRoom(room.id)}
              >
                Rejoindre
              </button>
            </div>
          ))}
        </div>

        <div className="jb-dash-info-cards">
          <div className="jb-info-card">
            <div className="jb-info-icon">📡</div>
            <h4>Classe virtuelle JAM'BOUYO</h4>
            <p>Partage d'écran, chat en temps réel, audio/vidéo, questions interactives et accompagnement humain à chaque session.</p>
          </div>
          <div className="jb-info-card">
            <div className="jb-info-icon">📅</div>
            <h4>Horaires des sessions</h4>
            <p>Retrouvez le calendrier complet de vos cours dans votre email de confirmation d'admission. Notifications WhatsApp avant chaque session.</p>
          </div>
          <div className="jb-info-card">
            <div className="jb-info-icon">💬</div>
            <h4>Besoin d'aide ?</h4>
            <p>L'équipe pédagogique est disponible sur WhatsApp pour toute question technique ou pédagogique.</p>
            <a href="https://wa.me/33784650529" className="jb-btn jb-btn-primary" style={{ marginTop: 12, display: "inline-block" }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      setError("Veuillez remplir tous les champs.");
    }
  }

  return (
    <div className="jb-modal-overlay" onClick={onClose}>
      <div className="jb-modal" onClick={e => e.stopPropagation()}>
        <button className="jb-modal-close" onClick={onClose}>✕</button>
        <img src="/logo-jb.png" alt="Logo" style={{ height: 48, marginBottom: 8 }} />
        <h2>Espace Étudiant</h2>
        <p>Connectez-vous pour accéder à vos cours en direct.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
          <label>Email<input type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} /></label>
          <label>Mot de passe<input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} /></label>
          {error && <p style={{ color: "#E8652A", fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" className="jb-btn jb-btn-primary jb-btn-full">Se connecter</button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#64748b" }}>
          Pas encore de compte ? <a href="#admission" onClick={onClose} style={{ color: "#1A3A8F" }}>Demander l'admission</a>
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const [showLogin, setShowLogin] = useState(false);

  if (page === "dashboard") {
    return <StudentDashboard onLogout={() => setPage("home")} />;
  }

  return (
    <div className="jb-root">

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={() => { setShowLogin(false); setPage("dashboard"); }}
        />
      )}

      {/* ── NAVBAR ── */}
      <header className="jb-navbar">
        <a className="jb-brand" href="#">
          <img src="/logo-jb.png" alt="Logo JAM'BOUYO" className="jb-brand-mark" />
          <div>
            <strong>JAM'BOUYO</strong>
            <small>Academy</small>
          </div>
        </a>
        <nav className={`jb-nav-links${menuOpen ? " open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Accueil</a>
          <a href="#formations" onClick={() => setMenuOpen(false)}>Formations</a>
          <a href="#vision" onClick={() => setMenuOpen(false)}>À propos</a>
          <a href="#admission" onClick={() => setMenuOpen(false)}>Admission</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="jb-nav-actions">
          <button className="jb-btn jb-btn-outline" onClick={() => setShowLogin(true)}>Se connecter</button>
          <a href="#admission" className="jb-btn jb-btn-primary">S'inscrire</a>
        </div>
        <button className="jb-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      <main>

        {/* ── HERO ── */}
        <section id="home" className="jb-hero">
          <div className="jb-hero-bg" />
          <div className="jb-hero-grid" />

          <div className="jb-hero-copy">
            <div className="jb-eyebrow">
              <span className="jb-dot" />
              JAM'BOUYO ACADEMY — Formation Premium
            </div>

            <h1 className="jb-hero-title">
              Formez-vous aux<br />
              compétences qui<br />
              <em>façonnent le monde<br />de demain.</em>
            </h1>

            <p className="jb-hero-subtitle">
              Intelligence Artificielle, Automatisation, Data, Business — des formations
              conçues pour faire de vous un professionnel de demain, dès aujourd'hui.
            </p>

            <div className="jb-director-quote">
              <blockquote>
                "L'intelligence artificielle ouvre des portes infinies, mais seule
                l'intelligence humaine peut leur donner une direction, une vision et une âme."
              </blockquote>
              <cite>— Monsieur Mamadou NDIAYE, Directeur de JAM'BOUYO Academy</cite>
            </div>

            <div className="jb-hero-cta">
              <a href="#admission" className="jb-btn jb-btn-primary jb-btn-lg">Demander l'admission</a>
              <a href="#formations" className="jb-btn jb-btn-ghost jb-btn-lg">Voir les formations</a>
            </div>

            <div className="jb-stats">
              <div className="jb-stat">
                <strong>+500</strong>
                <span>Apprenants accompagnés</span>
              </div>
              <div className="jb-stat">
                <strong>10+</strong>
                <span>Formations professionnelles</span>
              </div>
              <div className="jb-stat">
                <strong>100%</strong>
                <span>Engagement réussite</span>
              </div>
            </div>
          </div>

          <div className="jb-hero-visual">
            <img
              src="/directeur.png"
              alt="Monsieur Mamadou NDIAYE — Directeur JAM'BOUYO Academy"
              className="jb-hero-photo"
            />
            <div className="jb-hero-badge jb-badge-top">
              <div className="jb-badge-icon jb-icon-blue">🎓</div>
              <div>
                <strong>Formations certifiantes</strong>
                <span>Reconnues & actualisées</span>
              </div>
            </div>
            <div className="jb-hero-badge jb-badge-bottom">
              <div className="jb-badge-icon jb-icon-orange">⚡</div>
              <div>
                <strong>Cours en direct</strong>
                <span>Live avec vos formateurs</span>
              </div>
            </div>
          </div>

          <div className="jb-hero-features">
            {[
              { icon: "🎓", title: "Formations de qualité", sub: "Contenu actualisé et certifiant" },
              { icon: "👤", title: "Accompagnement personnalisé", sub: "Un suivi humain à chaque étape" },
              { icon: "📡", title: "Cours en direct interactifs", sub: "Apprenez en temps réel" },
              { icon: "✅", title: "Certifications reconnues", sub: "Validez vos compétences" },
            ].map((f, i) => (
              <div className="jb-feat-item" key={i}>
                <div className="jb-feat-icon">{f.icon}</div>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FORMATIONS ── */}
        <section id="formations" className="jb-section jb-section-alt">
          <div className="jb-section-head">
            <div className="jb-tag">Nos programmes</div>
            <h2>Formations <em>d'excellence</em></h2>
            <p>Des parcours conçus pour développer des compétences immédiatement utiles.</p>
          </div>

          <div className="jb-formations-grid">
            {[
              { num: "01", badge: "Populaire", badgeClass: "popular", title: "Intelligence Artificielle", desc: "Maîtrisez les outils d'IA générative pour gagner en productivité et créer de nouvelles opportunités." },
              { num: "02", badge: "Premium", badgeClass: "premium", title: "Prompt Engineering", desc: "Apprenez à piloter ChatGPT, Claude et Gemini avec des prompts professionnels percutants." },
              { num: "03", badge: "Créatif", badgeClass: "creative", title: "Canva", desc: "Créez des visuels, supports de formation et contenus marketing modernes sans être graphiste." },
              { num: "04", badge: "Essentiel", badgeClass: "essential", title: "Excel", desc: "Formules, tableaux croisés, analyse de données, productivité et reporting professionnel." },
              { num: "05", badge: "Avancé", badgeClass: "advanced", title: "VBA Excel", desc: "Automatisez vos tâches répétitives et créez des outils performants avec les macros Excel." },
              { num: "06", badge: "Business", badgeClass: "business", title: "Comptabilité", desc: "Bases, logique comptable et pratique professionnelle pour entreprises et indépendants." },
              { num: "07", badge: "Langue", badgeClass: "langue", title: "Anglais", desc: "Renforcez votre communication orale et écrite pour un usage professionnel quotidien." },
              { num: "08", badge: "Carrière", badgeClass: "business", title: "Business English", desc: "Anglais professionnel pour réunions, emails et carrière internationale." },
              { num: "09", badge: "Entrepreneuriat", badgeClass: "popular", title: "Création d'entreprise", desc: "Structurez votre idée, construisez un business model solide et lancez-vous avec méthode." },
              { num: "10", badge: "Finance", badgeClass: "essential", title: "Banque & Assurance", desc: "Comprendre les produits financiers, la relation client et le secteur bancaire." },
            ].map((f, i) => (
              <div className="jb-formation-card" key={i}>
                <span className="jb-card-num">{f.num}</span>
                <div className={`jb-card-badge jb-badge-${f.badgeClass}`}>{f.badge}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <a href="#admission" className="jb-card-link">Demander l'admission →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── COURS EN DIRECT CTA ── */}
        <section id="live" className="jb-section jb-section-live">
          <div className="jb-live-cta-inner">
            <div className="jb-tag jb-tag-live">
              <span className="jb-live-dot" />
              COURS EN DIRECT — LIVE SESSIONS JITSI MEET
            </div>
            <h2>Classe virtuelle <em>JAM'BOUYO</em></h2>
            <p>
              Les étudiants acceptés peuvent rejoindre les salles de cours depuis leur dashboard.<br />
              Partage d'écran, chat, audio/vidéo, accompagnement humain.
            </p>
            <div className="jb-live-cta-actions">
              <button className="jb-btn jb-btn-orange jb-btn-lg" onClick={() => setShowLogin(true)}>
                Accéder à mon espace étudiant
              </button>
            </div>
          </div>
        </section>

        {/* ── POURQUOI JAM'BOUYO ── */}
        <section className="jb-section jb-section-white">
          <div className="jb-why-grid">
            <div className="jb-why-visual">
              <img src="/jb-vision.png" alt="Vision JAM'BOUYO" className="jb-why-img" />
              <div className="jb-why-float">
                <strong>500+</strong>
                <span>Apprenants déjà formés</span>
              </div>
            </div>
            <div className="jb-why-text">
              <div className="jb-tag">Pourquoi nous choisir</div>
              <h2>Une académie qui mise sur<br /><em>l'humain avant tout.</em></h2>
              <p className="jb-why-intro">
                Chez JAM'BOUYO Academy, chaque apprenant bénéficie d'un suivi personnalisé,
                de cas pratiques réels et d'une communauté engagée.
              </p>
              <div className="jb-why-items">
                {[
                  { icon: "🎯", cls: "blue", title: "Accompagnement personnalisé", desc: "Un suivi humain à chaque étape de votre parcours, du premier cours à la certification." },
                  { icon: "💼", cls: "orange", title: "Cas pratiques métiers", desc: "Des exercices concrets tirés de situations professionnelles réelles, appliquables dès demain." },
                  { icon: "🏆", cls: "violet", title: "Certification reconnue", desc: "Validez vos compétences avec une attestation professionnelle valorisable sur votre CV." },
                  { icon: "🔄", cls: "green", title: "Contenus mis à jour", desc: "Formations actualisées en continu pour rester au niveau des dernières évolutions." },
                ].map((w, i) => (
                  <div className="jb-why-item" key={i}>
                    <div className={`jb-why-icon jb-icon-${w.cls}`}>{w.icon}</div>
                    <div>
                      <h4>{w.title}</h4>
                      <p>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION ── */}
        <section id="vision" className="jb-section jb-vision-section">
          <div className="jb-vision-inner">
            <div className="jb-vision-text">
              <div className="jb-tag jb-tag-dark">Notre vision</div>
              <h2>Une académie humaine,<br /><em>augmentée par la technologie.</em></h2>
              <p>
                Chez JAM'BOUYO Academy, l'intelligence artificielle n'est pas une fin.
                C'est un levier puissant au service de la créativité, de l'ambition,
                de l'apprentissage et de la transformation professionnelle.
              </p>
              <div className="jb-pillars">
                {[["01", "Former"], ["02", "Innover"], ["03", "Élever"]].map(([n, l]) => (
                  <div className="jb-pillar" key={n}>
                    <strong>{n}</strong>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
              <a href="#admission" className="jb-btn-white">Rejoindre l'académie →</a>
            </div>
            <div className="jb-vision-img-wrap">
              <img src="/directeur.png" alt="Directeur JAM'BOUYO" className="jb-vision-img" />
              <div className="jb-vision-frame" />
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="jb-section jb-section-alt">
          <div className="jb-section-head">
            <div className="jb-tag">Témoignages</div>
            <h2>Ce que disent nos <em>apprenants</em></h2>
            <p>Des professionnels, étudiants et entrepreneurs qui ont transformé leur carrière.</p>
          </div>
          <div className="jb-testi-grid">
            {[
              { initials: "AK", name: "Aminata Kouyaté", role: "Assistante RH, Dakar", quote: "La formation IA m'a permis de gagner 3h par jour sur mes tâches répétitives. Le suivi personnalisé fait vraiment la différence." },
              { initials: "MB", name: "Moussa Baldé", role: "Contrôleur de gestion, Abidjan", quote: "Excellente formation en VBA Excel. Les exercices pratiques correspondent parfaitement aux besoins en entreprise. Je recommande vivement." },
              { initials: "FD", name: "Fatou Diallo", role: "Créatrice de contenu, Paris", quote: "Le Prompt Engineering m'a ouvert des opportunités freelance incroyables. La méthode pédagogique est claire, progressive et immédiatement applicable." },
            ].map((t, i) => (
              <div className="jb-testi-card" key={i}>
                <div className="jb-stars">★★★★★</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="jb-author">
                  <div className="jb-avatar">{t.initials}</div>
                  <div>
                    <div className="jb-author-name">{t.name}</div>
                    <div className="jb-author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ADMISSION ── */}
        <section id="admission" className="jb-section jb-section-white">
          <div className="jb-admission-grid">
            <div className="jb-admission-left">
              <div className="jb-tag">Admission ouverte</div>
              <h2>Rejoignez une formation<br />premium et accessible.</h2>
              <p>
                Pas de paiement automatique sur le site. Notre service admission vous contacte
                directement pour expliquer les modalités et valider votre parcours.
              </p>
              <div className="jb-steps">
                {[
                  { n: "01", title: "Candidature simple", sub: "Créez votre compte ou faites une demande." },
                  { n: "02", title: "Contact admission", sub: "Échange par WhatsApp, email ou téléphone." },
                  { n: "03", title: "Accès au cours", sub: "Une fois accepté, votre espace est activé." },
                ].map((s) => (
                  <div className="jb-step" key={s.n}>
                    <div className="jb-step-num">{s.n}</div>
                    <div>
                      <h4>{s.title}</h4>
                      <span>{s.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="jb-form-card">
              <h3>Demande d'admission</h3>
              <div className="jb-two-cols">
                <label>Prénom<input type="text" placeholder="Votre prénom" /></label>
                <label>Nom<input type="text" placeholder="Votre nom" /></label>
              </div>
              <label>Email<input type="email" placeholder="votre@email.com" /></label>
              <label>Téléphone<input type="tel" placeholder="indicatif pays + numéro de téléphone" /></label>
              <label>Formation choisie
                <select>
                  <option>— Sélectionner —</option>
                  <option>Intelligence Artificielle</option>
                  <option>Prompt Engineering</option>
                  <option>Canva</option>
                  <option>Excel</option>
                  <option>VBA Excel</option>
                  <option>Comptabilité</option>
                  <option>Anglais</option>
                  <option>Business English</option>
                  <option>Création d'entreprise</option>
                  <option>Banque & Assurance</option>
                </select>
              </label>
              <label>Message optionnel<textarea rows={3} placeholder="Votre objectif, disponibilité, niveau..." /></label>
              <button className="jb-btn jb-btn-primary jb-btn-full">Envoyer ma demande</button>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="jb-section jb-section-alt">
          <div className="jb-contact-card">
            <div className="jb-tag" style={{ justifyContent: "center", marginBottom: 16 }}>Contact</div>
            <h2>Admission & Informations</h2>
            <p>Pour les admissions, programmes et cours en direct, contactez l'équipe JAM'BOUYO Academy. Nous répondons rapidement.</p>
            <div className="jb-contact-actions">
              <a href="https://wa.me/33784650529" className="jb-btn jb-btn-primary jb-btn-lg">💬 WhatsApp</a>
              <a href="mailto:contact@jam-bouyo.com" className="jb-btn jb-btn-outline jb-btn-lg">contact@jam-bouyo.com</a>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="jb-footer">
        <div className="jb-footer-grid">
          <div className="jb-footer-brand">
            <img src="/logo-jb.png" alt="JAM'BOUYO Academy" />
            <strong>JAM'BOUYO</strong>
            <small>Academy</small>
            <p>Plateforme de formation premium en IA, Automatisation, Data et Compétences professionnelles.</p>
            <div className="jb-socials">
              {["in", "tw", "fb", "yt"].map(s => <a key={s} href="#" className="jb-social">{s}</a>)}
            </div>
          </div>
          <div className="jb-footer-col">
            <h4>Formations</h4>
            <ul>
              {["Intelligence Artificielle", "Prompt Engineering", "VBA Excel", "Data & Analyse", "Business English", "Création d'entreprise"].map(f => (
                <li key={f}><a href="#formations">{f}</a></li>
              ))}
            </ul>
          </div>
          <div className="jb-footer-col">
            <h4>Académie</h4>
            <ul>
              {["À propos", "Notre méthode", "Admissions", "Cours en direct", "Témoignages", "Contact"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="jb-footer-col">
            <h4>Contact</h4>
            <p className="jb-footer-contact">
              📧 <a href="mailto:contact@jam-bouyo.com">contact@jam-bouyo.com</a><br /><br />
              💬 <a href="https://wa.me/33784650529">WhatsApp</a>
            </p>
          </div>
        </div>
        <div className="jb-footer-bottom">
          <p>© 2026 JAM'BOUYO Academy. Tous droits réservés. Formation • Innovation • Excellence</p>
          <div className="jb-footer-links">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">CGU</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a className="jb-wa-float" href="https://wa.me/33784650529" target="_blank" rel="noopener noreferrer">
        <div className="jb-wa-icon">✆</div>
        <strong>Admission & Informations</strong>
      </a>

    </div>
  );
}
