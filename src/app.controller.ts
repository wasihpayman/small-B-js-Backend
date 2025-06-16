import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('API Info')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({
    status: 200,
    description: 'API information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Business Dashboard API' },
        version: { type: 'string', example: '1.0.0' },
        description: { type: 'string', example: 'A basic token-based login and internal messaging API' },
        endpoints: {
          type: 'object',
          properties: {
            documentation: { type: 'string', example: '/api' },
            auth: { type: 'string', example: '/auth/login' },
            profile: { type: 'string', example: '/users/me' },
            messages: { type: 'string', example: '/messages' },
          },
        },
      },
    },
  })
  getApiInfo() {
    return {
      name: 'Business Dashboard API',
      version: '1.0.0',
      description: 'A basic token-based login and internal messaging API',
      endpoints: {
        documentation: '/api',
        auth: '/auth/login',
        profile: '/users/me',
        messages: '/messages',
      },
    };
  }
}