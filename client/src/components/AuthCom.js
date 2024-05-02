import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
export default function AuthCom() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <Image src={session.user.image} alt="Profile Picture" width='400' height='400' /><br />

        name is :  {session.user.name}<br />
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}