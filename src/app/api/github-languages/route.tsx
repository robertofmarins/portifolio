import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Disable static rendering cache so that requests dynamically query GitHub APIs
export const revalidate = 0;

// Standard colors for fallback languages
const FALLBACK_COLORS: { [key: string]: string } = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
};

export async function GET(request: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const login = "robertofmarins";

    let languages: Array<{ name: string; percentage: number; color: string }> = [];
    let hasToken = false;

    if (token) {
      // 1. Fetch languages by byte size using GraphQL
      try {
        const query = `
          query userLanguages($login: String!) {
            user(login: $login) {
              repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                nodes {
                  languages(first: 10) {
                    edges {
                      size
                      node {
                        name
                        color
                      }
                    }
                  }
                }
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
          const repos = json.data.user.repositories?.nodes || [];
          const langMap: { [key: string]: { name: string; color: string; size: number } } = {};
          let totalSize = 0;

          for (const repo of repos) {
            const edges = repo.languages?.edges || [];
            for (const edge of edges) {
              const name = edge.node.name;
              const color = edge.node.color || '#cccccc';
              const size = edge.size;

              if (langMap[name]) {
                langMap[name].size += size;
              } else {
                langMap[name] = { name, color, size };
              }
              totalSize += size;
            }
          }

          if (totalSize > 0) {
            languages = Object.values(langMap)
              .map(lang => ({
                name: lang.name,
                color: lang.color,
                percentage: parseFloat(((lang.size / totalSize) * 100).toFixed(1)),
              }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 6); // Top 6 languages
            hasToken = true;
          }
        }
      } catch (err) {
        console.error("Error fetching languages GraphQL:", err);
      }
    }

    // Fallback: Fetch public repositories using REST API and group by primary language
    if (!hasToken) {
      try {
        const reposRes = await fetch(`https://api.github.com/users/${login}/repos?per_page=100`, {
          headers: { "User-Agent": "nextjs-readme-stats" }
        });

        if (reposRes.ok) {
          const repos = await reposRes.json();
          const langCountMap: { [key: string]: number } = {};
          let totalCount = 0;

          for (const repo of repos) {
            if (repo.language) {
              langCountMap[repo.language] = (langCountMap[repo.language] || 0) + 1;
              totalCount++;
            }
          }

          if (totalCount > 0) {
            languages = Object.entries(langCountMap)
              .map(([name, count]) => ({
                name,
                color: FALLBACK_COLORS[name] || '#cccccc',
                percentage: parseFloat(((count / totalCount) * 100).toFixed(1)),
              }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 6);
          }
        }
      } catch (err) {
        console.error("Error fetching REST languages:", err);
      }
    }

    // If no languages found at all, add defaults to prevent visual crash
    if (languages.length === 0) {
      languages = [
        { name: 'TypeScript', percentage: 65, color: '#3178c6' },
        { name: 'JavaScript', percentage: 25, color: '#f1e05a' },
        { name: 'HTML', percentage: 6, color: '#e34c26' },
        { name: 'CSS', percentage: 4, color: '#563d7c' },
      ];
    }

    // Generate top languages card as dynamic PNG image response fitting standard 495x195 dimensions
    return new ImageResponse(
      (
        <div
          style={{
            height: '195px',
            width: '495px',
            display: 'flex',
            flexDirection: 'column',
            background: '#0b0a15',
            fontFamily: 'sans-serif',
            color: '#f3f4f6',
            padding: '20px 24px',
            borderRadius: '8px',
            border: '1.5px solid #5a2ea6',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
          }}
        >
          {/* Header/Title */}
          <div style={{ display: 'flex', fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Linguagens Mais Usadas
          </div>

          {/* Segmented Progress Bar representing language distribution */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#1b1330',
              marginTop: '6px',
              marginBottom: '12px',
            }}
          >
            {languages.map((lang, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: lang.color,
                  width: `${lang.percentage}%`,
                  height: '100%',
                }}
              />
            ))}
          </div>

          {/* 2-Column List of Languages with Color Indicators and Percentages */}
          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', flexGrow: 1 }}>
            {/* Column 1: Items 0, 2, 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              {languages.filter((_, idx) => idx % 2 === 0).map((lang, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: lang.color,
                      marginRight: '8px',
                    }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', marginRight: '6px' }}>
                    {lang.name}
                  </span>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Column 2: Items 1, 3, 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              {languages.filter((_, idx) => idx % 2 !== 0).map((lang, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: lang.color,
                      marginRight: '8px',
                    }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', marginRight: '6px' }}>
                    {lang.name}
                  </span>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {lang.percentage}%
                  </span>
                </div>
              ))}
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
    console.error("Error in github-languages handler:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
