export function NotificationBadge({ count }) {
  if (!count) return null;
  return (
    <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs px-1">
      {count}
    </span>
  );
}
