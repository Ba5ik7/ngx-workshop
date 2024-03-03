
export interface Sections { [key: string]: Section }
export interface Section {
  // Object id of the section item for mongo db.
  _id: string;
  // Section name.
  sectionTitle: string;
  // Short summary of the category item.
  summary: string;
  // Path to the SVG icon for the menu item buttons
  menuSvgPath: string;
  // Path to the SVG icon for the section header
  headerSvgPath: string;
}

export interface Workshop {
  // Object id of the category item for mongo db.
  _id: string;
  // Used to group to the sections
  sectionId: string;
  // Used to group all the workshop-documents
  workshopDocumentGroupId: string;
  // Postion of the doc item in the section's list
  sortId: number;
  // Display name of the category item.
  name: string;
  // Short summary of the category item.
  summary: string;
  thumbnail: string;
  // List of object ids for workshop-documents
  workshopDocuments: WorkshopDocumentIdentifier[];
}

export interface WorkshopDocumentIdentifier {
  // Object id of the workshop-document.
  _id: string;
  // Display name of the workshop-document.
  name: string;
  // Postion of the doc item in the section's list
  sortId: number;
}


export interface WorkshopDocument {
  // Object id of the document.
  _id: string,
  // Used to group all the workshop-documents to a workshop
  workshopGroupId: string,
  // Postion of the workshop-document item in the workshop's list
  sortId: number,
  // Display name of the workshop-document.
  name: string,
  // EXAM or PAGE
  pageType: string,
  // Last time the workshop-document was updated.
  lastUpdated: Date,
  // HTML content of the workshop-document.
  html: string
}
