import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useArtist } from '../context/ArtistContext';

const SEO: React.FC = () => {
    const { artist } = useArtist();
    const { seo, theme, content } = artist;
    
    const title = seo.title || `${artist.name} | Official Website`;
    const description = seo.description || content.hero.description.replace(/<[^>]*>?/gm, '');
    const url = seo.canonicalUrl || `https://${artist.domain}`;
    const image = seo.ogImage.startsWith('http') ? seo.ogImage : `https://${artist.domain}${seo.ogImage}`;

    // Collect all social and platform links for sameAs
    const sameAsLinks = [
        ...content.contact.socials.map(s => s.href),
        ...content.music.platforms.map(p => p.href),
        "https://monadelta.me" // Parent organization
    ];

    // Remove duplicates
    const uniqueSameAs = [...new Set(sameAsLinks)];

    // Featured YouTube video for VideoObject schema
    const featuredVideo = content.music.youtubeVideos?.find(v => v.featured);

    // Dynamic JSON-LD structured data - Wikipedia/Knowledge Graph Ready
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MusicGroup",
                "@id": `${url}/#artist`,
                "name": artist.name,
                "alternateName": artist.id === 'lucid-ash' ? ['Lucid ASH', 'Azer'] : ['Ashwin Azer', 'Lucid ASH'],
                "description": description,
                "url": url,
                "image": image,
                "genre": artist.id === 'lucid-ash' 
                    ? ['Alternative R&B', 'Dark Pop', 'Melodic Hip-Hop']
                    : ['Contemporary R&B', 'Melodic Hip-Hop', 'Hip Hop', 'Trap'],
                "foundingDate": "2019",
                "foundingLocation": {
                    "@type": "Place",
                    "name": "India"
                },
                "member": {
                    "@type": "Person",
                    "@id": `${url}/#person`,
                    "name": artist.legalName || "Ashwin Ramesh",
                    "alternateName": ["Ashwin Azer", "Lucid ASH"],
                    "jobTitle": ["Artist", "Producer", "Songwriter"],
                    "nationality": {
                        "@type": "Country",
                        "name": "India"
                    }
                },
                "sameAs": uniqueSameAs,
                "album": [
                    {
                        "@type": "MusicAlbum",
                        "@id": `${url}/#destiny`,
                        "name": "DESTINY",
                        "byArtist": { "@id": `${url}/#artist` },
                        "datePublished": "2025-12-21",
                        "numTracks": 11,
                        "genre": "Contemporary R&B",
                        "url": content.music.featuredAlbum?.url || url
                    }
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "booking",
                    "email": content.contact.management?.email || "ashwinazer@monadelta.com"
                }
            },
            {
                "@type": "Organization",
                "@id": `${url}/#monadelta`,
                "name": "Monadelta Productions",
                "alternateName": "Monadelta",
                "description": "The artist-first music collective founded by Ashwin Azer",
                "url": "https://monadelta.me",
                "foundingDate": "2024",
                "founder": { "@id": `${url}/#person` },
                "sameAs": ["https://instagram.com/themonadelta"]
            },
            {
                "@type": "WebSite",
                "@id": `${url}/#website`,
                "url": url,
                "name": title,
                "description": description,
                "publisher": { "@id": `${url}/#artist` },
                "inLanguage": "en-US",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${url}/?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${url}/#breadcrumbs`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": url },
                    { "@type": "ListItem", "position": 2, "name": "Music", "item": `${url}/#music` },
                    { "@type": "ListItem", "position": 3, "name": "Videos", "item": `${url}/#videos` },
                    { "@type": "ListItem", "position": 4, "name": "Gallery", "item": `${url}/#gallery` },
                    { "@type": "ListItem", "position": 5, "name": "Contact", "item": `${url}/#contact` }
                ]
            },
            ...(featuredVideo ? [{
                "@type": "VideoObject",
                "name": `${featuredVideo.title} - Official Music Video`,
                "description": featuredVideo.description || `Official music video by ${artist.name}`,
                "thumbnailUrl": featuredVideo.thumbnailUrl || `https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`,
                "uploadDate": featuredVideo.year ? `${featuredVideo.year}-01-01` : "2024-01-01",
                "contentUrl": `https://www.youtube.com/watch?v=${featuredVideo.id}`,
                "embedUrl": `https://www.youtube.com/embed/${featuredVideo.id}`
            }] : [])
        ]
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={seo.keywords?.join(', ')} />
            <meta name="theme-color" content={theme.primaryColor} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="music.musician" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={artist.name} />
            <meta property="og:locale" content="en_US" />
            <meta property="music:musician" content={url} />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@theashwinazer" />
            <meta name="twitter:creator" content="@theashwinazer" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
