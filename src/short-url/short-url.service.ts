import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { customAlphabet } from 'nanoid';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';

const generateShortCode = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  6, 
);

@Injectable()
export class ShortUrlService {
  constructor(private prisma: PrismaService) {}

  async createShortUrl(
    createShortUrlDto: CreateShortUrlDto,
    userId?: string,
  ) {
    let shortCode: string;
    let isUnique = false;
    while (!isUnique) {
      shortCode = generateShortCode();
      const existingUrl = await this.prisma.shortUrl.findUnique({
        where: { shortCode },
      });
      if (!existingUrl) {
        isUnique = true;
      }
    }

    return this.prisma.shortUrl.create({
      data: {
        originalUrl: createShortUrlDto.originalUrl,
        shortCode: shortCode!,
        userId: userId || null, 
      },
    });
  }

  async getOriginalUrl(shortCode: string) {
    const shortUrl = await this.prisma.shortUrl.findUnique({
      where: { shortCode, deletedAt: null }, 
    });

    if (!shortUrl) {
      throw new NotFoundException('URL not found or already deleted.');
    }

    await this.prisma.shortUrl.update({
      where: { id: shortUrl.id },
      data: { visits: { increment: 1 } },
    });

    return shortUrl;
  }

  async getUserShortUrls(userId: string) {
    return this.prisma.shortUrl.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        visits: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateShortUrl(
    id: string,
    updateShortUrlDto: UpdateShortUrlDto,
    userId: string,
  ) {
    const shortUrl = await this.prisma.shortUrl.findUnique({
      where: { id, userId, deletedAt: null },
    });

    if (!shortUrl) {
      throw new NotFoundException('URL not found or you do not have permission.');
    }

    return this.prisma.shortUrl.update({
      where: { id },
      data: { originalUrl: updateShortUrlDto.originalUrl },
    });
  }

  async softDeleteShortUrl(id: string, userId: string) {
    const shortUrl = await this.prisma.shortUrl.findUnique({
      where: { id, userId, deletedAt: null },
    });

    if (!shortUrl) {
      throw new NotFoundException('URL not found or you do not have permission.');
    }

    return this.prisma.shortUrl.update({
      where: { id },
      data: { deletedAt: new Date() }, 
    });
  }
}