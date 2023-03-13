export interface ISection {
  _id: string;
  sectionTitle: string;
  summary: string;
  menuSvgPath: string;
  headerSvgPath: string;
  categoriesLastUpdated: string;
}

// const ANGULAR: string = 'angular';
// const NESTJS: string = 'nestjs';
// const RXJS: string = 'rxjs';
// export const SECTIONS: { [key: string]: ISection } = {
//   [ANGULAR]: {
//     sectionTitle: 'Angular',
//     summary: 'Angular Material offers a wide variety of UI components based on the',
//     menuSvgPath: '/assets/img/angular-white-transparent.svg',
//     headerSvgPath: '/assets/img/angular.svg'
//   },
//   [NESTJS]: {
//     sectionTitle: 'Nest JS',
//     summary: 'The Component Dev Kit (CDK) is a set of behavior primitives for building UI' ,
//     menuSvgPath: '/assets/img/nestjs-white.svg',
//     headerSvgPath: '/assets/img/nestjs.svg'
//   },
//   [RXJS]: {
//     sectionTitle: 'RxJS',
//     summary: 'The Component Dev Kit (CDK) is a set of behavior primitives for building UI',
//     menuSvgPath: '/assets/img/rxjs-white.svg',
//     headerSvgPath: '/assets/img/rxjs.svg'
//   }
// };
