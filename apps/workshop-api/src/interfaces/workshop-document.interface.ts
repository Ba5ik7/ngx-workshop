export interface IWorkshopDocument {
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