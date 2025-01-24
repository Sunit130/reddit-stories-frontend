"use client"
import { useState } from "react";
import { useReditRotContext } from '@/context/ReditRotContext'
import { Grid, MainContent, Section, SectionTitle } from '../components/common/styled';
import { ScriptEditModal } from '../components/ScriptEditModal';
import { Short } from '../components/Short';


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
              <SectionTitle>Video Ready</SectionTitle>
              <Grid>
                {state.unlistedPosts && state.unlistedPosts.slice(0,5).map((post, i) => (
                  <Short 
                    key={post["post_id"]}
                    title={post["post_revised_title"]}
                    videoId={post["video_id"]}
                    onUpload={() => console.log('Upload short', i)}
                    onDelete={() => console.log('Delete short', i)}
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
