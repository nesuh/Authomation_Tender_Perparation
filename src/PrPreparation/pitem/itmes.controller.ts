import { Controller ,Post,Headers} from "@nestjs/common";
import { ItemService } from "./items.service";
@Controller('items')
export class itemsControllor{
    constructor(
        private readonly itemsService: ItemService
    ){}
@Post('create')
async createItemData(  @Headers('Authorization') authHeader: string){
  return this.itemsService.createItemData();
}

}
