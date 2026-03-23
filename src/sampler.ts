import { Sampler, SamplingDecision, SamplingResult, Context, SpanKind, Attributes, Link, TraceFlags } from '@opentelemetry/api';

export class ParentBasedSampler implements Sampler {
  constructor(private rootSampler: Sampler) {}

  shouldSample(context: Context, traceId: string, spanName: string, spanKind: SpanKind, attributes: Attributes, links: Link[]): SamplingResult {
    const parentContext = context.getValue(Symbol.for('OpenTelemetry.SpanContext')) as any;
    if (parentContext && parentContext.traceFlags !== undefined) {
      const isSampled = (parentContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED;
      return { decision: isSampled ? SamplingDecision.RECORD_AND_SAMPLE : SamplingDecision.NOT_RECORD };
    }
    return this.rootSampler.shouldSample(context, traceId, spanName, spanKind, attributes, links);
  }

  toString(): string { return 'EnterpriseParentBased'; }
}
