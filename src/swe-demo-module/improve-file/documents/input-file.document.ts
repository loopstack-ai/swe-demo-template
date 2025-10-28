import { BlockConfig } from '@loopstack/shared';
import { z } from 'zod';
import { Document } from '@loopstack/core';
import { Expose } from 'class-transformer';

@BlockConfig({
  properties: z.object({
    path: z.string(),
    content: z.string(),
  }),
  configFile: __dirname + '/input-file.document.yaml',
})
export class InputFile extends Document {
  @Expose()
  path: string;

  @Expose()
  content: string;
}
