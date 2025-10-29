import {
  CreateChatMessage,
  CreateDocument,
  SwitchTarget,
  Workflow,
} from '@loopstack/core';
import { BlockConfig, Input } from '@loopstack/shared';
import { z } from 'zod';
import { Expose } from 'class-transformer';
import { InputFile } from '../documents/input-file.document';
import { FileAnalysisResult } from '../documents/file-analysis-result.document';
import { ImprovedFileDocument } from '../documents/improved-file.document';
import { AiGenerateDocument } from '@loopstack/llm';

@BlockConfig({
  imports: [
    CreateChatMessage,
    CreateDocument,
    InputFile,
    FileAnalysisResult,
    ImprovedFileDocument,
    AiGenerateDocument,
    SwitchTarget,
  ],
  config: {
    title: 'Analyse File',
  },
  properties: z.object({
    path: z.string(),
    content: z.string(),
  }),
  configFile: __dirname + '/analyse-file.workflow.yaml',
})
export class AnalyseFileWorkflow extends Workflow {
  @Input()
  @Expose()
  file: InputFile;

  @Input()
  @Expose()
  analysis: FileAnalysisResult;

  @Input()
  @Expose()
  task: FileAnalysisResult;

  @Input()
  @Expose()
  improvedFile: ImprovedFileDocument;
}
