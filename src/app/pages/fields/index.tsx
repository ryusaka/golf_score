import * as React from 'react'
import { Field } from 'common/types/models'
import { GetServerSideProps } from 'next'

import { internalClient } from 'lib/axiosClient'
import Link from 'next/link'

type Props = {
  fields: Field.Model[]
}
const Fields: React.FC<Props> = (props) => {
  const { fields } = props
  return (
    <div>
      <p>{fields.length}件のゴルフ場</p>
      {fields.map((f) => (
        <Link key={f._id} href='/fields/[id]' as={`/fields/${f._id}`}>
          <a>{f.name}</a>
        </Link>
      ))}
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await internalClient.get('/api/fields')
  const fields = res.data.fields
  return { props: { fields } }
}

export default Fields
