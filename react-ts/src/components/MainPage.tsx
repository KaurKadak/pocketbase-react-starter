interface MainPageProps {
  name: string;
  logout: () => void;
}

export default function MainPage({ name, logout }: MainPageProps) {
  return (
    <div>
      <div>Hello {name ? name : <></>}</div>
      <button onClick={logout} className="mt-6">
        Log out
      </button>
    </div>
  );
}
