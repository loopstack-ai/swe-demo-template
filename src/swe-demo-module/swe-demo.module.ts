import { Module } from '@nestjs/common';
import { CoreToolsModule, LoopCoreModule } from '@loopstack/core';
import { ModuleFactory } from '@loopstack/shared';
import { SweDemoModuleFactoryService } from './swe-demo-module-factory.service';
import { LlmModule } from '@loopstack/llm';
import { SweDemoWorkspace } from './swe-demo-workspace';
import { AnalyseFileWorkflow } from './improve-file/workflows/analyse-file.workflow';
import { ImproveFileSequence } from './improve-file/improve-file.sequence';
import { InputFile } from './improve-file/documents/input-file.document';
import { FileAnalysisResult } from './improve-file/documents/file-analysis-result.document';
import { ImprovedFileDocument } from './improve-file/documents/improved-file.document';

@Module({
  imports: [LoopCoreModule, CoreToolsModule, LlmModule],
  providers: [
    SweDemoWorkspace,
    SweDemoModuleFactoryService,

    ImproveFileSequence,
    AnalyseFileWorkflow,
    InputFile,
    FileAnalysisResult,
    ImprovedFileDocument,
  ],
  exports: [SweDemoModuleFactoryService],
})
@ModuleFactory(SweDemoModuleFactoryService)
export class SweDemoModule {}
