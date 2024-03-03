export interface IWorkshop {
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
  workshopDocuments: IWorkshopDocumentIdentifier[];
}

export interface IWorkshopDocumentIdentifier {
  // Object id of the workshop-document.
  _id: string;
  // Display name of the workshop-document.
  name: string;
  // Postion of the doc item in the section's list
  sortId: number;
}