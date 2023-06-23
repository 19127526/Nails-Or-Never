import MainLayout from "@/components/layout/main";
import {useRouter} from "next/router";
import Link from "next/link";

const HomePage = ({ users }) => {
    const route = useRouter()
    console.log(users)
    return (<div>{
        users?.map(index => <Link href={`home/${index?.id}`}>

            <p>{index?.name}</p>
        </Link>)
    }</div>)
}


export const  getStaticProps = async () => {
    let res = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await res?.json()
    return {
        props: {
            users: data
        }
    }
}



HomePage.Layout = MainLayout

export default HomePage
