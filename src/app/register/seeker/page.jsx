import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { imgMain } from '@/assets'
import { SeekerRegisterForm } from '@/features'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function SeekerRegisterPage () {
  const session = await getServerSession(authOptions)
  if (session) redirect('/panel/jobs')

  return (
    <>
      <SeekerRegisterForm />
      <div className='hidden sm:block relative w-[min(90%,500px)] h-full max-h-[700px]'>
        <Image src={imgMain} alt='img' className='!w-[min(90%,300px)] mx-auto !max-h-[300px] hue-rotate-15 [transform:rotateY(180deg)]' fill />
      </div>
    </>
  )
}
export default SeekerRegisterPage
