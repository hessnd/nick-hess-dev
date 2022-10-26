const RESUME_ENTRY_ID = '5UQDTfyesype3RiMfW2Ofh';

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getResume(preview: boolean) {
  try {
    const entries = await fetchGraphQL(
      `query {
        resume(id: "${RESUME_ENTRY_ID}", preview: ${
        preview ? 'true' : 'false'
      }) {
          name
          profile
          experienceCollection {
            items {
              ... on Job {
                name
                title
                startDate
                endDate
                currentPosition
                details
                jobTitlesCollection {
                  items {
                    ... on JobTitle {
                      title
                      startDate
                      endDate
                      currentPosition
                    }
                  }
                }
              }
            }
          }
          skills {
            name
          }
        }
      }`,
      preview
    );
    return entries.data.resume;
  } catch (error) {
    throw new Error('Could not fetch resume');
  }
}
