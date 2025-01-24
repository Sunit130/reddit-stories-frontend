import styled from 'styled-components'
import { Edit, Trash2 } from 'lucide-react'
import { Card, IconButton, youtubeTheme } from './common/styled'

const ScriptCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

const ScriptContent = styled.div`
  flex: 1;
`

const ScriptTitle = styled.h3`
  color: ${youtubeTheme.textPrimary};
  margin: 0 0 8px 0;
  font-size: 16px;
`

const ScriptDescription = styled.p`
  color: ${youtubeTheme.textSecondary};
  margin: 0;
  font-size: 14px;
`

interface ScriptProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function Script({ title, description, onEdit, onDelete }: ScriptProps) {
  return (
    <ScriptCard>
      <ScriptContent>
        <ScriptTitle>{title}</ScriptTitle>
        <ScriptDescription>{description.slice(0,100)}</ScriptDescription>
      </ScriptContent>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <IconButton onClick={onEdit}>
          <Edit size={16} />
        </IconButton>
        <IconButton onClick={onDelete}>
          <Trash2 size={16} />
        </IconButton>
      </div>
    </ScriptCard>
  )
}

