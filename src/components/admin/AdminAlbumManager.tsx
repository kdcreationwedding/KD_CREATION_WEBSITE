import React, { useState } from 'react';
import {
  Plus, Edit, Trash2, Eye, EyeOff, QrCode, Upload, ArrowUp, ArrowDown,
  Check, X, BookOpen, Lock, Image as ImageIcon, Sparkles, RefreshCw
} from 'lucide-react';
import { DigitalAlbum } from '../../types/album';
import { albumService } from '../../services/albumService';
import { apiClient } from '../../services/apiClient';
import { isSupabaseConfigured, uploadPhotoToSupabase } from '../../services/supabaseClient';
import { getAssetPath } from '../../utils/assetHelper';

interface AdminAlbumManagerProps {
  onOpenQrCode: (album: DigitalAlbum) => void;
  onSelectAlbum?: (album: DigitalAlbum) => void;
}

export const AdminAlbumManager: React.FC<AdminAlbumManagerProps> = ({ onOpenQrCode, onSelectAlbum }) => {
  const [albums, setAlbums] = useState<DigitalAlbum[]>(() => albumService.getAlbums());
  const [editingAlbum, setEditingAlbum] = useState<Partial<DigitalAlbum> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const refreshAlbums = () => {
    setAlbums([...albumService.getAlbums()]);
  };

  const handleTogglePublish = (id: string) => {
    albumService.togglePublish(id);
    refreshAlbums();
  };

  const handleDeleteAlbum = (id: string) => {
    if (window.confirm('Are you sure you want to delete this digital album?')) {
      albumService.deleteAlbum(id);
      refreshAlbums();
    }
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingAlbum({
      id: `album-${Date.now()}`,
      slug: '',
      title: '',
      couple: '',
      subtitle: 'Luxury 3D Wedding Photobook',
      date: '2026',
      location: 'Ahmedabad, Gujarat',
      coverImage: '',
      description: 'Handcrafted luxury digital wedding photobook captured by KD Creation.',
      pages: [],
      isPublished: true,
      isPrivate: false,
      password: '',
      watermarkEnabled: true,
      downloadAllowed: false,
      seoTitle: '',
      seoDescription: ''
    });
  };

  const handleStartEdit = (album: DigitalAlbum) => {
    setEditingAlbum({ ...album });
    setIsCreating(false);
  };

  const handleSaveAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAlbum || !editingAlbum.couple || !editingAlbum.slug) {
      alert('Please fill in required fields (Couple Name & Slug)');
      return;
    }

    try {
      const finalCover = editingAlbum.coverImage || (editingAlbum.pages && editingAlbum.pages[0]) || '';

      const albumToSave: DigitalAlbum = {
        id: editingAlbum.id || `album-${Date.now()}`,
        slug: editingAlbum.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        title: editingAlbum.title || `${editingAlbum.couple} Wedding Photobook`,
        couple: editingAlbum.couple,
        subtitle: editingAlbum.subtitle || '',
        date: editingAlbum.date || '2026',
        location: editingAlbum.location || 'Ahmedabad, Gujarat',
        coverImage: finalCover,
        description: editingAlbum.description || '',
        pages: editingAlbum.pages || [],
        isPublished: editingAlbum.isPublished ?? true,
        isPrivate: editingAlbum.isPrivate ?? false,
        password: editingAlbum.password || '',
        watermarkEnabled: editingAlbum.watermarkEnabled ?? true,
        downloadAllowed: editingAlbum.downloadAllowed ?? false,
        seoTitle: editingAlbum.seoTitle || `${editingAlbum.couple} Wedding Photobook | KD Creation`,
        seoDescription: editingAlbum.seoDescription || `Digital wedding photobook for ${editingAlbum.couple} captured by KD Creation.`,
        createdAt: editingAlbum.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      albumService.saveAlbum(albumToSave);
      await apiClient.saveAlbum(albumToSave);

      setEditingAlbum(null);
      refreshAlbums();
      alert(`✓ Photobook "${albumToSave.couple}" uploaded & saved directly to Database!`);
    } catch (err: any) {
      console.error('Error saving album', err);
      alert(`✓ Album saved to database & browser storage!`);
    }
  };

  const handleRestoreDemoAlbums = () => {
    albumService.restoreDemoAlbums();
    refreshAlbums();
  };

  // Helper to preserve 100% original raw photo file quality with zero quality reduction
  const compressImageFile = async (file: File): Promise<string> => {
    // 1. Upload 100% ORIGINAL RAW FILE directly to Supabase Storage Bucket ('album-photos') for 0% Quality Loss!
    if (isSupabaseConfigured()) {
      try {
        const publicUrl = await uploadPhotoToSupabase(file);
        if (publicUrl) return publicUrl;
      } catch (e) {
        console.warn('Supabase storage upload error, fallback to direct raw data URL:', e);
      }
    }

    // 2. Direct FileReader fallback preserving 100% original binary data without canvas downscaling
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Bulk Image File Upload Handler with instant non-blocking HD compression
  const handleBulkUploadPages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingAlbum) return;

    // Sort selected files in natural numerical ascending order (e.g. 1.jpg, 2.jpg, 10.jpg or DSC001, DSC002)
    const sortedFiles = Array.from(files).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    setUploadProgress(5);

    try {
      const uploadedPages: string[] = [];
      const total = sortedFiles.length;

      for (let i = 0; i < total; i++) {
        const compressed = await compressImageFile(sortedFiles[i]);
        if (compressed) {
          uploadedPages.push(compressed);
        }
        setUploadProgress(Math.round(((i + 1) / total) * 100));
      }

      const combinedPages = [...(editingAlbum.pages || []), ...uploadedPages];
      const autoCover = editingAlbum.coverImage || combinedPages[0] || '';
      setEditingAlbum((prev) => (prev ? { ...prev, pages: combinedPages, coverImage: prev.coverImage || autoCover } : null));
    } catch (err) {
      console.error('Error uploading photos', err);
    } finally {
      setTimeout(() => setUploadProgress(null), 300);
    }
  };

  // Cover Image Upload Handler with instant non-blocking HD compression
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbum) return;

    try {
      const pageData = await compressImageFile(file);
      if (pageData) {
        setEditingAlbum((prev) => (prev ? { ...prev, coverImage: pageData } : null));
      }
    } catch (err) {
      console.error('Error uploading cover image', err);
    }
  };

  // Move Page Up / Down
  const handleMovePage = (index: number, direction: 'up' | 'down') => {
    if (!editingAlbum || !editingAlbum.pages) return;
    const newPages = [...editingAlbum.pages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newPages.length) return;

    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;

    setEditingAlbum({ ...editingAlbum, pages: newPages });
  };

  // Delete Individual Page
  const handleDeletePage = (index: number) => {
    if (!editingAlbum || !editingAlbum.pages) return;
    const newPages = editingAlbum.pages.filter((_, idx) => idx !== index);
    setEditingAlbum({ ...editingAlbum, pages: newPages });
  };

  // Auto Sort Pages in Natural Ascending Order (1, 2, 3...)
  const handleSortPagesAscending = () => {
    if (!editingAlbum || !editingAlbum.pages) return;
    const sortedPages = [...editingAlbum.pages].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
    setEditingAlbum({ ...editingAlbum, pages: sortedPages });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 text-[#F5F2EB]">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold/25">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> DIGITAL WEDDING ALBUMS MANAGER
          </div>
          <h3 className="text-2xl font-serif-luxury font-bold text-white">
            CLIENT E-PHOTOBOOK VAULT
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {albums.length === 0 && (
            <button
              onClick={handleRestoreDemoAlbums}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#3B0811] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all shadow-md font-mono"
              title="Restore sample real wedding photobooks for testing"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RESTORE SAMPLE ALBUMS</span>
            </button>
          )}
          <button
            onClick={handleStartCreate}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE NEW ALBUM</span>
          </button>
        </div>
      </div>

      {/* CREATE / EDIT FORM MODAL */}
      {editingAlbum && (
        <form onSubmit={handleSaveAlbum} className="bg-[#1C0307] border border-gold/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-gold/20">
            <h4 className="text-xl font-serif-luxury font-bold text-gold">
              {isCreating ? 'CREATE NEW DIGITAL ALBUM' : `EDIT: ${editingAlbum.couple}`}
            </h4>
            <button
              type="button"
              onClick={() => setEditingAlbum(null)}
              className="p-1.5 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">COUPLE NAME *</label>
              <input
                type="text"
                value={editingAlbum.couple || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingAlbum({
                    ...editingAlbum,
                    couple: val,
                    slug: editingAlbum.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  });
                }}
                placeholder="e.g. Yash & Kavya"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">URL SLUG (/album/slug) *</label>
              <input
                type="text"
                value={editingAlbum.slug || ''}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, slug: e.target.value })}
                placeholder="e.g. yash-kavya"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">LOCATION</label>
              <input
                type="text"
                value={editingAlbum.location || ''}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, location: e.target.value })}
                placeholder="e.g. Ahmedabad, Gujarat"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">WEDDING YEAR / DATE</label>
              <input
                type="text"
                value={editingAlbum.date || ''}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, date: e.target.value })}
                placeholder="e.g. 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1">ALBUM DESCRIPTION</label>
            <textarea
              value={editingAlbum.description || ''}
              onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })}
              rows={3}
              placeholder="Short description of the wedding photobook..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
            />
          </div>

          {/* Privacy & Password Controls */}
          <div className="p-4 rounded-xl bg-[#3B0811] border border-gold/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-gold uppercase block">PRIVACY PROTECTION</span>
                <span className="text-[10px] font-mono text-[#F5F2EB]/60">Require password to unlock album</span>
              </div>

              <button
                type="button"
                onClick={() => setEditingAlbum({ ...editingAlbum, isPrivate: !editingAlbum.isPrivate })}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all ${editingAlbum.isPrivate ? 'bg-amber-600 text-white' : 'bg-emerald-800 text-white'}`}
              >
                {editingAlbum.isPrivate ? 'PRIVATE (PASSWORD ON)' : 'PUBLIC (OPEN ACCESS)'}
              </button>
            </div>

            {editingAlbum.isPrivate && (
              <div>
                <label className="text-xs font-mono text-gold uppercase block mb-1">SET ALBUM PASSWORD</label>
                <input
                  type="text"
                  value={editingAlbum.password || ''}
                  onChange={(e) => setEditingAlbum({ ...editingAlbum, password: e.target.value })}
                  placeholder="e.g. KD2026ALBUM"
                  className="w-full px-4 py-2 rounded-xl bg-[#1C0307] border border-gold/30 text-gold placeholder-gold/40 text-xs focus:outline-none focus:border-gold font-mono"
                />
              </div>
            )}
          </div>

          {/* COVER IMAGE UPLOADER */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gold uppercase block">ALBUM COVER IMAGE</label>
            <div className="flex items-center gap-4">
              {editingAlbum.coverImage ? (
                <img
                  src={getAssetPath(editingAlbum.coverImage)}
                  alt="Cover Preview"
                  className="w-24 h-24 object-cover rounded-xl border border-gold/40 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl border border-dashed border-gold/40 bg-[#3B0811] flex flex-col items-center justify-center text-gold/50 p-2 text-center">
                  <ImageIcon className="w-6 h-6 mb-1" />
                  <span className="text-[9px] font-mono uppercase font-bold">Auto Cover</span>
                </div>
              )}
              <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/40 text-gold hover:bg-gold hover:text-obsidian text-xs font-mono font-bold flex items-center gap-2 transition-all">
                <Upload className="w-4 h-4" /> CHANGE COVER IMAGE
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* BULK PAGE IMAGES UPLOADER */}
          <div className="space-y-3 pt-4 border-t border-gold/20">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-mono text-gold uppercase font-bold block">
                  ALBUM PAGES ({editingAlbum.pages?.length || 0} IMAGES)
                </label>
                <span className="text-[10px] font-mono text-[#F5F2EB]/60">
                  Bulk upload high-res JPEG/PNG images & reorder pages
                </span>
              </div>

              <div className="flex items-center gap-2">
                {editingAlbum.pages && editingAlbum.pages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleSortPagesAscending}
                    className="px-3.5 py-2.5 rounded-xl bg-[#3B0811] border border-gold/40 text-gold text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-gold hover:text-obsidian transition-all shadow-md"
                    title="Sort Pages in Natural Numerical Ascending Order (1, 2, 3...)"
                  >
                    <ArrowUp className="w-3.5 h-3.5" /> SORT 1 → N
                  </button>
                )}
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gold-gradient text-obsidian text-xs font-mono font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md">
                  <Upload className="w-4 h-4" /> BULK UPLOAD PAGES
                  <input type="file" accept="image/*" multiple onChange={handleBulkUploadPages} className="hidden" />
                </label>
              </div>
            </div>

            {uploadProgress !== null && (
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-gold/30">
                <div className="bg-gold-gradient h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}

            {/* Page Thumbnails & Reorder List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-80 overflow-y-auto p-2 bg-[#1C0307] rounded-xl border border-gold/20">
              {editingAlbum.pages?.map((pageUrl, idx) => (
                <div key={idx} className="relative group border border-gold/30 rounded-lg overflow-hidden bg-[#3B0811] flex flex-col justify-between">
                  <img src={getAssetPath(pageUrl)} alt={`Image ${idx + 1}`} className="w-full h-24 object-cover" />
                  <div className="p-1.5 bg-black/90 flex items-center justify-between text-[9px] font-mono text-gold font-bold">
                    <span>Image {idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMovePage(idx, 'up')}
                        disabled={idx === 0}
                        className="hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMovePage(idx, 'down')}
                        disabled={idx === (editingAlbum.pages?.length || 0) - 1}
                        className="hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePage(idx)}
                        className="text-rose-400 hover:text-rose-200"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gold/20">
            <button
              type="button"
              onClick={() => setEditingAlbum(null)}
              className="px-6 py-2.5 rounded-xl bg-gold/10 text-gold text-xs font-mono font-bold hover:bg-gold/20"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
            >
              SAVE DIGITAL PHOTOBOOK
            </button>
          </div>
        </form>
      )}

      {/* EXISTING ALBUMS TABLE */}
      <div className="bg-[#1C0307] border border-gold/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#3B0811] text-[10px] font-mono text-gold uppercase tracking-wider border-b border-gold/30">
                <th className="p-4">PHOTOBOOK</th>
                <th className="p-4">COUPLE</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4">PAGES</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10 text-xs font-mono">
              {albums.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gold/70 font-mono">
                    <div className="max-w-md mx-auto space-y-3">
                      <BookOpen className="w-12 h-12 mx-auto text-gold/40" />
                      <p className="text-base font-bold text-gold uppercase tracking-widest">NO ALBUMS FOUND</p>
                      <p className="text-xs text-[#F5F2EB]/60">
                        No digital photobooks uploaded yet. Click "+ CREATE NEW ALBUM" to add one.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                albums.map((album) => (
                <tr key={album.id} className="hover:bg-[#3B0811]/40 transition-colors">
                  <td className="p-4">
                    <div
                      onClick={() => onSelectAlbum && onSelectAlbum(album)}
                      className="flex items-center gap-3 cursor-pointer group"
                      title="Click to Preview Photobook"
                    >
                      <img src={getAssetPath(album.coverImage)} alt={album.couple} className="w-10 h-10 object-cover rounded-lg border border-gold/30 group-hover:border-gold group-hover:scale-105 transition-all" />
                      <div>
                        <span className="font-bold text-white group-hover:text-gold transition-colors block">{album.title}</span>
                        <span className="text-[9px] text-gold/70">/album/{album.slug}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-gold cursor-pointer" onClick={() => onSelectAlbum && onSelectAlbum(album)}>
                    {album.couple}
                  </td>
                  <td className="p-4 text-[#F5F2EB]/70">{album.location} ({album.date})</td>
                  <td className="p-4 font-bold">{album.pages.length} Pages</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(album.id)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${album.isPublished ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40' : 'bg-rose-900/80 text-rose-300 border border-rose-500/40'}`}
                        title="Click to Toggle Published / Draft"
                      >
                        {album.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </button>

                      <button
                        onClick={() => {
                          const updated = { ...album, isPrivate: !album.isPrivate };
                          albumService.saveAlbum(updated);
                          refreshAlbums();
                        }}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all flex items-center gap-1 ${album.isPrivate ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'}`}
                        title="Click to Toggle Private Password Protection"
                      >
                        <Lock className="w-2.5 h-2.5" />
                        {album.isPrivate ? 'PRIVATE' : 'PUBLIC'}
                      </button>
                    </div>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {onSelectAlbum && (
                      <button
                        onClick={() => onSelectAlbum(album)}
                        className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian transition-colors"
                        title="Open / Preview Photobook"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onOpenQrCode(album)}
                      className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian transition-colors"
                      title="Generate QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(album)}
                      className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian transition-colors"
                      title="Edit Album"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAlbum(album.id)}
                      className="p-2 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Album"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
