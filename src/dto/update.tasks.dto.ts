import { boolean, object, string } from "yup";

export default object({
    body : object({
        title: string().required('Title is required'),
        body: string().required('Body is required'),
        is_done: boolean()
    })
})