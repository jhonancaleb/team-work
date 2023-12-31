import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import Paragraph from 'antd/es/typography/Paragraph'
import { Flex, Tag } from 'antd'
import axios from 'axios'
import Avatar from 'antd/es/avatar/avatar'

const getDataSeeker = async (handle) => {
  const resAPI = await axios(`${process.env.API_URL}/seekers/${handle}`)
  const data = await resAPI.data
  return data
}

async function SeekerPage ({ params }) {
  const handle = params.handle
  const seeker = await getDataSeeker(handle)

  return (
    <>
      <Flex gap={20} wrap='wrap' align='center'>
        <Avatar shape='square' size={164} src={`https://unavatar.io/${handle}`} />
        <div>
          <Title className='!text-pink-600'>{seeker.names} {seeker.lastnames}</Title>
          <Text strong className='!text-blue-500'>{seeker.title}</Text><br />
        </div>
      </Flex>
      <br />
      <Title level={3}>Área de trabajo</Title>
      <Tag color='blue'>{seeker.area}</Tag><br /> <br />
      <Title level={3}>Descripción profesional</Title>
      <Paragraph
        ellipsis={{
          rows: 5,
          expandable: true,
          symbol: 'Mostrar más'
        }}
      >
        {seeker.description}
      </Paragraph>
    </>
  )
}
export default SeekerPage
