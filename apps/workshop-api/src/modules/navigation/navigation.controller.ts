import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { IWorkshopDocument } from '../../interfaces/workshop.interface';
import {
  CategoryWorkshopDocument,
  ICategory,
} from '../../interfaces/category.interface';
import { ISection } from '../../interfaces/section.interface';
import { NavigationService } from './navigation.service';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';

@Controller('navigation')
export class NavigationController {
  constructor(private navigationService: NavigationService) {}

  @Auth(AuthType.None)
  @Get('sections')
  sections(): Promise<{ [key: string]: ISection }> {
    return this.navigationService.findAllSections();
  }

  @Auth(AuthType.None)
  @Get('categories')
  categories(@Query('section') section: string): Promise<ICategory[]> {
    return this.navigationService.findAllCategoriesInSection(section);
  }

  @Roles(Role.Admin)
  @Post('category/create-category')
  async createCategory(@Body() category: ICategory): Promise<ICategory> {
    return await this.navigationService.createCategory(category);
  }

  @Roles(Role.Admin)
  @Post('category/edit-category-name-and-summary')
  async editCategoryNameAndSummary(
    @Body() category: ICategory,
  ): Promise<ICategory> {
    return await this.navigationService.editCategoryNameAndSummary(category);
  }

  @Roles(Role.Admin)
  @Post('category/delete-category-and-workshops')
  async deleteCategoryAndWorkshops(
    @Body() body: { _id: string },
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.navigationService.deleteCategoryAndWorkshops(body._id);
  }

  @Roles(Role.Admin)
  @Post('category/sort-categories')
  async sortCategories(@Body() categories: ICategory[]): Promise<any> {
    return await this.navigationService.sortCategories(categories);
  }

  @Roles(Role.Admin)
  @Post('page/create-page')
  async createPage(
    @Body() page: IWorkshopDocument,
  ): Promise<IWorkshopDocument> {
    return await this.navigationService.createPage(page);
  }

  @Roles(Role.Admin)
  @Post('page/delete-page-and-update-category')
  async deletePageAndUpdateCategory(
    @Body() page: IWorkshopDocument,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.navigationService.deletePageAndUpdateCategory(
      page._id,
      page.category._id,
    );
  }

  @Roles(Role.Admin)
  @Post('page/edit-page-name-update-category')
  async editPageNameUpdateCategory(
    @Body() page: IWorkshopDocument,
  ): Promise<ICategory> {
    return await this.navigationService.editPageNameUpdateCategory(page);
  }

  @Roles(Role.Admin)
  @Post('page/sort-pages')
  async sortPages(
    @Body() pages: CategoryWorkshopDocument[],
    @Query('categoryId') categoryId: string,
  ): Promise<ICategory> {
    return await this.navigationService.sortPages(pages, categoryId);
  }
}
