import path from 'path';

export const env = process.env.NODE_ENV || 'development';
export const port = parseInt(process.env.PORT) || 3000;
export const OAS3SpecsFilePath = path.join(__dirname, '../swagger.yaml');
