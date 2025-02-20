"use client"
import { Grid, MainContent, Section, SectionTitle } from './components/common/styled'
import { Short } from './components/Short'
import { Script } from './components/Script'
import { useEffect, useState } from "react";
import { ScriptEditModal } from "./components/ScriptEditModal";
import { useReditRotContext } from '@/context/ReditRotContext'
import { fetchPosts } from './apis'
import { ScriptInterface } from './types';
import Loader from './components/common/Loader';
import Note from './components/Note';


export default function Home() {
  const { state, dispatch } = useReditRotContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<ScriptInterface>();


  const handleScriptEdit = (scriptData: ScriptInterface) => {
    setSelectedScript(scriptData);
    setModalOpen(true);
  };


  const callGetAllPost = async () => {
    const posts = await fetchPosts();
    dispatch({ type: "setAllPosts", value: posts });
  }

  useEffect(() => {
    callGetAllPost();
  }, [])



  return (
    <>
        <MainContent isOpen={state.isLeftSidebarOpen}>
            <Note />
            <Section>
              <SectionTitle>Latest {!state.unlistedPosts?.length && <Loader/>}</SectionTitle>
              <Grid>
                {state.unlistedPosts && state.unlistedPosts.slice(0,1).map((post, i) => (
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
            <Section>
              <SectionTitle>Public  {!state.publicPosts?.length && <Loader/>}</SectionTitle>
              <Grid>
                {state.publicPosts && state.publicPosts.slice(0,5).map((post, i) => (
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

            <Section>
              <SectionTitle>Video Ready  {!state.unlistedPosts?.length && <Loader/>}</SectionTitle>
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


            <Section>
              <SectionTitle>Pending Scripts  {!state.contentPosts?.length && <Loader/>}</SectionTitle>
              <Grid>
                {state.contentPosts && state.contentPosts.slice(0,5).map((post, i) => (
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
