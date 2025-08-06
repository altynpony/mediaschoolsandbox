import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const defaultLocale = (request.headers.get('i18nl') || 'ru') as 'en'|'ru'
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localePrefix: 'as-needed'
  });

  const response = handleI18nRouting(request)

  response.headers.set('i18nl', defaultLocale)

  return response;
}
//export default createMiddleware(routing);
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|admin|_next|_vercel|.*\\..*).*)'
};