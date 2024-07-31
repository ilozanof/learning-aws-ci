import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ilozanof/learning-aws-ci', 'master'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ]
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {stageName: 'Test'});

  }
}
