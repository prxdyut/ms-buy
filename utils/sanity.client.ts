import { ClientConfig, createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const clientConfig: ClientConfig = {
  projectId,
  dataset,
  useCdn: false,
};

export const client = createClient(clientConfig);

/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/

