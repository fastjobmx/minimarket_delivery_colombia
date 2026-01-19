'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { bannerService, BannerMessage, BannerSettings } from '@/services/bannerService';

interface BannerManagerProps {
  onSaveSuccess: (message: string) => void;
}

export default function BannerManager({ onSaveSuccess }: BannerManagerProps) {
  const [messages, setMessages] = useState<BannerMessage[]>([]);
  const [settings, setSettings] = useState<BannerSettings>({
    id: '',
    speed: 40,
    background_color: '#10b981',
    text_color: '#ffffff'
  });
  const [editingMessage, setEditingMessage] = useState<BannerMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load banner data on mount
  useEffect(() => {
    loadBannerData();
  }, []);

  const loadBannerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [messagesResult, settingsResult] = await Promise.all([
        bannerService.getMessages(),
        bannerService.getSettings()
      ]);

      if (messagesResult.error) {
        setError('Error al cargar mensajes: ' + messagesResult.error.message);
        return;
      }

      if (settingsResult.error) {
        setError('Error al cargar configuración: ' + settingsResult.error.message);
        return;
      }

      setMessages(messagesResult.data || []);
      if (settingsResult.data) {
        setSettings(settingsResult.data);
      }
    } catch (err: any) {
      setError('Error al cargar datos del banner: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMessage = () => {
    setEditingMessage({
      id: '',
      text: '',
      is_active: true,
      display_order: messages.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEditMessage = (message: BannerMessage) => {
    setEditingMessage(message);
    setIsModalOpen(true);
  };

  const handleSaveMessage = async () => {
    if (!editingMessage || !editingMessage.text.trim()) return;

    try {
      setError(null);

      if (editingMessage.id) {
        // Update existing message
        const { error } = await bannerService.updateMessage(editingMessage.id, {
          text: editingMessage.text,
          is_active: editingMessage.is_active
        });

        if (error) {
          setError('Error al actualizar mensaje: ' + error.message);
          return;
        }

        setMessages(messages.map((m) => m.id === editingMessage.id ? { ...m, ...editingMessage } : m));
        onSaveSuccess('Mensaje actualizado exitosamente');
      } else {
        // Create new message
        const { data, error } = await bannerService.createMessage({
          text: editingMessage.text,
          is_active: editingMessage.is_active,
          display_order: messages.length + 1
        });

        if (error) {
          setError('Error al crear mensaje: ' + error.message);
          return;
        }

        if (data) {
          setMessages([...messages, data]);
          onSaveSuccess('Mensaje creado exitosamente');
        }
      }

      setIsModalOpen(false);
      setEditingMessage(null);
    } catch (err: any) {
      setError('Error al guardar mensaje: ' + err.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      setError(null);
      const { error } = await bannerService.deleteMessage(id);

      if (error) {
        setError('Error al eliminar mensaje: ' + error.message);
        return;
      }

      setMessages(messages.filter((m) => m.id !== id));
      onSaveSuccess('Mensaje eliminado exitosamente');
    } catch (err: any) {
      setError('Error al eliminar mensaje: ' + err.message);
    }
  };

  const handleToggleActive = async (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (!message) return;

    try {
      setError(null);
      const { error } = await bannerService.updateMessage(id, {
        is_active: !message.is_active
      });

      if (error) {
        setError('Error al actualizar estado: ' + error.message);
        return;
      }

      setMessages(
        messages.map((m) =>
          m.id === id ? { ...m, is_active: !m.is_active } : m
        )
      );
      onSaveSuccess('Estado del mensaje actualizado');
    } catch (err: any) {
      setError('Error al actualizar estado: ' + err.message);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newMessages = [...messages];
    [newMessages[index - 1], newMessages[index]] = [newMessages[index], newMessages[index - 1]];
    
    const reorderData = newMessages.map((msg, idx) => ({
      id: msg.id,
      display_order: idx + 1
    }));

    try {
      setError(null);
      const { error } = await bannerService.reorderMessages(reorderData);

      if (error) {
        setError('Error al reordenar mensajes: ' + error.message);
        return;
      }

      setMessages(newMessages.map((msg, idx) => ({ ...msg, display_order: idx + 1 })));
    } catch (err: any) {
      setError('Error al reordenar mensajes: ' + err.message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === messages.length - 1) return;

    const newMessages = [...messages];
    [newMessages[index], newMessages[index + 1]] = [newMessages[index + 1], newMessages[index]];
    
    const reorderData = newMessages.map((msg, idx) => ({
      id: msg.id,
      display_order: idx + 1
    }));

    try {
      setError(null);
      const { error } = await bannerService.reorderMessages(reorderData);

      if (error) {
        setError('Error al reordenar mensajes: ' + error.message);
        return;
      }

      setMessages(newMessages.map((msg, idx) => ({ ...msg, display_order: idx + 1 })));
    } catch (err: any) {
      setError('Error al reordenar mensajes: ' + err.message);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setError(null);
      const { error } = await bannerService.updateSettings({
        speed: settings.speed,
        background_color: settings.background_color,
        text_color: settings.text_color
      });

      if (error) {
        setError('Error al guardar configuración: ' + error.message);
        return;
      }

      onSaveSuccess('Configuración de banner guardada exitosamente');
    } catch (err: any) {
      setError('Error al guardar configuración: ' + err.message);
    }
  };

  const activeMessages = messages.filter(m => m.is_active).map(m => m.text);
  const messageText = activeMessages.join(' • ');

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando configuración del banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-red-600 font-medium">Error</p>
            <p className="text-sm text-red-600/80 mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold">Gestión de Banner de Texto</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Administra los mensajes del banner con control de velocidad y colores
          </p>
        </div>
        <button
          onClick={handleAddMessage}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          <PlusIcon className="h-5 w-5" />
          Nuevo Mensaje
        </button>
      </div>

      {/* Banner Settings */}
      <div className="bg-background border border-border rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Configuración del Banner</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Velocidad de Desplazamiento (segundos)
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={settings.speed}
              onChange={(e) => setSettings({ ...settings, speed: parseInt(e.target.value) || 40 })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Entre 10-100 segundos (recomendado: 40)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color de Fondo</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.background_color}
                onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                className="w-16 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.background_color}
                onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
                placeholder="#10b981"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color de Texto</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.text_color}
                onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                className="w-16 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.text_color}
                onChange={(e) => setSettings({ ...settings, text_color: e.target.value })}
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
          >
            Guardar Configuración
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-background border border-border rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Vista Previa en Vivo</h3>
        <div 
          className="w-full overflow-hidden rounded-xl"
          style={{ backgroundColor: settings.background_color }}
        >
          <div
            className="whitespace-nowrap py-4 px-4 animate-marquee"
            style={{
              animation: `marquee-scroll ${settings.speed}s linear infinite`,
              willChange: 'transform'
            }}
          >
            <span 
              className="inline-block font-medium text-lg"
              style={{ color: settings.text_color }}
            >
              {messageText || 'Agrega mensajes para ver la vista previa'} • {messageText}
            </span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Mensajes del Banner</h3>
        {messages.length === 0 ? (
          <div className="bg-muted/50 rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No hay mensajes. Crea uno para comenzar.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`bg-background border rounded-xl p-4 transition-all ${
                message.is_active ? 'border-border' : 'border-border opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <p className={`text-base ${message.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {message.text}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-30"
                    title="Mover arriba"
                  >
                    <ArrowUpIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === messages.length - 1}
                    className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-30"
                    title="Mover abajo"
                  >
                    <ArrowDownIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleActive(message.id)}
                    className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                      message.is_active
                        ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {message.is_active ? 'Activo' : 'Inactivo'}
                  </button>
                  <button
                    onClick={() => handleEditMessage(message)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Editar"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-heading font-bold mb-6">
              {editingMessage.id ? 'Editar' : 'Nuevo'} Mensaje
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Texto del Mensaje</label>
                <textarea
                  value={editingMessage.text}
                  onChange={(e) =>
                    setEditingMessage({ ...editingMessage, text: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg min-h-[100px]"
                  placeholder="Ej: 🎉 ¡Envío GRATIS en compras superiores a $50.000!"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: Usa emojis para hacer tus mensajes más llamativos (🎉 ⚡ 🥖 💳)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editingMessage.is_active}
                  onChange={(e) =>
                    setEditingMessage({ ...editingMessage, is_active: e.target.checked })
                  }
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium">Mensaje activo</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingMessage(null);
                }}
                className="px-6 py-2 bg-background border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveMessage}
                disabled={!editingMessage.text.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

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