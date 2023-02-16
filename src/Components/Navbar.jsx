import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Navbar(){
    return <nav className="nav">
        <Link to="/" className="navy">QuadB</Link>
        <ul>
            <CustomLink to="/">Home</CustomLink>
        </ul>
    </nav>
}


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }