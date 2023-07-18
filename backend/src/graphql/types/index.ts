import path from 'path';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typesArray = loadFilesSync(path.join(__dirname), { extensions: ['graphql'] });
const typeDefs = mergeTypeDefs(typesArray);

export { typeDefs };
