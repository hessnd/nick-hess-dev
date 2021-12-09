const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || '';
const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || '';
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || '';

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractEmployerEntries(fetchResponse: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return fetchResponse?.data?.jobCollection?.items;
}

// eslint-disable-next-line import/prefer-default-export
export async function getEmployers(preview: boolean) {
  try {
    const entries: any = await fetchGraphQL(
      `query {
        jobCollection(preview: ${preview ? 'true' : 'false'}) {
          items {
            name
          }
        }
      }`,
      preview
    );
    return extractEmployerEntries(entries);
  } catch (error) {
    throw new Error('Could not fetch');
  }
}
