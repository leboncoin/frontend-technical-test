/**
 * Layout contract shared between CSS and focus management.
 *
 * The breakpoint mirrors the media queries in the CSS modules (767.98px
 * closes the fractional-DPR gap between 1dppx screens).
 */
export const MOBILE_BREAKPOINT_QUERY = '(max-width: 767.98px)'

/**
 * DOM ids used to restore focus across pane switches: CSS may unmount/remount
 * a pane on mobile, so refs cannot survive the transition — the page finds
 * the element by id instead.
 */
export const NEW_CONVERSATION_BUTTON_ID = 'new-conversation-button'

export const conversationButtonId = (conversationId: number): string =>
  `conversation-${conversationId}`
