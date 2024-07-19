import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return <div className=' p-10 pb-0 rounded-md'>{children}</div>
}

export default AuthLayout;