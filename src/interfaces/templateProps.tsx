import { type ReactNode } from "react"


export type TemplateProps = {
    titleHead: string,
    children?: ReactNode
}


export type Input = {
    label: string,
    placeholder: string,
    type: string,
    name: string
}


export type Icon = {
    icon?: string,
}


export type Skeleton = {
    quantity: number
}