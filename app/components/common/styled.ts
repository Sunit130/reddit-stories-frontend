import styled from 'styled-components'

export const youtubeTheme = {
  background: '#0f0f0f',
  surface: '#282828',
  primary: '#ff0000',
  textPrimary: '#ffffff',
  textSecondary: '#aaaaaa',
  hover: '#3f3f3f',
}

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${youtubeTheme.textSecondary};
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
  box-sizing: border-box;
  
  &:hover {
    color: #fff;
  }
`

export const Card = styled.div`
  background: ${youtubeTheme.surface};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 290px));
  gap: 24px;
  padding: 16px;
  justify-content: center;
`

export const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'inactive' }>`
  background: ${youtubeTheme.primary};
  color: ${youtubeTheme.textPrimary};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #ff0000;
          &:hover { background-color:rgb(214, 0, 0); }
        `
      case 'secondary':
        return `
          background-color: transparent;
          border: 1px solid #374151;
          color: #f8fafc;
          &:hover { background-color: #1f2937; }
        `
      case 'danger':
        return `
          color: #ef4444;
          &:hover { background-color: #1f2937; }
        `
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid #ff0000;
          color: #f8fafc;
          &:hover { border: 1px solid #ff0000; }
        `
      case 'inactive':
        return `
          background-color: rgb(206, 206, 206);
          color: rgb(58, 58, 58);
          cursor: not-allowed;
          pointer-events: none;
        `
      default:
        return `
          background-color: #ff0000;
          &:hover { background-color:rgb(214, 0, 0); }
        `
    }
  }}
`



export const MainContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen?: boolean }>`
  transition: margin 0.3s;
  margin-left: ${props => props.isOpen ? "220px" : "0px"};
  min-height: 100vh;
  background: ${youtubeTheme.background};
  color: ${youtubeTheme.textPrimary};
  padding: 24px;
`

export const Section = styled.section`
  margin-bottom: 32px;
`

export const SectionTitle = styled.h2`
  color: ${youtubeTheme.textPrimary};
  margin: 41px 0 16px 16px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

`
