import { QueryBuilder } from 'querycraft'

export type PipelineOperation = ['filter', QueryBuilder] | ['buckets', BucketOptions]

export interface BucketOptions {
    fieldId: string
    size?: number
    values?: string[]
    subFieldId?: string
    subFieldIds?: string[]
    subFieldProp?: string
    dateInterval?: string
    buckets?: BucketOptions
}

interface Bucket {
    id: string
    value: number
    buckets: Bucket[]
}

export default class Pipeline {
    operations: Array<PipelineOperation> = []
    filter(qb: QueryBuilder){
        this.operations.push(['filter', qb])
        return this
    }
    buckets(options: BucketOptions){
        this.operations.push(['buckets', options])
        return this
    }
}