'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  alt: string;
  memberSince: string;
}

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 mb-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
            <AppImage
              src={profile.photoUrl}
              alt={profile.alt}
              fill
              className="object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-smooth press-scale">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="text-2xl font-heading font-bold text-foreground border-b-2 border-primary focus:outline-none bg-transparent"
                />
              ) : (
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {profile.name}
                </h1>
              )}
              <p className="text-text-secondary text-sm mt-1">
                Miembro desde {formatDate(profile.memberSince)}
              </p>
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-smooth press-scale flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isEditing ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                )}
              </svg>
              {isEditing ? 'Guardar' : 'Editar'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">Teléfono</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      className="font-medium text-foreground border-b border-primary focus:outline-none bg-transparent w-full"
                    />
                  ) : (
                    <p className="font-medium text-foreground">{profile.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="font-medium text-foreground border-b border-primary focus:outline-none bg-transparent w-full"
                    />
                  ) : (
                    <p className="font-medium text-foreground">{profile.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;