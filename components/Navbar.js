import Link from "next/link";
export default function Navbar(){
    return(
        <nav className="mb-32  flex justify-around">
            {/* Logo */}
            <div>
                User Auth
            </div>
            {/* Navigation Link */}
            <ul className="flex justify-between">
                <li>
                    Dashboard
                </li>
                <li>
                    <Link href="/profile"> Profile </Link>
                   
                </li>
            </ul>
            {/* Icons */}
              <div>
                <Link href="/register">Register</Link>
                <Link href="/">Login</Link>
                
              </div>
        </nav>
    );
}