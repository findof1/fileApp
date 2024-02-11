'use server'
import { cookies } from 'next/headers'
 
export async function setUserdata(data) {
  cookies().set('fileApp', JSON.stringify(data))
}