import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFilm } from 'apps/film/src/dto/create.film.dto';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from 'apps/user/src/guard/Auth.guard';
import { EditFIlm } from 'apps/film/src/dto/edit.film.dto';
import { EditGenre } from 'apps/film/src/genre/dto/editGenre.dto';
import { CreatePerson } from 'apps/person/src/dto/create.person.dto';
import { CreateUser } from 'apps/user/src/dto/create.user.dto';
import { LoginUser } from 'apps/user/src/dto/login.user.dto';
import { GoogleAuthGuard } from 'apps/user/src/Strategy/Google/Guards';
import { VKAuthGuard } from 'apps/user/src/Strategy/Vk/Guards';
import { Response, Request } from 'express';
import { CreateComment } from 'apps/comment/src/dto/create.comment.dto';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Filter } from 'apps/film/src/dto/filter.dto';
import { Search } from 'apps/film/src/dto/search.dto';
import { Evaluate } from 'apps/film/src/dto/evaluate.dto';
import { GetFilm } from 'apps/film/src/dto/get.film.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('FILM') private readonly client: ClientProxy,
    private readonly apiGatewayService: ApiGatewayService,
  ) {}

  @Post('film/create')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: { allOf: [{ $ref: getSchemaPath(CreateFilm) }] },
  })
  @UseGuards(AuthGuard)
  @SetMetadata('role', 1)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './apps/film/filmImages/', //creating file in local folder
        filename: (req, image, cb) => {
          const filename: string =
            path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4(); //originalName+randomwords
          const extension: string = path.parse(image.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async create(
    @Body() createFilm: CreateFilm,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const data = await lastValueFrom(
      this.client.send('film/create', { createFilm, image }),
    );
    await lastValueFrom(this.client.send('personfilm/create', data));
    return HttpStatus.CREATED;
  }

  @Get('film/filter')
  @ApiResponse({
    status: 200,
    description: 'Filtered Films',
    schema: { allOf: [{ $ref: getSchemaPath(Filter) }] },
  })
  async getByFilter(@Query() filterBy: Filter) {
    return await lastValueFrom(this.client.send('film/filter', filterBy));
  }

  @Get('film/search')
  async getBySearch(@Query() searchBy: Search) {
    const personData = await lastValueFrom(
      this.client.send('person/search', searchBy),
    );
    return await lastValueFrom(
      this.client.send('film/search', { searchBy, personData }),
    );
  }

  @Put('film/evaluate')
  async evaluate(@Body() data: Evaluate) {
    return await lastValueFrom(this.client.send('film/evaluate', data));
  }

  @Get('film/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully gate.',
    schema: { allOf: [{ $ref: getSchemaPath(CreateFilm) }] },
  })
  async get(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('film/:id', id));
  }

  @Delete('film/delete/:id')
  @UseGuards(AuthGuard)
  @SetMetadata('role', 1)
  async deleteFilm(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('film/delete/:id', id));
  }

  @Get('film/:id/comments')
  @ApiResponse({
    status: 200,
    schema: { allOf: [{ $ref: getSchemaPath(CreateComment) }] },
  })
  async getComments(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('film/:id/comments', id));
  }

  @Put('film/edit/:id')
  @UseGuards(AuthGuard)
  @SetMetadata('role', 1)
  async editFilm(@Param('id') id: number, @Body() editFilmDto: EditFIlm) {
    return await lastValueFrom(
      this.client.send('film/edit/:id', { id, editFilmDto }),
    );
  }

  @Put('genre/edit/:id')
  @UseGuards(AuthGuard)
  @SetMetadata('role', 1)
  async editGenre(@Param('id') id: number, @Body() genreDto: EditGenre) {
    return await lastValueFrom(
      this.client.send('genre/edit/:id', { id, genreDto }),
    );
  }

  @Get('country/getAll')
  async countries(){
    return await lastValueFrom(this.client.send('country/getAll', {}));
  }

  @Get('badge/getAll')
  async badges(){
    return await lastValueFrom(this.client.send('badge/getAll', {}));
  }

  @Get('genre/getAll')
  async genres() {
    return await lastValueFrom(this.client.send('genre/getAll', {}));
  }

  @Get('personfilm/:id')
  async getbyId(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('personfilm/:id', id));
  }

  @Get('person/:id')
  async getPerson(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('person/:id', id));
  }

  @Post('person/create')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: { allOf: [{ $ref: getSchemaPath(CreatePerson) }] },
  })
  @UseGuards(AuthGuard)
  @SetMetadata('role', 1)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './apps/person/personImages/', //creating file in local folder
        filename: (req, image, cb) => {
          const filename: string =
            path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4(); //originalName+randomwords
          const extension: string = path.parse(image.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async createPerson(
    @UploadedFile() image: Express.Multer.File,
    @Body() createDto: CreatePerson,
  ) {
    return await lastValueFrom(
      this.client.send('person/create', { createDto, image }),
    );
  }

  @Post('auth/register')
  async register(@Body() createUser: CreateUser) {
    return await lastValueFrom(this.client.send('auth/register', createUser));
  }

  @Post('auth/login')
  async login(
    @Body() loginUser: LoginUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    let jwt = await lastValueFrom(this.client.send('auth/login', loginUser));
    response.cookie('jwt', jwt, { httpOnly: true });
    return jwt;
  }

  @Get('auth/getUser')
  @UseGuards(AuthGuard)
  async getUser(@Body('id') id: number, @Req() request: Request): Promise<any> {
    let cookie = request.cookies['jwt'];
    return await lastValueFrom(
      this.client.send('auth/getUser', { id, cookie }),
    );
  }

  @Get('role')
  async getRoles(): Promise<any> {
    return await lastValueFrom(this.client.send('role', {}));
  }

  @Get('role/:id')
  async getRole(@Param('id') id: number): Promise<any> {
    return await lastValueFrom(this.client.send('role/:id', id));
  }

  @Get('auth/:id/comments')
  async getCommentsUser(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('auth/:id/comments', id));
  }

  @Get('auth/google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return await lastValueFrom(this.client.send('auth/google/login', {}));
  }

  @Get('auth/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user: any = req.user;
    let jwt = await lastValueFrom(
      this.client.send('auth/google/redirect', user),
    );
    response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }

  @Get('auth/vk/login')
  @UseGuards(VKAuthGuard)
  async vkLogin() {
    return await lastValueFrom(this.client.send('auth/vk/login', {}));
  }

  @Get('auth/vk/redirect')
  @UseGuards(VKAuthGuard)
  async vkRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user: any = req.user;
    let jwt = await lastValueFrom(this.client.send('auth/vk/redirect', user));
    response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }

  @Post('comment/create')
  @UseGuards(AuthGuard)
  async createCom(@Body() createComment: CreateComment) {
    return await lastValueFrom(
      this.client.send('comment/create', createComment),
    );
  }

  @Get('comment/:id')
  async getComment(@Param('id') id: number) {
    return await lastValueFrom(this.client.send('comment/:id', id));
  }
}
