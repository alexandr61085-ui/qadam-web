// AASA route handler — serves apple-app-site-association with correct Content-Type
// Apple CDN requires: Content-Type: application/json, HTTP 200, no redirect
// appIDs format: <TEAM_ID>.<BUNDLE_ID> = A7D32WM3T6.com.getqadam.app
// Paths: only /event/* and /club/* — not wildcard /* (security: limit to app-handled routes)

const aasa = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ['A7D32WM3T6.com.getqadam.app'],
        paths: ['/event/*', '/club/*'],
      },
    ],
  },
}

export async function GET() {
  return new Response(JSON.stringify(aasa), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
