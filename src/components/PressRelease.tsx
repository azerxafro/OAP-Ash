import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Copy, Check, Share2, Tag, Calendar, MapPin } from 'lucide-react';
import { useArtist } from '../context/ArtistContext';

/**
 * PressRelease Component - Premium Press & Media Release Section
 * Showcases official statements and announcements with copy functionality
 */
const PressRelease: React.FC = () => {
  const { artist } = useArtist();
  const { press } = artist.content;
  const { theme } = artist;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!press || !press.releases || press.releases.length === 0) {
    return null;
  }

  const handleCopyText = (id: string, title: string, dateline: string, paragraphs: string[]) => {
    const fullText = `${title.toUpperCase()}\n\n${dateline} — ${paragraphs.join('\n\n')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="press" className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#050505]">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-40"
        style={{ background: `radial-gradient(circle, ${theme.primaryColor}20, transparent)` }}
      />
      <div
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle, ${theme.gradientTo || theme.primaryColor}15, transparent)` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <Newspaper size={14} style={{ color: theme.primaryColor }} />
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
              OFFICIAL MEDIA STATEMENT
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black font-syne tracking-tight mb-4">
            {press.title || 'PRESS RELEASES'}
          </h2>
          {press.description && (
            <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              {press.description}
            </p>
          )}
        </motion.div>

        {/* Press Releases List */}
        <div className="space-y-12">
          {press.releases.map((item, idx) => (
            <motion.article
              key={item.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative rounded-2xl p-[1px] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}40, rgba(255,255,255,0.05), ${theme.gradientTo || theme.primaryColor}20)`
              }}
            >
              <div className="bg-[#0a0806]/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl relative border border-white/5 space-y-8">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs text-white/60">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 font-bold tracking-widest text-white/90 uppercase px-3 py-1 rounded-md bg-white/5 border border-white/10">
                      <MapPin size={12} style={{ color: theme.primaryColor }} />
                      {item.dateline}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium tracking-wider">
                      <Calendar size={12} className="text-white/40" />
                      {item.date}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopyText(item.id, item.title, item.dateline, item.content)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10"
                      style={{
                        color: copiedId === item.id ? theme.primaryColor : 'white'
                      }}
                      aria-label="Copy press release text"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={14} style={{ color: theme.primaryColor }} />
                          <span>COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>COPY STATEMENT</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Press Release Title */}
                <h3 className="text-2xl md:text-4xl font-black font-syne tracking-tight text-white leading-snug group-hover:text-white/95 transition-colors">
                  {item.title}
                </h3>

                {/* Body Content */}
                <div className="space-y-6 text-white/80 text-base md:text-lg leading-relaxed font-normal">
                  {item.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="first-letter:text-3xl first-letter:font-black first-letter:font-syne first-letter:mr-1" style={{
                      firstLetterColor: pIdx === 0 ? theme.primaryColor : 'inherit'
                    }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags & Footer */}
                {item.tags && item.tags.length > 0 && (
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                    <Tag size={13} className="text-white/40 mr-1" />
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Media Kit CTA / Contact Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] backdrop-blur-md"
        >
          <p className="text-sm font-bold tracking-widest text-white/70 mb-2 uppercase">
            MEDIA INQUIRIES & PRESS KITS
          </p>
          <p className="text-xs text-white/50 max-w-md mx-auto mb-6">
            For interview requests, promotional assets, or high-res photography, contact the MonaDelta media desk.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest text-black transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor})`
            }}
          >
            <Share2 size={14} />
            REACH PRESS TEAM
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PressRelease;
