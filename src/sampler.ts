import { trace, Sampler, SamplingDecision, SamplingResult, Context, SpanKind, Attributes, Link, TraceFlags } from '@opentelemetry/api';

export class ParentBasedSampler implements Sampler {
  constructor(private rootSampler: Sampler) {}

  shouldSample(context: Context, traceId: string, spanName: string, spanKind: SpanKind, attributes: Attributes, links: Link[]): SamplingResult {
    const parentSpanContext = trace.getSpanContext(context);

    if (parentSpanContext) {
      const isSampled = (parentSpanContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED;
      return {
        decision: isSampled ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
      };
    }

    return this.rootSampler.shouldSample(context, traceId, spanName, spanKind, attributes, links);
  }

  toString(): string { return 'EnterpriseParentBasedSampler'; }
}
