import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized-response';
import { noop } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const createdUser = new NormalizedResponse(
      `User ${createUserDto.pseudo} has been created`,
      await this.prisma.users.create({
    data: {
      pseudo: createUserDto.pseudo,
      username: createUserDto.username,
      password: createUserDto.password,
      created_at: new Date(),
        },
      }),
    );
  return createdUser.toJSON();
}

  findAll() {
    return `This action returns all users`;
  }

  public async getByUUID(uuid: string) {
    const gettedUser = new NormalizedResponse(
      `User ${uuid} has been found`,
      await this.prisma.users.findUnique({
      where: {
        UUID: uuid,
      },
    }),
    );
    return gettedUser.toJSON();
  }

  public async updateByUUID(uuid: string, updateUserDto: UpdateUserDto) {
    const updatedUser = new NormalizedResponse(
      `User ${updateUserDto.pseudo} has been updated`,
      await this.prisma.users.update({
      where: {
        UUID: uuid,
      },
      data: {
        pseudo: !!updateUserDto.pseudo ? updateUserDto.pseudo : undefined,
        username: !!updateUserDto.username ? updateUserDto.username : undefined,
        password: !!updateUserDto.password ? updateUserDto.password : undefined,
      },
    }),
    );
    return updatedUser.toJSON();
  }

  public async deleteByUUID(uuid: string) {
    const deletedUser = new NormalizedResponse(
      `User ${uuid} has been deleted`,
      await this.prisma.users.delete({
      where: {
        UUID: uuid,
      },
    }),
    );
    return deletedUser.toJSON();
}
}
