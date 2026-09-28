import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Disc, Radio, Play, Music as MusicIcon, Calendar, Check } from 'lucide-react';
import { useArtist } from '../context/ArtistContext';

/**
 * Music Section - Ultra-Premium streaming & discography showcase
 * Features THE AZER (Vol. 2) upcoming release teaser, full album catalog, and streaming hubs
 */
const Music: React.FC = () => {
  const { artist } = useArtist();
  const { music } = artist.content;
  const { theme } = artist;
  const [activeFilter, setActiveFilter] = useState<'all' | 'released' | 'upcoming'>('all');

  const filteredAlbums = (music.albums || []).filter(album => {
    if (activeFilter === 'all') return true;
    return album.status === activeFilter;
  });

  return (
    <section id="music" className="py-24 md:py-36 relative overflow-hidden bg-[#060508]">
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[240px] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor} 60%, transparent 80%)` }}
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[200px] opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, #E2B338 0%, transparent 70%)` }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.primaryColor }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.primaryColor }} />
              </span>
              <span 
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: theme.primaryColor }}
              >
                DISCOGRAPHY & RELEASES
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black font-syne tracking-tight mb-4 text-white">
              {music.title}
            </h2>
            <p className="text-white/60 max-w-lg text-base md:text-lg">
              {music.description}
            </p>
          </div>

          {/* Platform Links */}
          <div className="flex flex-wrap items-center gap-2">
            {music.platforms.map((p) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 rounded-full border border-white/10 font-bold tracking-widest text-[10px] flex items-center gap-2 transition-all duration-300 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-white"
              >
                {p.name} <ExternalLink size={10} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* UPCOMING RELEASE SPOTLIGHT: THE AZER (Vol. 2) */}
        {music.upcomingRelease && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 relative rounded-3xl p-[1px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, rgba(255,255,255,0.15), ${theme.gradientTo || theme.primaryColor})`
            }}
          >
            <div className="bg-[#0b0a0e]/95 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
              {/* Subtle background glow element */}
              <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
                style={{ backgroundColor: theme.primaryColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-6">
                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span 
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-[0.25em] uppercase border flex items-center gap-2"
                      style={{ 
                        color: theme.primaryColor,
                        borderColor: `${theme.primaryColor}50`,
                        background: `${theme.primaryColor}15`
                      }}
                    >
                      <Sparkles size={13} />
                      RELEASING OCTOBER 2, 2026
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold tracking-widest uppercase">
                      {music.upcomingRelease.trackCount || 16} BRAND-NEW TRACKS
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono">
                      MONADELTA PRODUCTIONS
                    </span>
                  </div>

                  <div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne tracking-tight text-white leading-tight">
                      {music.upcomingRelease.title}
                    </h3>
                    <p 
                      className="text-base sm:text-lg font-bold font-syne tracking-wide mt-2"
                      style={{ color: theme.primaryColor }}
                    >
                      THE NEXT DEFINITIVE CHAPTER IN THE AZER ODYSSEY
                    </p>
                  </div>

                  <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                    {music.upcomingRelease.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="block text-2xl font-black font-syne text-white">16</span>
                      <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">New Master Tracks</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="block text-2xl font-black font-syne" style={{ color: theme.primaryColor }}>OCT 2</span>
                      <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Global Drop Date</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                      <span className="block text-2xl font-black font-syne text-white">VOL. 2</span>
                      <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Sequel to Vol. 1</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <motion.a
                      href={music.upcomingRelease.presaveUrl || 'https://open.spotify.com/artist/6M1VSmwtcuwS1DnvXTGk7P'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs font-black tracking-widest text-black transition-all shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor})`
                      }}
                    >
                      <Play size={16} fill="#000" />
                      {music.upcomingRelease.ctaText || 'PRESAVE / FOLLOW ON SPOTIFY'}
                    </motion.a>

                    <a
                      href="https://music.apple.com/us/artist/ashwin-azer/1497428225"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-bold tracking-widest text-white/90 border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:border-white/30"
                    >
                      APPLE MUSIC <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Right Visualizer / Teaser Box with Official Cover Art */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm aspect-square rounded-3xl relative overflow-hidden border border-white/20 shadow-2xl group">
                    <img
                      src={music.upcomingRelease.coverUrl || '/images/cover-the-azer-vol-2.webp'}
                      alt={music.upcomingRelease.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono">
                      <span 
                        className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-black shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, #ffffff)` }}
                      >
                        LP · 16 TRACKS
                      </span>
                      <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                        <Disc size={18} className="animate-spin" style={{ animationDuration: '8s' }} />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-black font-syne text-white tracking-wider drop-shadow-md">
                            {music.upcomingRelease.title}
                          </h4>
                          <p className="text-xs font-mono drop-shadow font-bold" style={{ color: theme.primaryColor }}>
                            GLOBAL DROP: OCTOBER 2, 2026
                          </p>
                        </div>
                      </div>

                      {/* Dynamic audio waves overlay */}
                      <div className="w-full flex items-center gap-1 h-3 pt-1">
                        {[40, 75, 100, 60, 90, 45, 80, 50, 95, 70, 40, 85, 60, 90, 50, 75].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-full animate-pulse"
                            style={{
                              height: `${h}%`,
                              backgroundColor: theme.primaryColor,
                              animationDelay: `${i * 0.08}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* OFFICIAL DISCOGRAPHY CATALOG */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span 
                className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-1"
                style={{ color: theme.primaryColor }}
              >
                STUDIO RELEASES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-syne text-white">
                CATALOG & DISCOGRAPHY
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 w-fit">
              {(['all', 'released', 'upcoming'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                    activeFilter === filter
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlbums.map((album, idx) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl p-[1px] overflow-hidden flex flex-col"
                style={{
                  background: album.status === 'upcoming' 
                    ? `linear-gradient(135deg, ${theme.primaryColor}, rgba(255,255,255,0.05))` 
                    : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))'
                }}
              >
                <div className="bg-[#0b0a0e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden">
                  <div>
                    {/* Cover / Vinyl Edge Container */}
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-black/60 border border-white/10 group-hover:border-white/25 transition-all">
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        {album.status === 'upcoming' ? (
                          <span 
                            className="px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase text-black shadow-md flex items-center gap-1"
                            style={{ background: theme.primaryColor }}
                          >
                            <Calendar size={10} />
                            OCT 2, 2026
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-emerald-500/90 text-white shadow-md flex items-center gap-1">
                            <Check size={10} />
                            OUT NOW
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/70">
                        <span>{album.year}</span>
                        <span>{album.trackCount ? `${album.trackCount} TRACKS` : 'ALBUM'}</span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <h4 className="text-xl font-black font-syne text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {album.title}
                    </h4>
                    <p className="text-xs text-white/50 mb-3 font-mono">
                      {album.subtitle || `${album.year} · Official Album`}
                    </p>

                    {/* Highlight Tracks */}
                    {album.highlightTracks && album.highlightTracks.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">
                          Standouts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {album.highlightTracks.slice(0, 3).map(track => (
                            <span key={track} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/70">
                              {track}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Streaming CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
                    <a
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-white hover:text-white/80 transition-colors"
                      style={{ color: album.status === 'upcoming' ? theme.primaryColor : undefined }}
                    >
                      <span>{album.status === 'upcoming' ? 'FOLLOW / PRESAVE' : 'STREAM'}</span>
                      <ExternalLink size={11} />
                    </a>

                    {album.appleMusicUrl && (
                      <a
                        href={album.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-white/40 hover:text-white transition-colors"
                        title="Apple Music"
                      >
                        Apple Music
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Album Hero Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative p-[1px] rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}40, rgba(255,255,255,0.05), ${theme.gradientTo || theme.primaryColor}30)` }}>
            <div className="bg-[#09080c]/95 backdrop-blur-xl rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <span 
                    className="text-[10px] font-bold tracking-[0.3em] mb-2 block"
                    style={{ color: theme.primaryColor }}
                  >STREAMING PLAYER</span>
                  <h3 className="text-3xl md:text-4xl font-black font-syne tracking-tight text-white">{music.featuredAlbum.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{music.featuredAlbum.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                  <MusicIcon size={14} style={{ color: theme.primaryColor }} />
                  <span className="text-[10px] font-bold tracking-widest text-white/80">
                    FULL ALBUM STREAM
                  </span>
                </div>
              </div>
              <iframe
                className="rounded-2xl w-full"
                src={music.featuredAlbum.url}
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={music.featuredAlbum.title}
              />
            </div>
          </div>
        </motion.div>

        {/* Dual Discography: Ashwin Azer & Lucid ASH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Primary Artist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-1.5 h-8 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <div>
                <h4 className="text-xl font-black font-syne text-white">{music.discographyEmbed.title}</h4>
                <p className="text-white/60 text-xs">{music.discographyEmbed.subtitle}</p>
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
              <iframe
                className="rounded-xl w-full"
                src={music.discographyEmbed.url}
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={music.discographyEmbed.title}
              />
            </div>
          </motion.div>

          {/* Alternate Persona */}
          {music.alternateEmbed && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-1.5 h-8 rounded-full"
                  style={{ backgroundColor: theme.gradientTo || theme.primaryColor }}
                />
                <div>
                  <h4 className="text-xl font-black font-syne text-white">{music.alternateEmbed.title}</h4>
                  <p className="text-white/60 text-xs">{music.alternateEmbed.subtitle}</p>
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                <iframe
                  className="rounded-xl w-full"
                  src={music.alternateEmbed.url}
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={music.alternateEmbed.title}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Monadelta Collective Spotlight Card */}
        {music.featured?.find(f => f.type === 'Label') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <div 
                className="text-xs font-bold tracking-[0.25em] mb-2 uppercase"
                style={{ color: theme.primaryColor }}
              >
                THE MOVEMENT
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-syne text-white mb-2">
                {music.featured.find(f => f.type === 'Label')?.title}
              </h3>
              <p className="text-white/60 max-w-xl text-sm md:text-base">
                {music.featured.find(f => f.type === 'Label')?.content}
              </p>
            </div>
            {music.featured.find(f => f.type === 'Label')?.link && (
              <a
                href={music.featured.find(f => f.type === 'Label')?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black tracking-widest transition-all text-black hover:scale-105 shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor})`
                }}
              >
                {music.featured.find(f => f.type === 'Label')?.linkText || 'VISIT MONADELTA →'}
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Music;
