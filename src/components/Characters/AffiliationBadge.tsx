import { Badge } from '@/components/shared/Badge'
import { cn } from '@/lib/utils/utils'

const AffiliationColors: Record<string, string> = {
  'Z Fighter': 'bg-affiliation-z-fighter text-white',
  'Army of Frieza': 'bg-affiliation-frieza-army text-white',
  Freelancer: 'bg-affiliation-freelancer text-white',
  Other: 'bg-affiliation-other text-white',
  Villain: 'bg-affiliation-villain text-white',
  'Assistant of Beerus': 'bg-affiliation-beerus text-white',
  'Pride Troopers': 'bg-affiliation-pride-troopers text-white',
  'Assistant of Vermoud': 'bg-affiliation-vermoud text-white',
}

type AffiliationBadgeProps = { affiliation: string } & Omit<
  React.ComponentProps<typeof Badge>,
  'children' | 'variant'
>

export function AffiliationBadge({ affiliation, className, ...props }: AffiliationBadgeProps) {
  const colorClass = AffiliationColors[affiliation] ?? AffiliationColors.Other
  return (
    <Badge className={cn(colorClass, className)} {...props}>
      {affiliation}
    </Badge>
  )
}
