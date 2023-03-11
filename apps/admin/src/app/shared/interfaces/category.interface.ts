export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface ExampleSpecs {
  prefix: string;
  exclude?: string[];
}

export interface CategoryWorkshopDocument {
  _id?: string;
  name?: string;
  sortId: number;
}

export interface Category {
  _id?: string;
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id?: string;
  sortId: number;
  /** Display name of the doc item. */
  name?: string;
  /** Short summary of the doc item. */
  summary?: string;
  /** Package which contains the doc item. */
  packageName?: string;
  /** Specifications for which examples to be load. */
  exampleSpecs?: ExampleSpecs;
  /** List of examples. */
  examples?: string[];
  /** Optional id of the API document file. */
  apiDocId?: string;
  /** Optional path to the overview file of this doc item. */
  overviewPath?: string;
  /** List of additional API docs. */
  additionalApiDocs?: AdditionalApiDoc[];
  /** List of object ids for html documents */
  workshopDocuments?: CategoryWorkshopDocument[];
}
