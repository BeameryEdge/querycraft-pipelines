# QueryCraft-Pipelines-To-Function
Database agnostic formulation for data pipelines

[![NPM](https://nodei.co/npm/QueryCraft-Pipelines.png)](https://npmjs.org/package/QueryCraft-Pipelines)

[![npm version](https://badge.fury.io/js/QueryCraft-Pipelines.svg)](https://badge.fury.io/js/QueryCraft-Pipelines)
[![CircleCI](https://circleci.com/gh/BeameryHQ/QueryCraft-Pipelines.svg?style=shield)](https://circleci.com/gh/BeameryHQ/QueryCraft-Pipelines)
[![codecov](https://codecov.io/gh/BeameryHQ/QueryCraft-Pipelines/branch/master/graph/badge.svg)](https://codecov.io/gh/BeameryHQ/QueryCraft-Pipelines)
[![David deps](https://david-dm.org/BeameryHQ/QueryCraft-Pipelines.svg)](https://david-dm.org/BeameryHQ/QueryCraft-Pipelines)
[![Known Vulnerabilities](https://snyk.io/test/github/beameryhq/QueryCraft-Pipelines/badge.svg)](https://snyk.io/test/github/beameryhq/QueryCraft-Pipelines)

## Installation

```sh
npm install --save 'QueryCraft-Pipelines'
```

## Examples

Suppose we have a collection of data that satisfies the interface

```ts
interface contact {
    id: string
    'list': { id: string }[]
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    customFields: { id: string, value: number }[]
    assignedTo?: string
}
```

If we want an aggregations the describes the logic:-
```

    where
        fistName is bob
        lastName is doyle OR is not set
        assignedTo is anything
        list has an item where id is item1
    Group by
        the value property of the customField where id is custom1

```

We can build build it as easily as:-

```ts
import { FilterBuilder, eq, lt, neq, any, find, where } from 'querycraft'
import { Pipeline } from 'querycraft-pipelines'

const contacts: contact[] =  [ ... ]

const pipeline = new Pipeline()
.filter(
    where('firstName', eq('bob'))
    .where('list', find(where('id', eq('item1'))))
    .where('lastName', any([
        eq('doyle'),
        eq(null)
    ]))
    .where('createdAt', lt({ daysAgo: 5 }))
    .where('assignedTo', neq(null))
)
.buckets({
    fieldId: 'CustomFields',
    subFieldIds: ['custom1'],
    subFieldProp: 'value',
})

```
