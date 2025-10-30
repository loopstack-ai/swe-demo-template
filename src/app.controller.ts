import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Public } from '@loopstack/shared';
import { IsString } from 'class-validator';
import { RunService } from '@loopstack/core';
import { ImproveFileSequence } from './swe-demo-module/improve-file/improve-file.sequence';
import { SweDemoWorkspace } from './swe-demo-module/swe-demo-workspace';
import { UserService } from '@loopstack/api';

export class ImproveFileDto {
  @IsString()
  path: string;

  @IsString()
  content: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly runService: RunService,
  ) {}

  @Public()
  @Post('improve-file')
  async improveFile(@Body() payload: ImproveFileDto) {

    // Define the user under which the automation should be executed.
    // For simplicity, we use the first active user that is found.
    // In a production application implement proper authentication.
    const user = await this.userService.findOneBy({ isActive: true });
    if (!user) {
      throw new UnauthorizedException('No user found.')
    }

    console.log('improve', user.id)

    const result = await this.runService.run(
      ImproveFileSequence.name,
      SweDemoWorkspace.name,
      payload,
      user.id,
    );

    const deepLink = `studio/c/${result.workerId}/p/${result.pipelineId}`;
    return `Process file here: \n > https://app.loopstack.ai/${deepLink}`;
  }
}
