/// <reference types="next" />
/// <reference types="next/types/global" />

// To allow the frontend (Next) to be able to read .graphqls files
declare module '*.graphqls' {
  import { DocumentNode } from 'graphql';
  export default typeof DocumentNode;
}

// to read .yml files
declare module '*.yml';
