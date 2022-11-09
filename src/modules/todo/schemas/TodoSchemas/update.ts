import { partialUpdate } from '@/libs/joi'

import general from './general'

const updateSchema = partialUpdate(general, ['_id'])

export default updateSchema
