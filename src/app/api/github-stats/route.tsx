import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Disable static rendering cache so that requests dynamically query GitHub APIs
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const login = "robertofmarins";

    let stats = {
      name: "Roberto Marins",
      login: login,
      avatarUrl: `https://github.com/${login}.png`,
      stars: 0,
      commits: 0,
      prs: 0,
      followers: 0,
      repos: 0,
      hasToken: false,
    };

    if (token) {
      try {
        // Query user info and contributions collection for each year since creation (2023-2026)
        const query = `
          query userInfo($login: String!) {
            user(login: $login) {
              name
              login
              avatarUrl
              followers {
                totalCount
              }
              repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                nodes {
                  stargazers {
                    totalCount
                  }
                }
              }
              pullRequests {
                totalCount
              }
              y2023: contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
                totalCommitContributions
                restrictedContributionsCount
              }
              y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
                totalCommitContributions
                restrictedContributionsCount
              }
              y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
                totalCommitContributions
                restrictedContributionsCount
              }
              y2026: contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
                totalCommitContributions
                restrictedContributionsCount
              }
            }
          }
        `;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "nextjs-readme-stats",
          },
          body: JSON.stringify({ query, variables: { login } }),
        });

        const json = await res.json();
        
        if (json.data && json.data.user) {
          const user = json.data.user;
          stats.name = user.name || stats.name;
          stats.avatarUrl = user.avatarUrl || stats.avatarUrl;
          stats.followers = user.followers?.totalCount || 0;
          
          // Calculate total stars
          const repos = user.repositories?.nodes || [];
          stats.stars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers?.totalCount || 0), 0);
          stats.repos = repos.length;

          // Calculate PRs
          stats.prs = user.pullRequests?.totalCount || 0;

          // Calculate total lifetime commits (public + private restricted contributions) from 2023 to 2026
          const commitSum = 
            (user.y2023?.totalCommitContributions || 0) + (user.y2023?.restrictedContributionsCount || 0) +
            (user.y2024?.totalCommitContributions || 0) + (user.y2024?.restrictedContributionsCount || 0) +
            (user.y2025?.totalCommitContributions || 0) + (user.y2025?.restrictedContributionsCount || 0) +
            (user.y2026?.totalCommitContributions || 0) + (user.y2026?.restrictedContributionsCount || 0);

          stats.commits = commitSum;
          stats.hasToken = true;
        }
      } catch (err) {
        console.error("Error fetching GitHub GraphQL API:", err);
      }
    }

    // Fallback to REST API if GraphQL query failed or no token was provided
    if (!stats.hasToken) {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${login}`, {
            headers: { "User-Agent": "nextjs-readme-stats" }
          }),
          fetch(`https://api.github.com/users/${login}/repos?per_page=100`, {
            headers: { "User-Agent": "nextjs-readme-stats" }
          })
        ]);

        if (userRes.ok) {
          const user = await userRes.json();
          stats.name = user.name || stats.name;
          stats.avatarUrl = user.avatar_url || stats.avatarUrl;
          stats.followers = user.followers || 0;
          stats.repos = user.public_repos || 0;
          stats.commits = 258; // Hard fallback
        }

        if (reposRes.ok) {
          const repos = await reposRes.json();
          stats.stars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
        }
      } catch (err) {
        console.error("Error fetching GitHub REST API:", err);
      }
    }

    // Generate dynamic card as PNG image response fitting standard 495x195 dimensions
    return new ImageResponse(
      (
        <div
          style={{
            height: '195px',
            width: '495px',
            display: 'flex',
            padding: '2px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)',
            borderRadius: '14px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              background: '#090514',
              fontFamily: 'sans-serif',
              color: '#f3f4f6',
              padding: '18px 20px',
              borderRadius: '12px',
              boxSizing: 'border-box',
            }}
          >
            {/* Left Panel: Profile Avatar & Nickname */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '135px',
                borderRight: '1px solid rgba(139, 92, 246, 0.25)',
                paddingRight: '14px',
                marginRight: '16px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stats.avatarUrl}
                alt="Avatar"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '34px',
                  border: '2px solid #ec4899',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.4)',
                  marginBottom: '8px',
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', color: '#ffffff' }}>
                {stats.name}
              </span>
              <span style={{ fontSize: '11px', color: '#a78bfa', marginTop: '1px' }}>
                @{stats.login}
              </span>
            </div>

            {/* Right Panel: Grid Stats with explicit row divs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              {/* Row 1 */}
              <div style={{ display: 'flex', width: '100%', marginBottom: '14px' }}>
                {/* Stat 1: Stars */}
                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <div style={{ display: 'flex', background: 'rgba(236, 72, 153, 0.12)', padding: '6px', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ec4899" stroke="#ec4899" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Estrelas</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{stats.stars}</span>
                  </div>
                </div>

                {/* Stat 2: Commits */}
                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <div style={{ display: 'flex', background: 'rgba(139, 92, 246, 0.12)', padding: '6px', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3" />
                      <line x1="3" y1="12" x2="9" y2="12" />
                      <line x1="15" y1="12" x2="21" y2="12" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Commits</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{stats.commits}</span>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'flex', width: '100%' }}>
                {/* Stat 3: PRs */}
                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <div style={{ display: 'flex', background: 'rgba(16, 185, 129, 0.12)', padding: '6px', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                      <line x1="6" y1="9" x2="6" y2="15" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Pull Requests</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{stats.prs}</span>
                  </div>
                </div>

                {/* Stat 4: Followers */}
                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <div style={{ display: 'flex', background: 'rgba(59, 130, 246, 0.12)', padding: '6px', borderRadius: '8px', marginRight: '10px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Seguidores</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{stats.followers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 495,
        height: 195,
      }
    );
  } catch (error: any) {
    console.error("Error in github-stats handler:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
