import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Save, RotateCcw, ChevronDown, ChevronRight, Upload, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CMS = () => {
  const { content, updateContent, resetContent } = useContent();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>('hero');
  const [localContent, setLocalContent] = useState(content);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageField, setCurrentImageField] = useState<string | null>(null);

  const handleSave = () => {
    updateContent(localContent);
    toast({ title: 'Changes saved!', description: 'Your content has been updated.' });
  };

  const handleReset = () => {
    resetContent();
    setLocalContent(content);
    toast({ title: 'Content reset', description: 'All content has been restored to defaults.' });
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setLocalContent((prev) => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentImageField) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (currentImageField === '__aboutStory') {
          const current = localContent.images.aboutStoryImages || [];
          updateField('images.aboutStoryImages', [...current, dataUrl]);
        } else if (currentImageField === '__gallery') {
          const current = localContent.images.galleryImages || [];
          const newItem = {
            id: Date.now().toString(),
            src: dataUrl,
            alt: file.name.replace(/\.[^/.]+$/, ''),
            category: 'General',
            caption: '',
          };
          updateField('images.galleryImages', [...current, newItem]);
        } else {
          updateField(`images.${currentImageField}`, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
    setCurrentImageField(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerImageUpload = (fieldName: string) => {
    setCurrentImageField(fieldName);
    fileInputRef.current?.click();
  };

  const removeImage = (fieldName: string) => {
    updateField(`images.${fieldName}`, undefined);
  };

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Statistics' },
    { id: 'snapshot', label: 'Club Snapshot' },
    { id: 'visionMission', label: 'Vision & Mission' },
    { id: 'about', label: 'About Page' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'management', label: 'Management Team' },
    { id: 'players', label: 'Players' },
    { id: 'academy', label: 'Academy' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'images', label: 'Images & Media' },
  ];

  const imageFields = [
    { key: 'heroBackground', label: 'Hero Background' },
    { key: 'founderPhoto', label: 'Founder Photo' },
    { key: 'academyHero', label: 'Academy Hero Image' },
    { key: 'teamHero', label: 'Team Hero Image' },
  ];

  return (
    <Layout>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-premium">
          <h1 className="heading-hero max-w-4xl mb-4">Content Management</h1>
          <p className="text-xl text-white/80">Edit all website content below.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium max-w-4xl">
          <div className="flex gap-4 mb-8">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" /> Save All Changes
            </button>
            <button onClick={handleReset} className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Reset to Default
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="font-semibold text-lg">{section.label}</span>
                  {activeSection === section.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                
                {activeSection === section.id && (
                  <div className="p-6 space-y-6">
                    {section.id === 'hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Headline</label>
                          <input
                            type="text"
                            value={localContent.hero.headline}
                            onChange={(e) => updateField('hero.headline', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Subheadline</label>
                          <textarea
                            value={localContent.hero.subheadline}
                            onChange={(e) => updateField('hero.subheadline', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Button 1</label>
                            <input
                              type="text"
                              value={localContent.hero.button1}
                              onChange={(e) => updateField('hero.button1', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Button 2</label>
                            <input
                              type="text"
                              value={localContent.hero.button2}
                              onChange={(e) => updateField('hero.button2', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {section.id === 'stats' && localContent.stats.map((stat, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Value {index + 1}</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...localContent.stats];
                              newStats[index] = { ...stat, value: e.target.value };
                              updateField('stats', newStats);
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...localContent.stats];
                              newStats[index] = { ...stat, label: e.target.value };
                              updateField('stats', newStats);
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                      </div>
                    ))}

                    {section.id === 'snapshot' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Headline</label>
                          <input
                            type="text"
                            value={localContent.snapshot.headline}
                            onChange={(e) => updateField('snapshot.headline', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            value={localContent.snapshot.description}
                            onChange={(e) => updateField('snapshot.description', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Achievements</label>
                          {localContent.snapshot.achievements.map((achievement, index) => (
                            <input
                              key={index}
                              type="text"
                              value={achievement}
                              onChange={(e) => {
                                const newAchievements = [...localContent.snapshot.achievements];
                                newAchievements[index] = e.target.value;
                                updateField('snapshot.achievements', newAchievements);
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background mb-2"
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {section.id === 'visionMission' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Vision</label>
                          <textarea
                            value={localContent.visionMission.vision}
                            onChange={(e) => updateField('visionMission.vision', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={3}
                          />
                        </div>
                        {localContent.visionMission.mission.map((item, index) => (
                          <div key={index}>
                            <label className="block text-sm font-medium mb-2">Mission Point {index + 1}</label>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newMission = [...localContent.visionMission.mission];
                                newMission[index] = e.target.value;
                                updateField('visionMission.mission', newMission);
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            />
                          </div>
                        ))}
                      </>
                    )}

                    {section.id === 'about' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Hero Title</label>
                          <input
                            type="text"
                            value={localContent.about.heroTitle}
                            onChange={(e) => updateField('about.heroTitle', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                          <textarea
                            value={localContent.about.heroSubtitle}
                            onChange={(e) => updateField('about.heroSubtitle', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Founder Name</label>
                          <input
                            type="text"
                            value={localContent.about.founderName}
                            onChange={(e) => updateField('about.founderName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Founder Bio</label>
                          <textarea
                            value={localContent.about.founderBio}
                            onChange={(e) => updateField('about.founderBio', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Story Paragraphs</label>
                          {localContent.about.storyParagraphs.map((para, index) => (
                            <textarea
                              key={index}
                              value={para}
                              onChange={(e) => {
                                const newParas = [...localContent.about.storyParagraphs];
                                newParas[index] = e.target.value;
                                updateField('about.storyParagraphs', newParas);
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background mb-2"
                              rows={3}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {section.id === 'milestones' && (
                      <>
                        {localContent.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-end gap-4 p-4 border border-border rounded-xl">
                            <div className="w-24">
                              <label className="block text-sm font-medium mb-2">Year</label>
                              <input type="text" value={milestone.year} onChange={(e) => { const nm = [...localContent.milestones]; nm[index] = { ...milestone, year: e.target.value }; updateField('milestones', nm); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Title</label>
                              <input type="text" value={milestone.title} onChange={(e) => { const nm = [...localContent.milestones]; nm[index] = { ...milestone, title: e.target.value }; updateField('milestones', nm); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Description</label>
                              <input type="text" value={milestone.description} onChange={(e) => { const nm = [...localContent.milestones]; nm[index] = { ...milestone, description: e.target.value }; updateField('milestones', nm); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <button onClick={() => updateField('milestones', localContent.milestones.filter((_, i) => i !== index))} className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        ))}
                        <button onClick={() => updateField('milestones', [...localContent.milestones, { year: '', title: '', description: '' }])} className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground">+ Add Milestone</button>
                      </>
                    )}

                    {section.id === 'facilities' && (
                      <>
                        {localContent.facilities.map((facility, index) => (
                          <div key={index} className="flex items-end gap-4 p-4 border border-border rounded-xl">
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Name</label>
                              <input type="text" value={facility.name} onChange={(e) => { const nf = [...localContent.facilities]; nf[index] = { ...facility, name: e.target.value }; updateField('facilities', nf); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Location</label>
                              <input type="text" value={facility.location} onChange={(e) => { const nf = [...localContent.facilities]; nf[index] = { ...facility, location: e.target.value }; updateField('facilities', nf); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Description</label>
                              <input type="text" value={facility.description} onChange={(e) => { const nf = [...localContent.facilities]; nf[index] = { ...facility, description: e.target.value }; updateField('facilities', nf); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                            </div>
                            <button onClick={() => updateField('facilities', localContent.facilities.filter((_, i) => i !== index))} className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        ))}
                        <button onClick={() => updateField('facilities', [...localContent.facilities, { name: '', location: '', description: '' }])} className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground">+ Add Facility</button>
                      </>
                    )}

                    {section.id === 'management' && (
                      <>
                        {localContent.management.map((member, index) => (
                          <div key={index} className="flex items-end gap-4 p-4 border border-border rounded-xl">
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Name</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => {
                                  const newManagement = [...localContent.management];
                                  newManagement[index] = { ...member, name: e.target.value };
                                  updateField('management', newManagement);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Role</label>
                              <input
                                type="text"
                                value={member.role}
                                onChange={(e) => {
                                  const newManagement = [...localContent.management];
                                  newManagement[index] = { ...member, role: e.target.value };
                                  updateField('management', newManagement);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newManagement = localContent.management.filter((_, i) => i !== index);
                                updateField('management', newManagement);
                              }}
                              className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateField('management', [...localContent.management, { name: '', role: '' }])}
                          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground"
                        >
                          + Add Team Member
                        </button>
                      </>
                    )}

                    {section.id === 'players' && (
                      <>
                        <h3 className="font-bold text-lg">Starting XI</h3>
                        {localContent.startingXI.map((player, index) => (
                          <div key={index} className="flex items-end gap-4 p-4 border border-border rounded-xl">
                            <div className="w-16">
                              <label className="block text-sm font-medium mb-2">#</label>
                              <input
                                type="number"
                                value={player.number}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.startingXI];
                                  newPlayers[index] = { ...player, number: parseInt(e.target.value) };
                                  updateField('startingXI', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Name</label>
                              <input
                                type="text"
                                value={player.name}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.startingXI];
                                  newPlayers[index] = { ...player, name: e.target.value };
                                  updateField('startingXI', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="w-20">
                              <label className="block text-sm font-medium mb-2">Pos</label>
                              <input
                                type="text"
                                value={player.position}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.startingXI];
                                  newPlayers[index] = { ...player, position: e.target.value };
                                  updateField('startingXI', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Role</label>
                              <input
                                type="text"
                                value={player.role || ''}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.startingXI];
                                  newPlayers[index] = { ...player, role: e.target.value };
                                  updateField('startingXI', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newPlayers = localContent.startingXI.filter((_, i) => i !== index);
                                updateField('startingXI', newPlayers);
                              }}
                              className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateField('startingXI', [...localContent.startingXI, { number: localContent.startingXI.length + 1, name: '', position: '', role: '' }])}
                          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground"
                        >
                          + Add Player to Starting XI
                        </button>

                        <h3 className="font-bold text-lg mt-8">Extended Squad</h3>
                        {localContent.extendedSquad.map((player, index) => (
                          <div key={index} className="flex items-end gap-4 p-4 border border-border rounded-xl">
                            <div className="w-16">
                              <label className="block text-sm font-medium mb-2">#</label>
                              <input
                                type="number"
                                value={player.number}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.extendedSquad];
                                  newPlayers[index] = { ...player, number: parseInt(e.target.value) };
                                  updateField('extendedSquad', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Name</label>
                              <input
                                type="text"
                                value={player.name}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.extendedSquad];
                                  newPlayers[index] = { ...player, name: e.target.value };
                                  updateField('extendedSquad', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <div className="w-20">
                              <label className="block text-sm font-medium mb-2">Pos</label>
                              <input
                                type="text"
                                value={player.position}
                                onChange={(e) => {
                                  const newPlayers = [...localContent.extendedSquad];
                                  newPlayers[index] = { ...player, position: e.target.value };
                                  updateField('extendedSquad', newPlayers);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newPlayers = localContent.extendedSquad.filter((_, i) => i !== index);
                                updateField('extendedSquad', newPlayers);
                              }}
                              className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateField('extendedSquad', [...localContent.extendedSquad, { number: localContent.extendedSquad.length + 12, name: '', position: '' }])}
                          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground"
                        >
                          + Add Player to Extended Squad
                        </button>

                        <h3 className="font-bold text-lg mt-8">Notable Players</h3>
                        {localContent.notablePlayers.map((player, index) => (
                          <div key={index} className="p-4 border border-border rounded-xl space-y-4">
                            <div className="flex items-end gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                  type="text"
                                  value={player.name}
                                  onChange={(e) => {
                                    const np = [...localContent.notablePlayers];
                                    np[index] = { ...player, name: e.target.value };
                                    updateField('notablePlayers', np);
                                  }}
                                  className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  const np = localContent.notablePlayers.filter((_, i) => i !== index);
                                  updateField('notablePlayers', np);
                                }}
                                className="px-3 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Age</label>
                                <input type="number" value={player.age} onChange={(e) => { const np = [...localContent.notablePlayers]; np[index] = { ...player, age: parseInt(e.target.value) }; updateField('notablePlayers', np); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Pos</label>
                                <input type="text" value={player.position} onChange={(e) => { const np = [...localContent.notablePlayers]; np[index] = { ...player, position: e.target.value }; updateField('notablePlayers', np); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Matches</label>
                                <input type="number" value={player.matches} onChange={(e) => { const np = [...localContent.notablePlayers]; np[index] = { ...player, matches: parseInt(e.target.value) }; updateField('notablePlayers', np); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Goals</label>
                                <input type="number" value={player.goals} onChange={(e) => { const np = [...localContent.notablePlayers]; np[index] = { ...player, goals: parseInt(e.target.value) }; updateField('notablePlayers', np); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Assists</label>
                                <input type="number" value={player.assists} onChange={(e) => { const np = [...localContent.notablePlayers]; np[index] = { ...player, assists: parseInt(e.target.value) }; updateField('notablePlayers', np); }} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => updateField('notablePlayers', [...localContent.notablePlayers, { name: '', age: 18, position: '', matches: 0, goals: 0, assists: 0 }])}
                          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground"
                        >
                          + Add Notable Player
                        </button>
                      </>
                    )}

                    {section.id === 'academy' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Hero Title</label>
                          <input
                            type="text"
                            value={localContent.academy.heroTitle}
                            onChange={(e) => updateField('academy.heroTitle', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                          <textarea
                            value={localContent.academy.heroSubtitle}
                            onChange={(e) => updateField('academy.heroSubtitle', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Philosophy</label>
                          <textarea
                            value={localContent.academy.philosophy}
                            onChange={(e) => updateField('academy.philosophy', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Success Highlight</label>
                          <textarea
                            value={localContent.academy.successHighlight}
                            onChange={(e) => updateField('academy.successHighlight', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                            rows={3}
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'contact' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            value={localContent.contact.email}
                            onChange={(e) => updateField('contact.email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="text"
                            value={localContent.contact.phone}
                            onChange={(e) => updateField('contact.phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Location</label>
                          <input
                            type="text"
                            value={localContent.contact.location}
                            onChange={(e) => updateField('contact.location', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Location Detail</label>
                          <input
                            type="text"
                            value={localContent.contact.locationDetail}
                            onChange={(e) => updateField('contact.locationDetail', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background"
                          />
                        </div>
                      </>
                    )}

                    {section.id === 'images' && (
                      <div className="space-y-6">
                        {imageFields.map((field) => {
                          const imgVal = localContent.images[field.key as keyof typeof localContent.images];
                          const isString = typeof imgVal === 'string';
                          return (
                            <div key={field.key} className="p-4 border border-border rounded-xl">
                              <label className="block text-sm font-medium mb-4">{field.label}</label>
                              {isString && imgVal ? (
                                <div className="relative">
                                  <img src={imgVal} alt={field.label} className="w-full h-48 object-cover rounded-xl" />
                                  <button onClick={() => removeImage(field.key)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => triggerImageUpload(field.key)} className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                                  <Upload className="w-8 h-8 text-muted-foreground" />
                                  <span className="text-muted-foreground">Click to upload image</span>
                                </button>
                              )}
                            </div>
                          );
                        })}

                        {/* About Story Images */}
                        <div className="p-4 border border-border rounded-xl">
                          <label className="block text-sm font-medium mb-4">About Us / Club Story Images</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            {(localContent.images.aboutStoryImages || []).map((src, index) => (
                              <div key={index} className="relative group">
                                <img src={src} alt={`Story ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                                <button
                                  onClick={() => {
                                    const newImages = (localContent.images.aboutStoryImages || []).filter((_, i) => i !== index);
                                    updateField('images.aboutStoryImages', newImages);
                                  }}
                                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setCurrentImageField('__aboutStory');
                              fileInputRef.current?.click();
                            }}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"
                          >
                            <Upload className="w-4 h-4" /> Add Story Image
                          </button>
                        </div>

                        {/* Gallery Images */}
                        <div className="p-4 border border-border rounded-xl">
                          <label className="block text-sm font-medium mb-4">Gallery Images</label>
                          <div className="space-y-4 mb-4">
                            {(localContent.images.galleryImages || []).map((item, index) => (
                              <div key={item.id} className="flex items-start gap-4 p-3 border border-border rounded-xl">
                                <img src={item.src} alt={item.alt} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                                <div className="flex-1 space-y-2">
                                  <input
                                    type="text"
                                    value={item.alt}
                                    placeholder="Image title"
                                    onChange={(e) => {
                                      const ng = [...(localContent.images.galleryImages || [])];
                                      ng[index] = { ...item, alt: e.target.value };
                                      updateField('images.galleryImages', ng);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                  />
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={item.category}
                                      placeholder="Category"
                                      onChange={(e) => {
                                        const ng = [...(localContent.images.galleryImages || [])];
                                        ng[index] = { ...item, category: e.target.value };
                                        updateField('images.galleryImages', ng);
                                      }}
                                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                    />
                                    <input
                                      type="text"
                                      value={item.caption || ''}
                                      placeholder="Caption"
                                      onChange={(e) => {
                                        const ng = [...(localContent.images.galleryImages || [])];
                                        ng[index] = { ...item, caption: e.target.value };
                                        updateField('images.galleryImages', ng);
                                      }}
                                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    const ng = (localContent.images.galleryImages || []).filter((_, i) => i !== index);
                                    updateField('images.galleryImages', ng);
                                  }}
                                  className="px-2 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setCurrentImageField('__gallery');
                              fileInputRef.current?.click();
                            }}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"
                          >
                            <Upload className="w-4 h-4" /> Add Gallery Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CMS;
