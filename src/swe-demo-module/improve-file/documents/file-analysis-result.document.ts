import { BlockConfig } from '@loopstack/shared';
import { z } from 'zod';
import { Document } from '@loopstack/core';
import { Expose } from 'class-transformer';

@BlockConfig({
  properties: z.object({
    recommendations: z.array(
      z.object({
        description: z.string(),
        example: z.string(),
      })
    ),
  }),
  configFile: __dirname + '/file-analysis-result.document.yaml',
})
export class FileAnalysisResult extends Document {
  @Expose()
  recommendations: {
    description: string;
    example: string;
  }[];
}
