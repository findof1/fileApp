'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteUserData() {
  cookies().set('fileApp', undefined)
}