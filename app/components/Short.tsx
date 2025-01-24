import styled from 'styled-components'
import { Upload, Trash2 } from 'lucide-react'
import { Card, IconButton, youtubeTheme } from './common/styled'
import { makeVideoPublic } from '../apis'

const ShortCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0px;
`

const ShortPreview = styled.div`
  aspect-ratio: 9/16;
  background: ${youtubeTheme.background};
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ShortActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px 15px 20px;
`

const ShortTitle = styled.h3`
  color: ${youtubeTheme.textPrimary};
  margin: 0;
  font-size: 14px;
`

interface ShortProps {
  title: string;
  videoId: string;
  onUpload: () => void;
  onDelete: () => void;
}

export function Short({ title, videoId, onDelete }: ShortProps) {

  const makeVideoHandler = async () => {
    const isUploaded = await makeVideoPublic(videoId=videoId)
    if(isUploaded) {
      console.log("Success Fully uploaded the video")
    } else {
      console.log("Unable to upload the video")
    }
  }


  return (
    <ShortCard>
      <ShortPreview>
          <iframe 
              // className="absolute inset-0"
              style={{ height: '100%', width: '100%', margin: 'auto'}}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=&control=1`}
              allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              >
          </iframe>
        {/* {videoId && <img src={videoId || "/placeholder.svg"} alt={title} />} */}
      </ShortPreview>
      
      <ShortActions>
        <ShortTitle>{title}</ShortTitle>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={makeVideoHandler}>
            <Upload size={16}  />
          </IconButton>
          <IconButton onClick={onDelete}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      </ShortActions>
    </ShortCard>
  )
}

