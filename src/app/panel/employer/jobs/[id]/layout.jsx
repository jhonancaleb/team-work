import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UnauthorizedResult from '@/features/UnauthorizedResult'
import { Card } from 'antd'
import axios from 'axios'
import { getServerSession } from 'next-auth'

const getDataJob = async (jobId) => {
  const resAPI = await axios(`http://localhost:3000/api/jobs/${jobId}`)
  const jobData = await resAPI.data
  return jobData
}

async function JobLayout ({ children, params }) {
  const jobId = params.id
  const job = await getDataJob(jobId)
  const { user } = await getServerSession(authOptions)

  const hasAccessToThisJob = job.employer.id === user.data.employerId

  return hasAccessToThisJob
    ? <>{children}</>
    : <Card><UnauthorizedResult /></Card>
}
export default JobLayout
