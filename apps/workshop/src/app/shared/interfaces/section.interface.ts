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
