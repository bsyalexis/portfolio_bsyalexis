import clsx from 'clsx'

interface ButtonProps {
  label: string
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ label, href, variant = 'primary', className }: ButtonProps) {
  const classes = clsx('btn', `btn-${variant}`, className)

  if (href) {
    return <a href={href} className={classes}>{label}</a>
  }
  return <button className={classes}>{label}</button>
}
