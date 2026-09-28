import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Copy, Check, Share2, Tag, Calendar, MapPin, Award, ExternalLink, Download, Maximize2, X, ShieldCheck } from 'lucide-react';
import { useArtist } from '../context/ArtistContext';

/**
 * PressRelease Component - Premium Press, Media & Accolades Section
 * Features official statements, WallMag Magazine recognition, verified credentials & certificate modal
 */
const PressRelease: React.FC = () => {
  const { artist } = useArtist();
  const { press, awards } = artist.content;
  const { theme } = artist;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCred, setCopiedCred] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyText = (id: string, title: string, dateline: string, paragraphs: string[]) => {
    const fullText = `${title.toUpperCase()}\n\n${dateline} — ${paragraphs.join('\n\n')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyCredential = (credId: string) => {
    navigator.clipboard.writeText(credId);
    setCopiedCred(true);
    setTimeout(() => setCopiedCred(false), 2500);
  };

  const featuredAward = awards && awards.length > 0 ? awards[0] : null;

  return (
    <section id="press" className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#060508]">
      {/* Background Radial Glows */}
      <div
        className="absolute top-1/4 right-5 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle, ${theme.primaryColor}30, transparent 70%)` }}
      />
      <div
        className="absolute bottom-10 left-5 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-25"
        style={{ background: `radial-gradient(circle, ${theme.gradientTo || theme.primaryColor}20, transparent 70%)` }}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-6"
          >
            <Newspaper size={14} style={{ color: theme.primaryColor }} />
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
              OFFICIAL MEDIA & ACCOLADES
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black font-syne tracking-tight mb-4">
            {press?.title || 'PRESS & ACCOLADES'}
          </h2>
          {press?.description && (
            <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              {press.description}
            </p>
          )}
        </motion.div>

        {/* Featured Award / WallMag Recognition Spotlight */}
        {featuredAward && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 relative rounded-3xl p-[1px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, rgba(255,255,255,0.1), ${theme.gradientTo || theme.primaryColor}50)`
            }}
          >
            <div className="bg-[#0b0a0e]/95 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
              {/* Decorative Corner Glow */}
              <div 
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-40"
                style={{ backgroundColor: theme.primaryColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Certificate Graphic Preview with click-to-zoom */}
                <div className="lg:col-span-5 relative group">
                  <div 
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/40"
                    style={{
                      boxShadow: `0 20px 50px -10px ${theme.primaryColor}25`
                    }}
                  >
                    <img
                      src={featuredAward.certificateUrl || '/images/wallmag-rap-awards-2026-certificate.webp'}
                      alt="WallMag Rap Awards 2026 Certificate of Achievement - Ashwin Azer"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-md">
                        <Maximize2 size={22} style={{ color: theme.primaryColor }} />
                      </div>
                      <span className="text-xs font-bold tracking-widest uppercase">Click to Inspect Certificate</span>
                    </div>

                    {/* Rank Badge Ribbon */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-black flex items-center gap-1.5 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, #ffffff)` }}
                    >
                      <Award size={12} />
                      TOP 250 CREATORS
                    </div>
                  </div>

                  <p className="text-center text-[11px] text-white/40 mt-3 font-mono">
                    Official WallMag Creator Awards 2026 • Verified Credential
                  </p>
                </div>

                {/* Right: Accolade Details & Verified Credential */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span 
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border flex items-center gap-1.5"
                      style={{ 
                        color: theme.primaryColor,
                        borderColor: `${theme.primaryColor}40`,
                        background: `${theme.primaryColor}10`
                      }}
                    >
                      <Award size={13} />
                      JURY HONORS · 2026
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold tracking-widest uppercase">
                      {featuredAward.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne tracking-tight text-white leading-tight">
                      {featuredAward.event}
                    </h3>
                    <p 
                      className="text-lg md:text-xl font-bold font-syne mt-2"
                      style={{ color: theme.primaryColor }}
                    >
                      {featuredAward.achievement}
                    </p>
                  </div>

                  <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                    {featuredAward.description}
                  </p>

                  {/* Verified Digital Credential Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={18} style={{ color: theme.primaryColor }} />
                        <span className="text-xs font-bold tracking-wider text-white uppercase">
                          VERIFIED DIGITAL CREDENTIAL
                        </span>
                      </div>
                      <span className="text-[10px] text-white/50 font-mono">
                        ISSUED BY WALLMAG GLOBAL
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-white/80">
                      <span className="truncate max-w-xs md:max-w-md">
                        ID: <strong className="text-white font-semibold">{featuredAward.credentialId}</strong>
                      </span>
                      <button
                        onClick={() => handleCopyCredential(featuredAward.credentialId || '')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all bg-white/10 hover:bg-white/20 text-white"
                        aria-label="Copy credential ID"
                      >
                        {copiedCred ? (
                          <>
                            <Check size={12} style={{ color: theme.primaryColor }} />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>COPY ID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-white/50">
                      <span>• Sunil Sharma (Strategic Alliance)</span>
                      <span>• Ajeet Kumar Meena (Founder & CEO)</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black tracking-widest text-black transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor})`
                      }}
                    >
                      <Maximize2 size={14} />
                      VIEW CERTIFICATE
                    </button>

                    {featuredAward.pdfUrl && (
                      <a
                        href={featuredAward.pdfUrl}
                        download="Ashwin_Azer_WallMag_Rap_Awards_2026_Certificate.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-widest text-white/90 border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:border-white/30"
                      >
                        <Download size={14} />
                        DOWNLOAD PDF
                      </a>
                    )}

                    <a
                      href="https://wallmag.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-bold tracking-wider text-white/50 hover:text-white transition-colors"
                    >
                      <span>WALLMAG.IO</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Press Releases List */}
        <div className="space-y-12">
          {press?.releases?.map((item, idx) => (
            <motion.article
              key={item.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative rounded-3xl p-[1px] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}35, rgba(255,255,255,0.04), ${theme.gradientTo || theme.primaryColor}15)`
              }}
            >
              <div className="bg-[#09080c]/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative border border-white/5 space-y-8">
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
                    <p key={pIdx} className="leading-relaxed">
                      {pIdx === 0 ? (
                        <>
                          <span 
                            className="text-3xl font-black font-syne mr-1 float-left leading-none"
                            style={{ color: theme.primaryColor }}
                          >
                            {paragraph.charAt(0)}
                          </span>
                          {paragraph.slice(1)}
                        </>
                      ) : (
                        paragraph
                      )}
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
          className="mt-16 text-center p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] backdrop-blur-md"
        >
          <p className="text-sm font-bold tracking-widest text-white/80 mb-2 uppercase">
            MEDIA INQUIRIES & PRESS KITS
          </p>
          <p className="text-xs text-white/50 max-w-md mx-auto mb-6">
            For interview requests, credential verification, promotional assets, or high-res photography, contact the MonaDelta media desk.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-black tracking-widest text-black transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.primaryColor})`
            }}
          >
            <Share2 size={14} />
            REACH PRESS TEAM
          </a>
        </motion.div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && featuredAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0b10] border border-white/20 p-6 md:p-8 shadow-2xl"
              style={{
                boxShadow: `0 0 80px ${theme.primaryColor}30`
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all z-20"
                aria-label="Close certificate modal"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pr-12">
                <div>
                  <span 
                    className="text-[10px] font-black tracking-[0.3em] uppercase block mb-1"
                    style={{ color: theme.primaryColor }}
                  >
                    OFFICIAL VERIFIED CERTIFICATE
                  </span>
                  <h4 className="text-2xl font-black font-syne text-white">
                    {featuredAward.title}
                  </h4>
                </div>
                {featuredAward.pdfUrl && (
                  <a
                    href={featuredAward.pdfUrl}
                    download="Ashwin_Azer_WallMag_Rap_Awards_2026_Certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider text-black bg-white hover:bg-white/90 transition-all"
                  >
                    <Download size={14} />
                    DOWNLOAD PDF
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex justify-center">
                <img
                  src={featuredAward.certificateUrl || '/images/wallmag-rap-awards-2026-certificate.webp'}
                  alt="WallMag Rap Awards 2026 Certificate of Achievement"
                  className="max-h-[68vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
                <div>
                  <span>Credential ID: </span>
                  <span className="text-white font-bold">{featuredAward.credentialId}</span>
                </div>
                <div>
                  <span>Status: </span>
                  <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN & REGISTRY</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PressRelease;
