import * as React from 'react'
import { GetServerSideProps } from 'next'
import { Field } from 'common/types/models'

import { internalClient } from 'lib/axiosClient'
import Link from 'next/link'

type Props = {
  field: Field.Model
}
const Fields: React.FC<Props> = (props) => {
  const { field } = props

  return (
    <div>
      <h1>{field.name}</h1>
      <div>{field.courses.length}コース</div>
      <div>
        {field.courses.map((c) => (
          <Link key={c._id} href='/fields/[id]/courses/[courseId]' as={`/fields/${field._id}/courses/${c._id}`}>
            <a>{c.name}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const field = await internalClient.get(`/api/fields/${ctx.query.id}`).then((res) => res.data.field)
    return { props: { field } }
  } catch (e) {
    if (e.response?.status === 404) {
      ctx.res.statusCode = 404
      // ctx.res.end('Not found')
      return
    }
  }
}

export default Fields
