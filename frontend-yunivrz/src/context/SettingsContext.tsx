"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface StudioSettings {
  whatsapp_number: string;
  linkedin_url: string;
  github_url: string;
  instagram_developer: string;
  instagram_business: string;
  email: string;
}

const DEFAULT_SETTINGS: StudioSettings = {
  whatsapp_number: "6285651999928",
  linkedin_url: "https://www.linkedin.com/in/ptryntt",
  github_url: "https://github.com/putriyunitaa",
  instagram_developer: "https://www.instagram.com/ptryntaa_/",
  instagram_business: "https://www.instagram.com/heyyunivrz_/",
  email: "yunivrzstudio@gmail.com",
};

interface SettingsContextType {
  settings: StudioSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  getWhatsAppUrl: (message?: string) => string;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: false,
  refreshSettings: async () => {},
  getWhatsAppUrl: () => `https://wa.me/${DEFAULT_SETTINGS.whatsapp_number}`,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/settings", {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (err) {
      console.error("Gagal memuat pengaturan studio:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getWhatsAppUrl = (message?: string) => {
    // Sanitize WhatsApp number (remove +, spaces, dashes, leading 0 to 62)
    let num = (settings.whatsapp_number || "6285651999928").replace(/[^0-9]/g, "");
    if (num.startsWith("0")) {
      num = "62" + num.slice(1);
    }
    if (message) {
      return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
    }
    return `https://wa.me/${num}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
        getWhatsAppUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
