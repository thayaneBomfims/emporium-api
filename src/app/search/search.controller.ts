import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ReturnDto } from '../utils/return.dto';

@ApiTags('Search')
@Controller('api/v1/search')
export class SearchController {

    constructor(private readonly searchService: SearchService) { }

    @Get()
    async searchTerm(@Query('q') term: string) {
        return <ReturnDto>{
            status: HttpStatus.OK,
            records: await this.searchService.searchDatabase(term)
        };

    }
}
