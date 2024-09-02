export { default } from 'next-auth/middleware'
import { propertiesAddPath, profilePath, propertiesSavedPath, messagesPath } from './utils/paths'

export const config = {
    matcher: [propertiesAddPath, profilePath, propertiesSavedPath, messagesPath]
}