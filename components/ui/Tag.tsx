import clsx from 'clsx'

interface TagProps {
  label: string
  className?: string
}

export default function Tag({ label, className }: TagProps) {
  return (
    <span className={clsx('tag', className)}>
      {label}
    </span>
  )
}
