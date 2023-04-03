import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import MainMenu from "~/components/MainMenu";
import Template from "~/components/Template";



const Dashboard: NextPage = () => {

    return (
        <Template titleHead="Dashboard - ChaTodo" >
            Hola
        </Template>
    );
};


export default Dashboard;