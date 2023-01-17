import type { FC } from 'react'

export interface HeaderProps {
  title?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <header className="fixed top-0 left-0 w-full">
      <div className="mx-auto">
        {title}
      </div>
    </header>
  )
}

