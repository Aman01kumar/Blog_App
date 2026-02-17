'use client'

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function Navbar () {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    return (
        
        <nav className="w-full py-5 px-4 flex items-center justify-between">
            <div className="flex items-center gap-8 cursor-pointer">
                <Link href='/'>
                    <h1 className="text-4xl font-bold">
                        Next <span className="text-primary">Js</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href='/'>Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href='/blog'>Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href='/create'>Create</Link>
                </div>
            </div> 

            <div className="flex items-center gap-2 cursor-pointer">
                {isLoading ? null : isAuthenticated ? (
                    <Button onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                toast.success("logegd out successfully")
                                router.push("/")
                            }, 
                            onError: (error) => {
                                toast.error(error.error.message)
                            }
                        }
                    })}>Logout</Button>
                ):(
                    <>
                        <Link className={`${buttonVariants()} cursor-pointer`} href='/auth/sign-up'>Sign up</Link>
                        <Link className={`${buttonVariants({ variant: "outline" })} cursor-pointer`} href='/auth/log-in'>Login</Link>
                    </>  
                )}
                <ThemeToggle /> 
            </div>
        </nav>
    )
}