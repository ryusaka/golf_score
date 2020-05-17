import * as React from 'react'
import { GetServerSideProps } from 'next'
import { Course } from 'common/types/models'

import { internalClient } from 'lib/axiosClient'
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  tableRow: {
    '&:nth-child(odd)': {
      background: theme.palette.grey[200],
    },
  },
  tableHeadRow: {},
}))
type Props = {
  course: Course.Model
}
const Courses: React.FC<Props> = (props) => {
  const { course } = props
  const classes = useStyles(props)

  return (
    <div>
      <h1>{course.name}</h1>
      <div>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell>No.</TableCell>
              <TableCell>Par</TableCell>
              <TableCell>Regular</TableCell>
              <TableCell>Ladies</TableCell>
              <TableCell>Back</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.holes.map((h, idx) => (
              <TableRow key={h._id} className={classes.tableRow}>
                <TableCell>{h.number || idx + 1}</TableCell>
                <TableCell>{h.par}</TableCell>
                <TableCell>{h.distance.regular}</TableCell>
                <TableCell>{h.distance.ladies}</TableCell>
                <TableCell>{h.distance.back}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const res = await internalClient.get(`/api/fields/${ctx.query.id}/courses/${ctx.query.courseId}`)
    const course = res.data.course
    return { props: { course } }
  } catch (e) {
    if (e.response?.status === 404) {
      ctx.res.statusCode = 404
      ctx.res.end('Not found')
      return
    }
  }
}

export default Courses
