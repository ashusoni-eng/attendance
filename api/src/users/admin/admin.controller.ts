import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AccountType } from "@prisma/client";
import { AccountTypes } from "src/common/decorators/accountType.decorator";
import { AccountTypesGuard } from "src/common/guards/accountTypes.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { AdminService } from "./admin.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersService } from "../users.service";


@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService
  ) { }

  @Post("user")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.adminService.create(createUserDto);
  }

  @Get("user")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  findAllUser(@Query("limit") limit?: string, @Query("page") page?: string) {
    const pageNumber = parseInt(page ?? "1");
    const perPage = parseInt(limit ?? "10");

    return this.usersService.findAll(pageNumber, perPage);
  }

  @Get("user/search")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  searchUser(
    @Query("q") query: string,
    @Query("limit") limit?: string,
    @Query("page") page?: string
  ) {
    const pageNumber = parseInt(page ?? "1");
    const perPage = parseInt(limit ?? "10");
    return this.adminService.searchUser(query, pageNumber, perPage);
  }

  @Patch("user/:id")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param("id") id: string
  ) {

    this.usersService.update(id, updateUserDto);
  }

  @Delete("user/:id")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Get("attendance")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  findAll(
    @Query("q") query: string,
    @Query("perpage") perPage: number = 31,
    @Query("page") page: number = 1,
    @Query('from') from?: string,
    @Query('to') to?: string

  ) {
    // const pageNumber = parseInt(page ?? "1");
    // const perPage = parseInt(perPage ?? "10");

    return this.adminService.findAll(page, perPage, query, from, to);
  }
  // @Get(":id")
  // @UseGuards(AccountTypesGuard)
  // @AccountTypes(AccountType.ADMIN)
  // async findOne(){
  //   return ""
  // }


  // @Patch("status/change/:id")
  // changeStatus(@Param("id") id: string) {
  //   return this.adminService.changeStatus(id);
  // }

  // @Get("profile")
  // getProfile(@Req() req) {
  //   const userId = req.user?.sub;
  //   return this.adminService.findOne(userId);
  // }

  @Get("attendance/:id")
  @UseGuards(AccountTypesGuard)
  @AccountTypes(AccountType.ADMIN)
  findOne(@Param('id') id: string,
    @Query("page") page: number = 1,
    @Query("perpage") perPage: number = 31,
    @Query("from") from?: string,
    @Query("to") to?: string,) {
    return this.adminService.findOne(id, page, perPage, from, to);
  }

  // @Patch(":id")
  // @UseGuards(AccountTypesGuard)
  // @AccountTypes(AccountType.ADMIN)
  // updateProfile(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.adminService.update(id, updateUserDto);
  // }

  // @Delete("profile")
  // @UseGuards(AccountTypesGuard)
  // remove(@Req() req) {
  //   const userId = req.user?.sub;
  //   return this.adminService.remove(userId);
  // }

  // @Delete(":id")
  // @UseGuards(AccountTypesGuard)
  // @AccountTypes(AccountType.ADMIN)
  // removeUser(@Param("id") id: string) {
  //   return this.adminService.remove(id);
  // }





}