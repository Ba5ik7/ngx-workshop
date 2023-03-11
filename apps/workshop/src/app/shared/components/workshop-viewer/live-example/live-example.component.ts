// import {
//   Component,
//   ElementRef,
//   HostBinding,
//   Input,
//   Type,
//   ɵNgModuleFactory
// } from '@angular/core';
// import { EXAMPLE_COMPONENTS, LiveExample } from '@tmdjr/workshop-examples';

// export type Views = 'snippet' | 'full' | 'demo';

// @Component({
//   selector: 'live-example',
//   templateUrl: './live-example.component.html',
//   styleUrls: ['./live-example.component.scss']
// })
// export class LiveExampleComponent {

//   /** Module factory that declares the example component. */
//   exampleModuleFactory: ɵNgModuleFactory<any> | null = null;

//   /** Component type for the current example. */
//   exampleComponentType: Type<any> | null = null;

//   /** Data for the currently selected example. */
//   exampleData: LiveExample | null = null;

//   /** Whether to show toggle for compact view. */
//   @Input() showCompactToggle = false;

//   /** View of the example component. */
//   @Input() view: Views | undefined;

//   /** Name of file to display in compact view. */
//   @Input() file?: string;

//   /** Range of lines of the source code to display in compact view. */
//   @Input() region?: string;

//   /** String key of the currently displayed example. */
//   @HostBinding('attr.id')
//   @Input()
//   get example() {
//     return this._example;
//   }
//   set example(exampleName: string | undefined) {
//     if (exampleName && exampleName !== this._example && EXAMPLE_COMPONENTS[exampleName]) {
//       this._example = exampleName;
//       this.exampleData = EXAMPLE_COMPONENTS[exampleName];
//       this.loadExampleComponent().catch((error) =>
//         console.error(`Could not load example '${exampleName}': ${error}`));
//     } else {
//       console.error(`Could not find example: ${exampleName}`);
//     }
//   }
//   private _example: any; 

//   constructor(private readonly elementRef: ElementRef<HTMLElement>) { }

//   /** Loads the component and module factory for the currently selected example. */
//   private async loadExampleComponent() {
//     if (this._example != null) {
//       let { componentName, module } = EXAMPLE_COMPONENTS[this._example];
//       // Lazily loads the example package that contains the requested example. Webpack needs to be
//       // able to statically determine possible imports for proper chunk generation. Explicitly
//       // specifying the path to the `fesm2015` folder as first segment instructs Webpack to generate
//       // chunks for each example flat esm2015 bundle. To avoid generating unnecessary chunks for
//       // source maps (which would never be loaded), we instruct Webpack to exclude source map
//       // files. More details: https://webpack.js.org/api/module-methods/#magic-comments.
//       // module.importSpecifier = 'src/lib/feature-a';
//       const moduleExports: any = await import(
//         /* webpackExclude: /\.map$/ */
//       '@tmdjr/workshop-examples/esm2020/' + module.importSpecifier);

//       // componentName = AutocompleteSimpleExample
//       this.exampleComponentType = moduleExports[componentName];
//       // this.exampleComponentType = moduleExports[componentName];
//       // The components examples package is built with Ivy. This means that no factory files are
//       // generated. To retrieve the factory of the AOT compiled module, we simply pass the module
//       // class symbol to Ivy's module factory constructor. There is no equivalent for View Engine,
//       // where factories are stored in separate files. Hence the API is currently Ivy-only.
//       // module.name = AutocompleteExamplesModule
//       this.exampleModuleFactory = new ɵNgModuleFactory(moduleExports[module.name]);

//       // Since the data is loaded asynchronously, we can't count on the native behavior
//       // that scrolls the element into view automatically. We do it ourselves while giving
//       // the page some time to render.
//       if (typeof location !== 'undefined' && location.hash.slice(1) === this._example) {
//         setTimeout(() => this.elementRef.nativeElement.scrollIntoView(), 300);
//       }
//     }
//   }

// }
