/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PopularGuidesQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularGuidesQuery = { popularGuides: Array<{ id: string, slug: string, title: string, region: string, difficulty: string, published: boolean, length_km: number, body_html: string, hero_image: string | null, updated_at: string }> };

export type ToursQueryVariables = Exact<{ [key: string]: never; }>;


export type ToursQuery = { tours: Array<{ id: string, title: string, distanceM: number, user: { displayName: string }, guide: { title: string } | null, photos: Array<{ id: string }> }> };


export const PopularGuidesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PopularGuides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularGuides"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"6"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","alias":{"kind":"Name","value":"length_km"},"name":{"kind":"Name","value":"lengthKm"}},{"kind":"Field","alias":{"kind":"Name","value":"body_html"},"name":{"kind":"Name","value":"bodyHtml"}},{"kind":"Field","alias":{"kind":"Name","value":"hero_image"},"name":{"kind":"Name","value":"heroImage"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","alias":{"kind":"Name","value":"updated_at"},"name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PopularGuidesQuery, PopularGuidesQueryVariables>;
export const ToursDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"distanceM"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"guide"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ToursQuery, ToursQueryVariables>;