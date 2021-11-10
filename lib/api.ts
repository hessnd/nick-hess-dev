const EMPLOYER_GRAPHQL_FEILDS = `
  name
`

async function fetchGraphQL(query: any, preview: boolean = false) {
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
  ).then((response) => response.json())
}

function extractEmployerEntries(fetchResponse: any) {
  return fetchResponse?.data?.employerCollection?.items;
}

export async function getEmployers(preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      employerCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${EMPLOYER_GRAPHQL_FEILDS}
        }
      }
    }`,
    preview
  )
  return extractEmployerEntries(entries)
}