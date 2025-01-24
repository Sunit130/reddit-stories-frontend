import styled from 'styled-components'
import { Home, BookCheck, ScrollText, Menu, CircleDollarSign } from 'lucide-react'
import { IconButton, youtubeTheme } from './common/styled'
import Link from 'next/link'
import { useReditRotContext } from '@/context/ReditRotContext'

const SidebarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  background: ${youtubeTheme.background};
  width: ${props => props.isOpen ? '220px' : '0px'};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 10;
`

const NavItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${props => props.isActive ? youtubeTheme.textPrimary : youtubeTheme.textSecondary};
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background: ${youtubeTheme.hover};
  }

  span {
    margin-left: 16px;
  }
`

const MenuButton = styled(IconButton)`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 20;
  background: ${youtubeTheme.background};
  border-radius: 50%;
  padding: 8px;
`

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  const {state, dispatch} = useReditRotContext();

  const onMenuClickHandler = () => {
    onToggle();
    console.log("STATE : ", state);
    dispatch({type: "setIsLeftSideOpen", value: !isOpen});
  }

  return (
    <>
      <MenuButton onClick={onMenuClickHandler}>
        <Menu color={youtubeTheme.textPrimary} />
      </MenuButton>
      
      <SidebarWrapper isOpen={isOpen}>
        <div style={{ height: '56px' }} />
        <Link href="/" passHref>
          <NavItem isActive={true}>
            <Home size={20} />
            <span>Dashboard</span>
          </NavItem>
        </Link>
        <Link href="/public-videos" passHref>
          <NavItem>
            <CircleDollarSign size={20} />
            <span>Public</span>
          </NavItem>
        </Link>
        <Link href="/video-ready" passHref>
          <NavItem>
            <BookCheck size={20} />
            <span>Video Ready</span>
          </NavItem>
        </Link>
        <Link href="/content-scripts" passHref>
          <NavItem>
            <ScrollText size={20} />
            <span>Scripts</span>
          </NavItem>
        </Link>

      </SidebarWrapper>
    </>
  )
}

