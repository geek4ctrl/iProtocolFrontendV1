interface LogoutButtonProps { }

export default function LogoutButton(props: LogoutButtonProps) {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
        Logout
      </button>
    </form>
  )
}
