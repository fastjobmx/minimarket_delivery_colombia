import { supabase } from '@/lib/supabase';

export interface BannerMessage {
  id: string;
  text: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BannerSettings {
  id: string;
  speed: number;
  background_color: string;
  text_color: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Banner Service
 * Handles all banner-related database operations
 */
export const bannerService = {
  /**
   * Get all banner messages
   */
  async getMessages(): Promise<{ data: BannerMessage[] | null; error: any }> {
    const { data, error } = await supabase
      .from('banner_messages')
      .select('*')
      .order('display_order', { ascending: true });

    return { data, error };
  },

  /**
   * Get active banner messages only
   */
  async getActiveMessages(): Promise<{ data: BannerMessage[] | null; error: any }> {
    const { data, error } = await supabase
      .from('banner_messages')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return { data, error };
  },

  /**
   * Get banner settings
   */
  async getSettings(): Promise<{ data: BannerSettings | null; error: any }> {
    const { data, error } = await supabase
      .from('banner_settings')
      .select('*')
      .limit(1)
      .single();

    return { data, error };
  },

  /**
   * Create a new banner message
   */
  async createMessage(message: Omit<BannerMessage, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: BannerMessage | null; error: any }> {
    const { data, error } = await supabase
      .from('banner_messages')
      .insert([message])
      .select()
      .single();

    return { data, error };
  },

  /**
   * Update an existing banner message
   */
  async updateMessage(id: string, updates: Partial<BannerMessage>): Promise<{ data: BannerMessage | null; error: any }> {
    const { data, error } = await supabase
      .from('banner_messages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Delete a banner message
   */
  async deleteMessage(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('banner_messages')
      .delete()
      .eq('id', id);

    return { error };
  },

  /**
   * Update banner settings
   */
  async updateSettings(updates: Partial<BannerSettings>): Promise<{ data: BannerSettings | null; error: any }> {
    // First, get the settings ID
    const { data: currentSettings } = await supabase
      .from('banner_settings')
      .select('id')
      .limit(1)
      .single();

    if (!currentSettings?.id) {
      return { data: null, error: new Error('Settings not found') };
    }

    const { data, error } = await supabase
      .from('banner_settings')
      .update(updates)
      .eq('id', currentSettings.id)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Reorder banner messages
   */
  async reorderMessages(messages: { id: string; display_order: number }[]): Promise<{ error: any }> {
    const updates = messages.map((msg) =>
      supabase
        .from('banner_messages')
        .update({ display_order: msg.display_order })
        .eq('id', msg.id)
    );

    try {
      await Promise.all(updates);
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};