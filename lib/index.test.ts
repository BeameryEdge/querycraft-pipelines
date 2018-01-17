import 'mocha'
import { assert } from 'chai'
import Pipeline from '.'
import { QueryBuilder } from 'querycraft'

describe('pipeline', function () {
    it('creates a new pipeline', function(){
        const pipeline = new Pipeline()
        assert.deepEqual(pipeline.operations, [])
    })
    it('allows the `.filter` pipeline operation', function(){
        const pipeline = new Pipeline().filter(new QueryBuilder())
        assert.deepEqual(pipeline.operations, [['filter', new QueryBuilder()]])
    })
    it('allows the `.buckets` pipeline operation', function(){
        const pipeline = new Pipeline().buckets({fieldId: 'type'})
        assert.deepEqual(pipeline.operations, [['buckets', {fieldId: 'type'}]])
    })
    it('allows joining pipeline operations', function(){
        const pipeline = new Pipeline()
            .filter(new QueryBuilder())
            .buckets({fieldId: 'type'})
        assert.deepEqual(pipeline.operations, [
            ['filter', new QueryBuilder()],
            ['buckets', {fieldId: 'type'}],
        ])
    })
})