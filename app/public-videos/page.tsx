"use client"
import { useReditRotContext } from '@/context/ReditRotContext'
import { Grid, MainContent, Section, SectionTitle } from '../components/common/styled';
import { Short } from '../components/Short';


export default function ContentScripts() {
  const { state } = useReditRotContext();
  return (
    <>
        <MainContent isOpen={state.isLeftSidebarOpen}>
            <Section>
              <SectionTitle>Public</SectionTitle>
              <Grid>
                {state.publicPosts && state.publicPosts.map((post, i) => (
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
    </>
  );
}
