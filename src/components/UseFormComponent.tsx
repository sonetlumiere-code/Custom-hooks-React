import { useState } from 'react';
import { useForm } from '../hooks/useForm'

const UseFormComponent = () => {
  interface IUser {
    id: number;
    email: string;
    phone: number
  }

  const [users, setUsers] = useState<IUser[]>([])

  const createUser = (): IUser => {
    const newUser: IUser = {
      id: Date.now(),
      email: values.email,
      phone: values.phone
    };
    return newUser;
  };

  const addUser = (): void => {
    const newUser = createUser();
    setUsers(prev => [newUser, ...prev])
  };

  const [values, handleChange, handleSubmit] = useForm({
    email: '',
    phone: 0
  }, addUser);
  
  return (
    <>
      <div>useFormComponent</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={values.email} 
          onChange={handleChange}
          placeholder="email"
        />
        <input 
          type="number" 
          name="phone" 
          value={values.phone} 
          onChange={handleChange}
          placeholder="phone"
        />
        <input 
          type="submit" 
          value="Add User"
        />
      </form>

      <div>
        <h3>Usuarios</h3>
        <ul>
          {users.map((user, i) => (
            <li key={i}>
              {user.email} - {user.phone}
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default UseFormComponent
