import styled from 'styled-components'
import { X } from 'lucide-react'
import { IconButton, ActionButton } from './common/styled'
import { fetchPosts, sendPostPriorityQueue } from '../apis'
import { useRef, useState } from 'react'
import { useReditRotContext } from '@/context/ReditRotContext'

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const ModalContent = styled.div`
  background: #212121;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 800px;
`

const Input = styled.input`
  width: 100%;
  background: #181818;
  border: 1px solid #383838;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`

const TextArea = styled.textarea`
  width: 100%;
  background: #181818;
  border: 1px solid #383838;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  min-height: 450px;
`

export interface ScriptEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptData?: {
    id: string,
    title: string;
    description: string;
  };
  isMakeVideoDisable?: boolean
}

export function ScriptEditModal({ isOpen, onClose, scriptData, isMakeVideoDisable }: ScriptEditModalProps) {
  const { dispatch } = useReditRotContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isPostProcessing, setIsPostProcessing] = useState<{ status: 'edit' | 'in-progess' | 'queued' }>({status: 'edit'});
  
  if (!isOpen) return null;


  const sendPostVideoProcessing = async () => {
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    const payload = {
      "Post ID": scriptData ? scriptData.id : "", // Replace with actual post ID if dynamic
      "Post Revised Title": title,
      "Post Revised Content": description,
    };

    console.log(payload)

    try {
      setIsPostProcessing({status: 'in-progess'});
      const message = await sendPostPriorityQueue(payload);
      console.log("Response from API:", message);

      const posts = await fetchPosts();
      dispatch({ type: "setAllPosts", value: posts });
      setIsPostProcessing({status: 'queued'});
    } catch (error) {
      console.error("Error sending post for processing:", error);
    }
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ color: '#fff' }}>Edit Script : {scriptData?.id}</h2>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
        </div>

        <Input
          ref={titleRef}
          defaultValue={scriptData?.title}
          placeholder="Enter title"
        />

        <TextArea 
          ref={descriptionRef}
          defaultValue={scriptData?.description}
          placeholder="Enter description"
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <ActionButton variant='outline' onClick={onClose}>Cancel</ActionButton>
          <ActionButton variant={isMakeVideoDisable || isPostProcessing.status !== 'edit' ? 'inactive' : 'primary'} onClick={sendPostVideoProcessing}>
            { isPostProcessing.status === 'in-progess' ? 
                'Processing...' : isPostProcessing.status === 'queued' || isMakeVideoDisable ? 'Queued for Shorts' : 'Make Video'}
          </ActionButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  )
}

