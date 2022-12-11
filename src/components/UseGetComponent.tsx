import { useGet } from '../hooks/useGet';

const UseGetComponent = () => {
  interface IUser {
    id: number;
    name: string;
    email: string;
  }

  interface IPost {
    id: number;
    userId: number;
    title: string;
  }

  const [dataUsers, loadingUsers, errorUsers] = useGet<IUser>('https://jsonplaceholder.typicode.com/users')
  const [dataPosts, loadingPosts, errorPosts] = useGet<IPost>('https://jsonplaceholder.typicode.com/posts')
  return (
    <>
      <h1>Custom hooks</h1>
      {loadingUsers && <div>Loading...</div>}
      {errorUsers && <div>Error: {errorUsers.message}</div>}
      {dataUsers && (
        <div >
          <ul>
            {dataUsers.map((user: IUser) => (
              <li key={user.id}>
              {user.name} - {user.email}
              {loadingPosts && <div>Loading...</div>}
              {errorPosts && <div>Error: {errorPosts.message}</div>}
              {dataPosts && (
                <ul>
                  {dataPosts
                    .filter((post: IPost) => post.userId === user.id)
                    .map((post: IPost) => (
                      <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
              )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default UseGetComponent
