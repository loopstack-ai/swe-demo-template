import { BlockConfig } from '@loopstack/shared';
import { Pipeline } from '@loopstack/core';
import { z } from 'zod';
import { AnalyseFileWorkflow } from './workflows/analyse-file.workflow';

@BlockConfig({
  imports: [
    AnalyseFileWorkflow
  ],
  config: {
    title: "Improve File"
  },
  properties: z.object({
    path: z.string(),
    content: z.string(),
  }),
  configFile: __dirname + '/improve-file.sequence.yaml',
})
export class ImproveFileSequence extends Pipeline {}