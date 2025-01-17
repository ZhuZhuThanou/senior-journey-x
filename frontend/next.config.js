// @ts-check

require('./open-telemetry.config')

const { i18n } = require('./next-i18next.config')
const { statSync } = require('fs')

// prettier-ignore
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://www.youtube.com; connect-src 'self' https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://*.omtrdc.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://*.omtrdc.net; frame-src 'self' https://*.demdex.net;" },
]

// prettier-ignore
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date(process.env.BUILD_DATE ?? statSync('package.json').mtime).toISOString().slice(0, 10),
    NEXT_PUBLIC_BUILD_ID: process.env.BUILD_ID ?? '0000',
    NEXT_PUBLIC_BUILD_REVISION: process.env.BUILD_REVISION ?? '00000000',
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date(process.env.BUILD_DATE ?? statSync('package.json').mtime).toISOString(),
    NEXT_PUBLIC_BUILD_VERSION: process.env.BUILD_VERSION ?? '00000000-0000-00000000',
    LOGGING_LEVEL: process.env.LOGGING_LEVEL ?? 'info',
  },
  generateBuildId: async () => (process.env.BUILD_ID ?? '0000'),
  headers: async () => ([{ source: '/:path*', headers: securityHeaders }]),
  i18n: { ...i18n, localeDetection: false },
  poweredByHeader: false,
  publicRuntimeConfig: {
    adobeAnalyticsScriptSrc: process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC ?? undefined,
    appBaseUri: process.env.NEXT_PUBLIC_APP_BASE_URI ?? '',
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? '',
  },
  reactStrictMode: true,
}

module.exports = nextConfig
