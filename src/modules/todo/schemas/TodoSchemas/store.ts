import { partialStore } from '@/libs/joi'

import general from './general'

const storeSchema = partialStore(general, ['done', 'startedAt', 'createdAt', 'workTime', '_id'])

export default storeSchema
