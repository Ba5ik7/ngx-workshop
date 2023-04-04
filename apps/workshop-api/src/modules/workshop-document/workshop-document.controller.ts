import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { IWorkshopDocument } from '../../interfaces/workshop-document.interface';
import { WorkshopDocumentService } from './workshop-document.service';

@Controller('workshop')
export class WorkshopController {
  constructor(private workshopService: WorkshopDocumentService) {}

  @Auth(AuthType.None)
  @Get('workshops')
  workshops(): Promise<IWorkshopDocument[]> {
    return this.workshopService.findAll();
  }

  @Auth(AuthType.None)
  @Get(':objectId')
  workshop(@Param('objectId') objectId): Promise<IWorkshopDocument> {
    return this.workshopService.getWorkshop(objectId);
  }

  @Roles(Role.Admin)
  @Post('update-workshop-html')
  async updateWorkshopHtml(
    @Body() { html, _id }: { html: string; _id: string },
  ): Promise<IWorkshopDocument> {
    return await this.workshopService.updateWorkshopHtml(_id, html);
  }
}
