import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { IWorkshopDocument } from '../../interfaces/workshop-document.interface';
import {
  IWorkshopDocumentIdentifier,
  IWorkshop,
} from '../../interfaces/workshop.interface';
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
  @Get('workshops')
  workshops(@Query('section') section: string): Promise<IWorkshop[]> {
    return this.navigationService.findAllWorkshopsInSection(section);
  }

  @Roles(Role.Admin)
  @Post('workshop/create-workshop')
  async createWorkshop(@Body() workshop: IWorkshop): Promise<IWorkshop> {
    return await this.navigationService.createWorkshop(workshop);
  }

  @Roles(Role.Admin)
  @Post('workshop/edit-workshop-name-and-summary')
  async editWorkshopNameAndSummary(
    @Body() workshop: IWorkshop,
  ): Promise<IWorkshop> {
    return await this.navigationService.editWorkshopNameAndSummary(workshop);
  }

  @Roles(Role.Admin)
  @Post('workshop/delete-workshop-and-workshops')
  async deleteWorkshopAndWorkshops(
    @Body() body: { _id: string },
  ): Promise<{id: string}> {
    await this.navigationService.deleteWorkshopAndWorkshops(body._id);
    return { id: body._id };
  }

  @Roles(Role.Admin)
  @Post('workshop/sort-categories')
  async sortWorkshops(@Body() categories: IWorkshop[]): Promise<any> {
    return await this.navigationService.sortWorkshops(categories);
  }

  @Roles(Role.Admin)
  @Post('page/create-page')
  async createPage(
    @Body() { page, workshopId }: { page: IWorkshopDocument, workshopId: string },
  ): Promise<IWorkshop> {
    return await this.navigationService.createPage(page, workshopId);
  }

  @Roles(Role.Admin)
  @Post('page/delete-page-and-update-workshop')
  async deletePageAndUpdateWorkshop(
    @Body() page: IWorkshopDocument,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return await this.navigationService.deletePageAndUpdateWorkshop(
      page._id,
      page.workshopGroupId,
    );
  }

  @Roles(Role.Admin)
  @Post('page/edit-page-name-update-workshop')
  async editPageNameUpdateWorkshop(
    @Body() page: IWorkshopDocument,
  ): Promise<IWorkshop> {
    return await this.navigationService.editPageNameUpdateWorkshop(page);
  }

  @Roles(Role.Admin)
  @Post('page/sort-pages')
  async sortPages(
    @Body() pages: IWorkshopDocumentIdentifier[],
    @Query('workshopId') workshopId: string,
  ): Promise<IWorkshop> {
    return await this.navigationService.sortPages(pages, workshopId);
  }
}
