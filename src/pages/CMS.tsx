import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Save, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CMS = () => {
  const { content, updateContent, resetContent } = useContent();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>('hero');
  const [localContent, setLocalContent] = useState(content);

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

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Statistics' },
    { id: 'snapshot', label: 'Club Snapshot' },
    { id: 'visionMission', label: 'Vision & Mission' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Info' },
  ];

  return (
    <Layout>
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
                      </>
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
