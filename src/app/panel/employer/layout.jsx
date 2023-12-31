import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { userTypes } from '@/static/enums'
import { Card, Image } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import axios from 'axios'

const getDataAsEmployer = async (userHandle) => {
  const resAPI = await axios(`${process.env.API_URL}/employers/${userHandle}`)
  const data = await resAPI.data

  return data
}

async function EmployerPanelLayout ({ children }) {
  const session = await getServerSession(authOptions)
  const { data } = session.user
  if (data.type === userTypes.seeker) redirect('/panel')

  const employerData = await getDataAsEmployer(data.userHandle)

  return (
    <section className='w-full flex gap-5 flex-col'>
      <Card className='w-full'>
        <Title className='!text-gray-500 !text-xl'>Bienvenido a tu panel de empresa</Title>
        <Text className='!text-lg text-blue-600'>Hola <Text strong className='!text-pink-500 uppercase'>{employerData.name}</Text></Text>
        <Paragraph>
          Gestiona todas tus publicaiones de puestos de tabajo, haz seguimiento a los puestos publicados y
          a las postulaciones de los interesados.
        </Paragraph>
      </Card>
      <div className='flex gap-5 flex-col md:flex-row'>
        <aside className='w-full md:w-[30%]'>
          <Card className='text-center' bodyStyle={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Image src={`https://unavatar.io/${data.userHandle}`} alt={data.userHandle} />
            <Text strong className='uppercase !text-pink-600'>{employerData.name}</Text>
            <Paragraph
              type='secondary'
              ellipsis={{
                rows: 4,
                expandable: true,
                symbol: 'Mostrar más'
              }}
            >{employerData.description}
            </Paragraph>
          </Card>
        </aside>
        <main className='w-full md:w-[70%]'>
          {children}
        </main>
      </div>
    </section>
  )
}
export default EmployerPanelLayout
