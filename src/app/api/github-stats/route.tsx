import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Disable static rendering cache so that requests dynamically query GitHub APIs
export const revalidate = 0;

async function fetchYearlyContributions(login: string, year: number): Promise<number> {
  try {
    const res = await fetch(`https://github.com/users/${login}/contributions?from=${year}-01-01&to=${year}-12-31`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      }
    });
    if (!res.ok) return 0;
    const text = await res.text();
    const match = text.match(/([\d,]+)\s+contributions/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
  } catch (err) {
    console.error(`Error fetching contributions for ${year}:`, err);
    return 0;
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const login = "robertofmarins";

    let stats = {
      name: "Roberto Marins",
      login: login,
      avatarUrl: `https://github.com/${login}.png`,
      stars: 0,
      contributions: 0,
      prs: 0,
      followers: 0,
      repos: 0,
      hasToken: false,
    };

    // Parallel fetch contributions from the public profile scraper to bypass organization token limits
    const [c2023, c2024, c2025, c2026] = await Promise.all([
      fetchYearlyContributions(login, 2023),
      fetchYearlyContributions(login, 2024),
      fetchYearlyContributions(login, 2025),
      fetchYearlyContributions(login, 2026)
    ]);
    stats.contributions = c2023 + c2024 + c2025 + c2026;

    if (token) {
      try {
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
            alignItems: 'center',
            background: '#0b0a15',
            fontFamily: 'sans-serif',
            color: '#f3f4f6',
            padding: '20px 24px',
            borderRadius: '8px',
            border: '1.5px solid #5a2ea6',
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
              borderRight: '1px solid rgba(90, 46, 166, 0.25)',
              paddingRight: '16px',
              marginRight: '16px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stats.avatarUrl}
              alt="Avatar"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '36px',
                border: '1.5px solid #a78bfa',
                marginBottom: '10px',
              }}
            />
            <span style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', color: '#ffffff' }}>
              {stats.name}
            </span>
            <span style={{ fontSize: '12px', color: '#a78bfa', marginTop: '1px' }}>
              @{stats.login}
            </span>
          </div>

          {/* Right Panel: Clean list-based stats to completely prevent text truncation */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height: '100%',
              justifyContent: 'space-between',
              padding: '6px 0',
              boxSizing: 'border-box',
            }}
          >
            {/* Stat 1: Contributions */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '10px', width: '20px', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af', width: '120px' }}>Contribuições</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{stats.contributions}</span>
            </div>

            {/* Stat 2: Stars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '10px', width: '20px', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af', width: '120px' }}>Estrelas</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{stats.stars}</span>
            </div>

            {/* Stat 3: PRs */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '10px', width: '20px', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                  <line x1="6" y1="9" x2="6" y2="15" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af', width: '120px' }}>Pull Requests</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{stats.prs}</span>
            </div>

            {/* Stat 4: Followers */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '10px', width: '20px', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af', width: '120px' }}>Seguidores</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{stats.followers}</span>
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
