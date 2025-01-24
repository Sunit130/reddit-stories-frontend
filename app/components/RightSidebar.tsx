"use client"
import { useState } from 'react'
import styled from 'styled-components'
import { GripVertical, ChevronRight, Edit } from 'lucide-react'
import { IconButton, Card, youtubeTheme } from './common/styled'
import { useReditRotContext } from '@/context/ReditRotContext'
import { ScriptEditModal } from './ScriptEditModal'
import { RedditPost } from '../types'

const SidebarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  background: ${youtubeTheme.background};
  width: 300px;
  height: 100vh;
  position: fixed;
  right: ${props => props.isOpen ? '0' : '-300px'};
  top: 0;
  transition: right 0.3s;
  z-index: 10;
  padding: 16px;
`

const ToggleButton = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  position: fixed;
  right: ${props => props.isOpen ? '316px' : '16px'};
  top: 12px;
  transition: right 0.3s;
  background: ${youtubeTheme.background};
  border-radius: 50%;
  padding: 8px;
  transform: rotate(${props => props.isOpen ? '0deg' : '180deg'});
`

const QueuedMessage = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${youtubeTheme.textPrimary};
  
  &:hover {
    background: ${youtubeTheme.hover};
  }
`

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: grab;
  color: ${youtubeTheme.textSecondary};
  
  &:hover {
    color: ${youtubeTheme.textPrimary};
  }
`

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function RightSidebar({ isOpen, onToggle }: RightSidebarProps) {
  const {state, dispatch} = useReditRotContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<{ id: string; title: string; description: string}>();
  
  const handleScriptEdit = (post: RedditPost) => {
    const scriptData = {
      id: post["post_id"],
      title: post["post_revised_title"],
      description: post["post_revised_content"],
    }
    setSelectedScript(scriptData);
    setModalOpen(true);
  };

  const onToggleBtnHandler = () => {
    onToggle();
    dispatch({type: "setIsRightSideOpen", value: !isOpen});
  }

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={onToggleBtnHandler}>
        <ChevronRight color={youtubeTheme.textPrimary} />
      </ToggleButton>
      
      <SidebarWrapper isOpen={isOpen}>
        <h3 style={{ color: youtubeTheme.textPrimary, marginBottom: '16px' }}>Queued Messages</h3>
        
        {state.priorityQueue && state.priorityQueue.map((post, index) => (
          <QueuedMessage 
            key={`${post["post_id"]}-${index}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '50px', overflow: 'hidden', textWrap: 'nowrap' }}>
              <DragHandle>
                <GripVertical size={16} />
              </DragHandle>
              <span>{post["post_revised_title"]}</span>
            </div>
            <IconButton onClick={() => {handleScriptEdit(post)}}>
              <Edit size={16} />
            </IconButton>
          </QueuedMessage>
        ))}
      </SidebarWrapper>
      <ScriptEditModal
        isOpen={modalOpen}
        isMakeVideoDisable={true}
        onClose={() => setModalOpen(false)}
        scriptData={selectedScript}
      />
    </>
  )
}

