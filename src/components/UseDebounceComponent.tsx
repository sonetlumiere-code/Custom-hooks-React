import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';

const UseDebounceComponent = () => {
  interface IUser {
    id: number;
    firstName: string;
    age: number;
  }

  const [inputValue, setInputValue] = useState<string>('')
  const [users, setUsers] = useState<IUser[]>([])

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const debouncedValue = useDebounce(inputValue, 500)

  const searchUsers = async () => {
    const res = await fetch(`https://dummyjson.com/users/search?q=${inputValue}`)
    const jsonRes = await res.json()
    setUsers(jsonRes.users)
  }

  useEffect(() => {
    console.log('useEffect triggered')
    if (inputValue !== '') {
      searchUsers()
    } else {
      setUsers([])
    }
  }, [debouncedValue])

  return (
    <>
      <div>DebounceComponent</div>
      <input type="text" onChange={(handleInput)}/>   
      {
        users.length ? (
          <ul>
            {
              users.map((user) => (
                <li key={user.id}>name: {user.firstName} age: {user.age}</li>
              ))
            }
          </ul>
        ) : null
      }
    </>
  )
}

export default UseDebounceComponent