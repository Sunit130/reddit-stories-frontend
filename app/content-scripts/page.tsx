"use client"
import { useState } from "react";
import { useReditRotContext } from '@/context/ReditRotContext'
import { Grid, MainContent, Section, SectionTitle, youtubeTheme } from '../components/common/styled';
import { Script } from '../components/Script';
import { ScriptEditModal } from '../components/ScriptEditModal';

export default function ContentScripts() {
  const { state } = useReditRotContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<{ id: string; title: string; description: string}>();


  const handleScriptEdit = (scriptData: any) => {
    setSelectedScript(scriptData);
    setModalOpen(true);
  };

  return (
    <>
        <MainContent isOpen={state.isLeftSidebarOpen}>
            <Section>
              <SectionTitle>Pending Scripts</SectionTitle>
              <Grid>
                {state.contentPosts && state.contentPosts.map((post, i) => (
                  <Script 
                    key={i}
                    title={post["post_revised_title"]}
                    description={post["post_revised_content"]}
                    onEdit={() => handleScriptEdit({
                      id: post["post_id"],
                      title: post["post_revised_title"],
                      description: post["post_revised_content"]
                    })}
                    onDelete={() => console.log('Delete script', i)}
                  />
                ))}
              </Grid>
            </Section>
          </MainContent>
          <ScriptEditModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            scriptData={selectedScript}
          />
    </>
  );
}