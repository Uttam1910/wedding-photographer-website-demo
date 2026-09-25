export const eventTypes = ['Wedding', 'Engagement', 'Pre-Wedding', 'Couple Shoot', 'Event', 'Other'] as const
export type EventType = (typeof eventTypes)[number]
