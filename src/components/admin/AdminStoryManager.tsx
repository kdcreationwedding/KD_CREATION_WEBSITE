import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, X, Camera, Film, ArrowUp, ArrowDown } from 'lucide-react';
import { PortfolioItem } from '../../config/siteConfig';
import { cmsService } from '../../services/cmsService';
import { getAssetPath } from '../../utils/assetHelper';

export const AdminStoryManager: React.FC = () => {
  const [stories, setStories] = useState<PortfolioItem[]>(() => cmsService.getStories());
  const [editingStory, setEditingStory] = useState<Partial<PortfolioItem> | null>(null);

  const refreshStories = () => {
    setStories([...cmsService.getStories()]);
  };

  const handleStartCreate = () => {
    setEditingStory({
      id: `story-${Date.now()}`,
      title: '',
      couple: '',
      location: 'Ahmedabad, Gujarat',
      year: '2026',
      category: 'Royal Wedding',
      description: '',
      heroImage: 'assets/yash-kavya-outer-cover.jpg',
      gallery: [],
      highlights: [],
      bts: ''
    });
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory || !editingStory.couple || !editingStory.title) {
      alert('Please enter Couple Name and Story Title');
      return;
    }

    const storyToSave: PortfolioItem = {
      id: editingStory.id || `story-${Date.now()}`,
      title: editingStory.title,
      couple: editingStory.couple,
      location: editingStory.location || 'Ahmedabad, Gujarat',
      year: editingStory.year || '2026',
      category: (editingStory.category as any) || 'Royal Wedding',
      description: editingStory.description || '',
      heroImage: editingStory.heroImage || 'assets/yash-kavya-outer-cover.jpg',
      modalCover: editingStory.modalCover || editingStory.heroImage,
      gallery: editingStory.gallery || [],
      highlights: editingStory.highlights || ['Royal Heritage Decor', '4K Anamorphic Cinema'],
      bts: editingStory.bts || 'KD Creation Signature Coverage'
    };

    cmsService.saveStory(storyToSave);
    setEditingStory(null);
    refreshStories();
    alert(`✓ Portfolio Story "${storyToSave.couple}" saved!`);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm('Delete this portfolio story?')) {
      cmsService.deleteStory(id);
      refreshStories();
    }
  };

  const handleBulkUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingStory) return;

    const sortedFiles = Array.from(files).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    const readImage = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve((event.target?.result as string) || '');
        reader.readAsDataURL(file);
      });
    };

    const uploaded: string[] = [];
    for (const file of sortedFiles) {
      const res = await readImage(file);
      if (res) uploaded.push(res);
    }

    setEditingStory({
      ...editingStory,
      gallery: [...(editingStory.gallery || []), ...uploaded]
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 text-[#F5F2EB]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold/20">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-wider">
            <Camera className="w-4 h-4" /> PORTFOLIO STORIES & GALLERIES
          </div>
          <h3 className="text-2xl font-serif-luxury font-bold text-white">
            WEBSITE FEATURED STORIES CMS
          </h3>
        </div>

        <button
          onClick={handleStartCreate}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW STORY</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingStory && (
        <form onSubmit={handleSaveStory} className="bg-[#1C0307] border border-gold/40 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-gold/20">
            <h4 className="text-xl font-serif-luxury font-bold text-gold">
              {editingStory.id ? `EDIT: ${editingStory.couple}` : 'ADD PORTFOLIO STORY'}
            </h4>
            <button
              type="button"
              onClick={() => setEditingStory(null)}
              className="p-1.5 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">COUPLE NAME *</label>
              <input
                type="text"
                value={editingStory.couple || ''}
                onChange={(e) => setEditingStory({ ...editingStory, couple: e.target.value, title: e.target.value })}
                placeholder="e.g. Yash & Kavya"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">STORY TITLE *</label>
              <input
                type="text"
                value={editingStory.title || ''}
                onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                placeholder="e.g. The Heritage Grandeur"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">LOCATION & YEAR</label>
              <input
                type="text"
                value={editingStory.location || ''}
                onChange={(e) => setEditingStory({ ...editingStory, location: e.target.value })}
                placeholder="e.g. Ahmedabad, Gujarat"
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gold uppercase block mb-1">CATEGORY</label>
              <select
                value={editingStory.category || 'Royal Wedding'}
                onChange={(e) => setEditingStory({ ...editingStory, category: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono"
              >
                <option value="Royal Wedding">Royal Wedding</option>
                <option value="Destination">Destination</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Cinematic Film">Cinematic Film</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gold uppercase block mb-1">STORY DESCRIPTION</label>
            <textarea
              rows={3}
              value={editingStory.description || ''}
              onChange={(e) => setEditingStory({ ...editingStory, description: e.target.value })}
              placeholder="Enter luxury story summary..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#3B0811] border border-gold/30 text-gold text-xs font-mono"
            />
          </div>

          {/* Bulk Gallery Photos */}
          <div className="space-y-3 pt-4 border-t border-gold/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-gold uppercase font-bold block">
                GALLERY IMAGES ({editingStory.gallery?.length || 0} PHOTOS)
              </label>
              <label className="cursor-pointer px-4 py-2 rounded-xl bg-gold-gradient text-obsidian text-xs font-mono font-bold flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" /> UPLOAD GALLERY PHOTOS
                <input type="file" accept="image/*" multiple onChange={handleBulkUploadGallery} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-60 overflow-y-auto p-2 bg-[#1C0307] rounded-xl border border-gold/20">
              {editingStory.gallery?.map((imgUrl, idx) => (
                <div key={idx} className="relative group border border-gold/30 rounded-lg overflow-hidden bg-[#3B0811]">
                  <img src={getAssetPath(imgUrl)} alt={`Photo ${idx + 1}`} className="w-full h-20 object-cover" />
                  <div className="p-1 bg-black/80 flex items-center justify-between text-[9px] font-mono text-gold">
                    <span>Image {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = editingStory.gallery?.filter((_, i) => i !== idx);
                        setEditingStory({ ...editingStory, gallery: updated });
                      }}
                      className="text-rose-400 hover:text-rose-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gold/20">
            <button
              type="button"
              onClick={() => setEditingStory(null)}
              className="px-6 py-2 rounded-xl bg-gold/10 text-gold text-xs font-mono font-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase"
            >
              SAVE STORY
            </button>
          </div>
        </form>
      )}

      {/* Stories Table */}
      <div className="bg-[#1C0307] border border-gold/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-[#3B0811] text-[10px] text-gold uppercase tracking-wider border-b border-gold/30">
                <th className="p-4">STORY</th>
                <th className="p-4">COUPLE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">PHOTOS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {stories.map((s) => (
                <tr key={s.id} className="hover:bg-[#3B0811]/40 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={getAssetPath(s.heroImage)} alt={s.couple} className="w-10 h-10 object-cover rounded-lg border border-gold/30" />
                    <span className="font-bold text-white block">{s.title}</span>
                  </td>
                  <td className="p-4 font-bold text-gold">{s.couple}</td>
                  <td className="p-4">{s.category}</td>
                  <td className="p-4">{s.gallery?.length || 0} Photos</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingStory({ ...s })}
                      className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-obsidian"
                      title="Edit Story"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStory(s.id)}
                      className="p-2 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-600 hover:text-white"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
