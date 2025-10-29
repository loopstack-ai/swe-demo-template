import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@loopstack/shared';
import { IsString } from 'class-validator';
import { RunService } from '@loopstack/core';
import { ImproveFileSequence } from './swe-demo-module/improve-file/improve-file.sequence';
import { SweDemoWorkspace } from './swe-demo-module/swe-demo-workspace';

export class ImproveFileDto {
  @IsString()
  path: string;

  @IsString()
  content: string;
}

@Controller()
export class AppController {
  constructor(private readonly runService: RunService) {}

  @Public()
  @Post('improve-file')
  async improveFile(@Body() payload: ImproveFileDto) {

    const result = await this.runService.run(
      ImproveFileSequence.name,
      SweDemoWorkspace.name,
      payload,
    );

    const deepLink = `studio/c/${result.workerId}/p/${result.pipelineId}`;
    return `Process file here: \n > https://app.loopstack.ai/${deepLink}`;
  }
}
