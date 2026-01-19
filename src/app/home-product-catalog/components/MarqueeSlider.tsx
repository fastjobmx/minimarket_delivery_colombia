'use client';

import { useEffect, useState } from 'react';
import { bannerService, BannerSettings } from '@/services/bannerService';

export default function MarqueeSlider() {
  const [messages, setMessages] = useState<string[]>([]);
  const [settings, setSettings] = useState<BannerSettings>({
    id: '',
    speed: 40,
    background_color: '#10b981',
    text_color: '#ffffff'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBannerData();
  }, []);

  const loadBannerData = async () => {
    try {
      setLoading(true);

      const [messagesResult, settingsResult] = await Promise.all([
        bannerService.getActiveMessages(),
        bannerService.getSettings()
      ]);

      if (!messagesResult.error && messagesResult.data) {
        setMessages(messagesResult.data.map(m => m.text));
      }

      if (!settingsResult.error && settingsResult.data) {
        setSettings(settingsResult.data);
      }
    } catch (err) {
      console.error('Error loading banner data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || messages.length === 0) {
    return null;
  }

  const messageText = messages.join(' • ');

  return (
    <div 
      className="w-full overflow-hidden"
      style={{ backgroundColor: settings.background_color }}
    >
      <div
        className="whitespace-nowrap py-3 px-4 animate-marquee"
        style={{
          animation: `marquee-scroll ${settings.speed}s linear infinite`,
          willChange: 'transform'
        }}
      >
        <span 
          className="inline-block font-medium text-base"
          style={{ color: settings.text_color }}
        >
          {messageText} • {messageText}
        </span>
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}