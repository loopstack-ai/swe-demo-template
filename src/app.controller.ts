import { Body, Controller, Post } from '@nestjs/common';
import { Public, ScheduledTask } from '@loopstack/shared';
import { IsString } from 'class-validator';
import { CreatePipelineService, TaskSchedulerService } from '@loopstack/core';
import { ImproveFileSequence } from './swe-demo-module/improve-file/improve-file.sequence';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { SweDemoWorkspace } from './swe-demo-module/swe-demo-workspace';

export class ImproveFileDto {
  @IsString()
  path: string;

  @IsString()
  content: string;
}

@Controller()
export class AppController {

  constructor(
    private readonly configService: ConfigService,
    private readonly createPipelineService: CreatePipelineService,
    private readonly taskSchedulerService: TaskSchedulerService,
  ) {}

  @Public()
  @Post('improve-file')
  async improveFile(@Body() payload: ImproveFileDto) {
    const user = '29e52c04-f580-406c-9c3c-956eee2e4642';

    const workerId = this.configService.get('auth.clientId');

    const pipeline = await this.createPipelineService.create({
      configKey: SweDemoWorkspace.name,
    }, {
      configKey: ImproveFileSequence.name,
      args: payload
    }, user);

    await this.taskSchedulerService.addTask({
      id: 'manual_pipeline_execution-' + randomUUID(),
      task: {
        name: 'manual_execution',
        type: 'run_pipeline',
        payload: {
          id: pipeline.id,
        },
        user: user
      },
    } satisfies ScheduledTask);

    const deepLink = `studio/c/${workerId}/p/${pipeline.id}`;
    return `Process file here: http://localhost:5173/${deepLink}`;
  }

}