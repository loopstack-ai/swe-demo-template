import { BlockConfig } from '@loopstack/shared';
import { Workspace } from '@loopstack/core';
import { ImproveFileSequence } from './improve-file/improve-file.sequence';
import { z } from 'zod';

@BlockConfig({
  imports: [
    ImproveFileSequence
  ],
  config: {
    title: 'Software Engineering Demo Workspace'
  },
  properties: z.any(),
})
export class SweDemoWorkspace extends Workspace {}