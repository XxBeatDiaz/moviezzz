import { Link } from "react-router"

export default function HomePage() {
  return (
    <div>
      <Link style={{ textDecoration: "none", color: "blue" }} to="/movies">Continue</Link>
    </div>
  )
}
