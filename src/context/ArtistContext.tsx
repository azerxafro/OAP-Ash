import React, { createContext, useContext, ReactNode } from 'react';
import { ArtistData } from '../types/content';
import { lucidAshData } from '../data/lucidAsh';

interface ArtistContextType {
  artist: ArtistData;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // EPK site always uses lucidAshData (press.ashwinazer.rocks)
  // Artist site served from separate repo: azerxafro/artist-ashwinazer
  const artist = lucidAshData;

  return (
    <ArtistContext.Provider value={{ artist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};
