import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { createCourse } from 'modules/field'
import { internalClient } from 'lib/axiosClient'

import CourseForm from 'components/form/CourseForm'
import HeaderContainer from 'components/HeaderContainer'

const Setup = (props) => {
  const { field } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const submit = async (values) => {
    await dispatch(createCourse(field._id, values))
    router.push(`/fields/${field._id}`)
  }

  return (
    <HeaderContainer header={<h1 style={{ fontSize: 24, textAlign: 'center' }}>{field.name}</h1>}>
      <CourseForm onSubmit={submit} field={field} />
    </HeaderContainer>
  )
}

export const getServerSideProps = async (ctx) => {
  const field = await internalClient.get(`/api/fields/${ctx.query.id}`).then((res) => res.data.field)
  return { props: { field } }
}

export default Setup
