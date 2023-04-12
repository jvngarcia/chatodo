import { type ReactNode } from "react"


/**
 * The TemplateProps type defines the props for a React component that includes a titleHead string and
 * optional children nodes.
 * @property {string} titleHead - A string representing the title of the template component. This could
 * be used as the main heading or title of the page or section where the template is being used.
 * @property {ReactNode} children - The `children` property is a special prop in React that allows you
 * to pass components or elements as children to a parent component. It is an optional property that
 * can be used to render any content inside the component. In this case, it is of type `ReactNode`,
 * which means it can accept
 */

export type TemplateProps = {
    titleHead: string,
    children?: ReactNode
}


/**
 * The above type defines the properties of an input element in a form.
 * @property {string} label - A string that represents the label or title of the input field.
 * @property {string} placeholder - The `placeholder` property is a string that provides a hint to the
 * user of what kind of input is expected in the input field. It is usually displayed as a light grey
 * text inside the input field and disappears when the user starts typing. It is not a required
 * property, but it can be helpful
 * @property {string} type - The "type" property in this code snippet refers to the type of input field
 * that will be rendered in the user interface. It could be "text", "password", "email", "number",
 * "date", etc. depending on the type of data that needs to be collected from the user.
 * @property {string} name - The name property is a string that represents the name of the input field.
 * This is used to identify the input field when the form is submitted and the data is sent to the
 * server. It is also used to associate the input field with its corresponding label element.
 */

export type Input = {
    label: string,
    placeholder: string,
    type: string,
    name: string
}


/**
 * The above type defines an interface for an object that may contain an optional string property
 * called "icon".
 * @property {string} icon - This is a property of type string that represents the name or identifier
 * of an icon. It can be used to display an icon in a user interface or to reference an icon in code.
 * The icon itself may be an image file, a font glyph, or some other type of graphical representation.
 * The property
 */

export type Icon = {
    icon?: string,
}


/**
 * The above type defines a skeleton object with a quantity property of type number.
 * @property {number} quantity - The "quantity" property is a number that represents the number of
 * skeleton objects that need to be created. This is likely used in scenarios where a placeholder or
 * loading state needs to be displayed before actual data is loaded.
 */

export type Skeleton = {
    quantity: number
}


export type TextMessage = {
    profileImg: string,
    name: string,
    status: string,
    children?: ReactNode
}