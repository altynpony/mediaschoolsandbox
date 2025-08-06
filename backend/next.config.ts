import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  experimental: {
    //dynamicIO: true,
    useCache: true,
    cacheLife: {
      oneDay: {
        stale: 60 * 60 * 24,      // 1 day
        revalidate: 60 * 60 * 12  // 12 hours
      }
    }
  },
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
